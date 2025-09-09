import React, { useState } from "react";
import '/src/components/Login/StudentLogin/Login.css';
import axios from "axios";
import { saveAuth } from "/src/auth"; // <-- ensure this path matches where you created src/auth.js

const LoginRight = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((s) => !s);

    const [remember, setRemember] = useState(false); // "Stay signed in" checkbox

    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginDetails((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("handleSubmit called — loginDetails:", loginDetails, "remember:", remember);

      try {
        // quick validation
        if (!loginDetails.username || !loginDetails.password) {
          console.warn("username or password empty");
          alert("Please enter email and password");
          return;
        }

        const response = await axios.post("http://localhost:3000/api/signin", {
          email: loginDetails.username,
          password: loginDetails.password
        });

        console.log("Signin response:", response.data);

        // adapt to backend shape: token + user
        const { token, user } = response.data;

        // If backend returns data in a different shape, try these fallbacks:
        const userObj = user || response.data.user || response.data;

        if (!userObj) {
          alert("Signin failed: no user returned");
          return;
        }

        // Build consistent user object with user_id and name fields
        const normalizedUser = {
          user_id: userObj.user_id || userObj.id || userObj.userId,
          username: userObj.username,
          first_name: userObj.first_name || userObj.firstName || null,
          middle_name: userObj.middle_name || userObj.middleName || null,
          last_name: userObj.last_name || userObj.lastName || null
        };

        const fullName = [normalizedUser.first_name, normalizedUser.middle_name, normalizedUser.last_name]
          .filter(Boolean)
          .join(" ") || normalizedUser.username || "";

        // Save auth info using helper; helper will use localStorage if 'remember' true, else sessionStorage
        saveAuth({
          token: token || null,
          user: {
            user_id: normalizedUser.user_id,
            userName: fullName || normalizedUser.username
          },
          remember
        });

        // final redirect
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Signin request failed:", err.response?.data || err.message || err);
        const message = err.response?.data?.error || err.response?.data?.message || "Signin error! Please check your credentials.";
        alert(message);
      }
    };

    return (
        <div className="login-form-section fade-in-left">
            <div className="login-box">
                <h2 className="login-title">Student Login</h2>

                {/* Google Button */}
                <button className="google-btn" type="button">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "20px", height: "20px", marginRight: "8px" }}
                    >
                        <path
                            fill="#fff"
                            d="M44.5,20H24v8.5h11.8C34.7,33.9,30.1,37,24,37c-7.2,0-13-5.8-13-13s5.8-13,13-13
              c3.1,0,5.9,1.1,8.1,2.9l6.4-6.4C34.6,4.1,29.6,2,24,2C11.8,2,2,11.8,2,24s9.8,22,22,22c11,0,21-8,21-22
              C45,22.5,44.8,21.2,44.5,20z"
                        />
                    </svg>
                    Sign in with Google
                </button>

                <div className="divider">
                    <span>Or continue with</span>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Email</label>
                    <input
                      id="username"
                      type="email"
                      placeholder="Enter Email"
                      value={loginDetails.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter Password"
                      value={loginDetails.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="login-options" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div className="remember">
                        <input
                          type="checkbox"
                          id="show-password"
                          checked={showPassword}
                          onChange={togglePasswordVisibility}
                        />
                        <label htmlFor="show-password" style={{ marginLeft: 8 }}>Show Password</label>
                      </div>

                      <div className="remember">
                        <input
                          type="checkbox"
                          id="stay-signed-in"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor="stay-signed-in" style={{ marginLeft: 8 }}>Stay signed in</label>
                      </div>
                    </div>

                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset not implemented."); }}>Forgot your password?</a>
                  </div>

                  <button type="submit" className="submit-btn">Sign in</button>
                </form>

                <p className="login-footer">
                    Don’t have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginRight;
