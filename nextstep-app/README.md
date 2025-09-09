# NextStep

NextStep is a full-stack web app that helps students explore career directions. It lets users:

- Register and log in
- Take a 24-question RIASEC-style quiz
- Store answers in a PostgreSQL database
- Call an ML service for recommendations
- View a personalized dashboard with results

---

## 🚀 Tech Stack

- **Frontend:** React (Vite), Axios, CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Auth:** Local/session storage (`auth.js`)
- **ML:** Optional external service (`ML_API`)

---

## 📂 Project Structure

```
NextStep/
│
├── backend/              # Express API + DB
│   ├── server.js
│   ├── package.json
│   └── .env              # not committed (see .env.example)
│
├── frontend/             # React client
│   ├── src/
│   │   ├── auth.js
│   │   ├── components/
│   │   │   ├── Login/
│   │   │   ├── Quiz/
│   │   │   ├── Dashboard/
│   │   │   └── Header.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/KanishkMishra143/NextStep.git
cd NextStep
```

### 2. Database (Postgres)

Create the database and run this schema:

```sql
CREATE TABLE IF NOT EXISTS user_auth (
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  password TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_response (
  response_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  r1 INTEGER CHECK (r1 BETWEEN 1 AND 5),
  r2 INTEGER CHECK (r2 BETWEEN 1 AND 5),
  r3 INTEGER CHECK (r3 BETWEEN 1 AND 5),
  r4 INTEGER CHECK (r4 BETWEEN 1 AND 5),
  i1 INTEGER CHECK (i1 BETWEEN 1 AND 5),
  i2 INTEGER CHECK (i2 BETWEEN 1 AND 5),
  i3 INTEGER CHECK (i3 BETWEEN 1 AND 5),
  i4 INTEGER CHECK (i4 BETWEEN 1 AND 5),
  a1 INTEGER CHECK (a1 BETWEEN 1 AND 5),
  a2 INTEGER CHECK (a2 BETWEEN 1 AND 5),
  a3 INTEGER CHECK (a3 BETWEEN 1 AND 5),
  a4 INTEGER CHECK (a4 BETWEEN 1 AND 5),
  s1 INTEGER CHECK (s1 BETWEEN 1 AND 5),
  s2 INTEGER CHECK (s2 BETWEEN 1 AND 5),
  s3 INTEGER CHECK (s3 BETWEEN 1 AND 5),
  s4 INTEGER CHECK (s4 BETWEEN 1 AND 5),
  e1 INTEGER CHECK (e1 BETWEEN 1 AND 5),
  e2 INTEGER CHECK (e2 BETWEEN 1 AND 5),
  e3 INTEGER CHECK (e3 BETWEEN 1 AND 5),
  e4 INTEGER CHECK (e4 BETWEEN 1 AND 5),
  c1 INTEGER CHECK (c1 BETWEEN 1 AND 5),
  c2 INTEGER CHECK (c2 BETWEEN 1 AND 5),
  c3 INTEGER CHECK (c3 BETWEEN 1 AND 5),
  c4 INTEGER CHECK (c4 BETWEEN 1 AND 5),
  ml_response JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user_auth(user_id) ON DELETE CASCADE,
  CONSTRAINT user_response_user_id_key UNIQUE(user_id)
);
```

### 3. Environment Variables

Create a `backend/.env` file (not tracked by git):

```bash
# backend/.env
PORT=3000
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/nextstep
ML_API=http://localhost:8000
JWT_SECRET=supersecret
```

Also add a safe example for contributors: `backend/.env.example`.

### 4. Install dependencies

Backend:

```bash
cd backend
npm install
node server.js
```

Frontend:

```bash
cd ../frontend
npm install
npm run dev
```

---

## ▶️ Usage Flow

1. **Register** → `/register`
2. **Login** → `/login` (choose “Stay signed in” to persist across sessions)
3. **Quiz** → `/quiz`
   - Answer all 24 questions (values 1–5)
   - Submits to `/api/submit`
4. **Dashboard** → `/dashboard`
   - Shows greeting, chart, and ML response
   - Fetches via `/api/dashboard?user_id=<id>`

---
## 🧑‍💻 Development Notes

- Passwords must be hashed with **bcrypt** (check registration).
- Auth data saved in `localStorage` (if "stay signed in") or `sessionStorage`.
- Dashboard header shows profile initials if logged in.

## 📜 License

[MIT](LICENSE)
---

## 👤 Author

eKnowVators

