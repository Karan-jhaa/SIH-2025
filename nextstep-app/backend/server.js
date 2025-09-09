import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import cors from "cors";
import pg from "pg";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());
app.use((req, res, next) => { console.log("Incoming request:", req.method, req.url); next(); });

/**
 * POST /api/submit
 * Receives 24 answers → stores → fetches RIASEC → calls ML API → saves ML response → returns result
 */
// 
// POST /api/submit
app.post("/api/submit", async (req, res) => {
  try {
    console.log("== /api/submit called ==");
    console.log("Request body:", JSON.stringify(req.body || {}));

    const { user_id, answers } = req.body;
    if (!user_id) return res.status(400).json({ error: "user_id is required" });

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "answers must be an array of 24 numbers" });
    }
    if (answers.length !== 24) {
      return res.status(400).json({ error: "Exactly 24 answers required", got: answers.length });
    }

    // Check for null/undefined/invalid values before DB work
    const invalid = answers
      .map((v, i) => {
        if (v === null || v === undefined) return `Q${i + 1}: missing`;
        const n = Number(v);
        if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1 || n > 5) return `Q${i + 1}: invalid(${v})`;
        return null;
      })
      .filter(Boolean);

    if (invalid.length > 0) {
      console.warn("Validation failed for answers:", invalid);
      return res.status(400).json({ error: "Invalid answers", details: invalid });
    }

    // All validated — coerce to numbers
    const numericAnswers = answers.map((a) => Number(a));

    // compute RIASEC averages (unchanged)
    const avg = (arr) => arr.reduce((s, n) => s + Number(n || 0), 0) / arr.length;
    const riasec = {
      R: avg(numericAnswers.slice(0, 4)),
      I: avg(numericAnswers.slice(4, 8)),
      A: avg(numericAnswers.slice(8, 12)),
      S: avg(numericAnswers.slice(12, 16)),
      E: avg(numericAnswers.slice(16, 20)),
      C: avg(numericAnswers.slice(20, 24))
    };

    // Upsert prepared as before (ensure this matches your column order exactly)
    const cols = [
      "r1","r2","r3","r4",
      "i1","i2","i3","i4",
      "a1","a2","a3","a4",
      "s1","s2","s3","s4",
      "e1","e2","e3","e4",
      "c1","c2","c3","c4"
    ];
    const placeholders = numericAnswers.map((_, i) => `$${i + 2}`).join(", ");
    const insertCols = cols.join(", ");
    const upsertQuery = `
      INSERT INTO user_response (user_id, ${insertCols})
      VALUES ($1, ${placeholders})
      ON CONFLICT (user_id) DO UPDATE SET
        ${cols.map((c) => `${c} = EXCLUDED.${c}`).join(", ")}
      RETURNING *;
    `;
    const upsertValues = [user_id, ...numericAnswers];
    console.log("Upsert query prepared. values length:", upsertValues.length);

    const upsertResult = await pool.query(upsertQuery, upsertValues);
    const savedRow = upsertResult.rows[0];
    console.log("Upsert saved row:", savedRow);

    // (optional) ML call & store ml_response as string — keep this but it doesn't affect answers now
    // ... existing ML logic ...

    return res.json({ success: true, user_response: savedRow, riasec });
  } catch (err) {
    console.error("Unhandled /api/submit error:", err && (err.stack || err.message));
    return res.status(500).json({ error: "Server error in /api/submit", message: String(err && err.message) });
  }
});


