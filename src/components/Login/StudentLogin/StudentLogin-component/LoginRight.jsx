import React, { useState } from "react";
import '../Login.css';
import axios from "axios";

const LoginRight = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginDetails((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/login", loginDetails);
      
            // server se JWT token aayega
            const { token } = response.data;
      
            if (token) {
                // token localStorage me save hoga
              localStorage.setItem("authToken", token);
              console.log("Login successful! Token saved:", token);
      
              // redirect to dashboard
              window.location.href = "/dashboard";
            }
          } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Invalid username or password!");
          }
    };

    return (
        <div className="login-form-section fade-in-left">
            <div className="login-box">
                <h2 className="login-title">Student Login</h2>

                {/* Google Button */}
                <button className="google-btn">
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

                {/* Form */}
                <form className="login-form">
                    <div>
                        <label htmlFor="username">Username or Email</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter Username"
                            value={loginDetails.username}
                            onChange={handleChange}
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
                        />
                    </div>

                    <div className="login-options">
                        <div className="remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                                onClick={togglePasswordVisibility}
                            />
                            <label htmlFor="remember-me">Show Password</label>
                        </div>
                        <a href="#">Forgot your password?</a>
                    </div>

                    <a href="/dashboard" className="submit-btn" onClick={handleSubmit}>Sign in</a>
                </form>

                <p className="login-footer">
                    Don’t have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginRight;