app.get("/api/dashboard", async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ error: "user_id is required" });

    // user info
    const userQ = await pool.query(
      `SELECT user_id, username, email, phone, first_name, middle_name, last_name, created_at FROM user_auth WHERE user_id=$1`,
      [userId]
    );
    if (userQ.rows.length === 0) return res.status(404).json({ error: "User not found" });
    const user = userQ.rows[0];

    // user_response (riasec and ml_response)
    const respQ = await pool.query(
      `SELECT r1,r2,r3,r4,i1,i2,i3,i4,a1,a2,a3,a4,s1,s2,s3,s4,e1,e2,e3,e4,c1,c2,c3,c4, ml_response FROM user_response WHERE user_id=$1`,
      [userId]
    );

    let riasec = null;
    let ml_response = null;
    if (respQ.rows.length > 0) {
      const r = respQ.rows[0];
      const toAvg = (a) => a.reduce((s, v) => s + (v||0), 0) / a.length;
      // build arrays
      const R = [r.r1, r.r2, r.r3, r.r4].map(Number);
      const I = [r.i1, r.i2, r.i3, r.i4].map(Number);
      const A = [r.a1, r.a2, r.a3, r.a4].map(Number);
      const S = [r.s1, r.s2, r.s3, r.s4].map(Number);
      const E = [r.e1, r.e2, r.e3, r.e4].map(Number);
      const C = [r.c1, r.c2, r.c3, r.c4].map(Number);

      riasec = {
        R: toAvg(R),
        I: toAvg(I),
        A: toAvg(A),
        S: toAvg(S),
        E: toAvg(E),
        C: toAvg(C)
      };

      ml_response = r.ml_response;
    }

    // Compose dashboard payload (you can adapt to your frontend shape)
    const payload = {
      user,
      riasec,
      ml_response
    };

    res.json(payload);
  } catch (err) {
    console.error("dashboard error:", err && err.stack ? err.stack : err);
    res.status(500).json({ error: "Server error in /api/dashboard" });
  }
});


app.post("/api/signup", async (req, res) => {
  try {
    console.log("== /api/signup called ==");
    console.log("Request body:", JSON.stringify(req.body));

    // accept these possible fields from frontend
    const {
      username,
      email,
      password,
      phone,
      firstName,
      middleName,
      lastName
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare columns and values explicitly in the order we want to insert.
    const columns = [
      "username",
      "email",
      "password",
      "phone",
      "first_name",
      "middle_name",
      "last_name"
    ];

    const values = [
      username || null,
      email,
      hashedPassword,
      phone || null,
      firstName || null,
      middleName || null,
      lastName || null
    ];

    // Build placeholders $1, $2, ..., $N dynamically to guarantee a match.
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const insertQuery = `
      INSERT INTO user_auth (${columns.join(", ")})
      VALUES (${placeholders})
      RETURNING user_id, ${columns.join(", ")}, created_at
    `;

    // Debug logs to see exactly what's sent to PG
    console.log("== Debug: insertQuery ==");
    console.log(insertQuery);
    console.log("== Debug: values ==");
    console.log(values);

    const result = await pool.query(insertQuery, values);

    res.json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Signup error:", err && err.stack ? err.stack : err);
    if (err && err.code === "23505") {
      return res.status(409).json({ error: "User with this email or username already exists" });
    }
    res.status(500).json({ error: "Signup failed" });
  }
});


app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT user_id, username, email, password 
       FROM user_auth WHERE email=$1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // remove password before sending
    delete user.password;

    // create jwt
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Signin successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signin failed" });
  }
});

// GET /api/me (optional) - returns user info from token or user_id in localStorage
app.get("/api/me", async (req, res) => {
  try {
    // simple version expecting user_id in query for dev; later use JWT auth
    const userId = req.query.user_id || req.headers["x-user-id"];
    if (!userId) return res.status(400).json({ error: "user_id required" });

    const userRes = await pool.query(
      `SELECT user_id, username, email, first_name, middle_name, last_name, phone FROM user_auth WHERE user_id = $1`,
      [userId]
    );
    if (userRes.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json({ user: userRes.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/dashboard - returns model performance, feature importances, roadmap items
app.get("/api/dashboard", async (req, res) => {
  try {
    // replace the static content with real queries if needed
    const response = {
      performance: {
        score: 0.85,
        period: "Last 30 Days",
        change: 0.05,
        bars: [0.7, 0.9, 0.8]   // numbers 0..1 for heights
      },
      results: [
        { feature: "Feature A", importance: 0.25 },
        { feature: "Feature B", importance: 0.20 },
        { feature: "Feature C", importance: 0.15 },
        { feature: "Feature D", importance: 0.10 },
        { feature: "Feature E", importance: 0.05 }
      ],
      roadmap: [
        { icon: "📊", title: "Phase 1: Data Collection", date: "Q1 2024" },
        { icon: "🧠", title: "Phase 2: Model Training", date: "Q2 2024" },
        { icon: "🔬", title: "Phase 3: Evaluation", date: "Q3 2024" },
        { icon: "🚀", title: "Phase 4: Deployment", date: "Q4 2024" }
      ]
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Node.js server running on port ${PORT}`)
);
