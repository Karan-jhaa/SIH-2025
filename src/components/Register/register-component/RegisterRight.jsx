import React, { useState } from "react";
import "../Register.css";
import axios from "axios";

const RegistrationRight = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [detail, setDetail] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDetail((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // ✅ submit pe console.log
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (detail.password !== detail.confirmPassword) {
            alert("Password and Confirm Password do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/register", detail);
            console.log("Server Response:", response.data);
            alert("Registration Successful!")
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during registration. Please try again.")
        }
        console.log("User Details:", detail);
    };

    return (
        <div className="registration-right fade-in-left">
            <div className="registration-box">
                <h2 className="registration-title">Student Registration</h2>

                <button className="google-btn">
                    <svg
                        className="google-icon"
                        fill="currentColor"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M44.5,20H24v8.5h11.8C34.7,33.9,30.1,37,24,37c-7.2,0-13-5.8-13-13s5.8-13,13-13c3.1,0,5.9,1.1,8.1,2.9l6.4-6.4
              C34.6,4.1,29.6,2,24,2C11.8,2,2,11.8,2,24s9.8,22,22,22c11,0,21-8,21-22C45,22.5,44.8,21.2,44.5,20z"
                            fill="#fff"
                        ></path>
                    </svg>
                    Sign in with Google
                </button>

                <div className="divider">
                    <span>Or continue with</span>
                </div>

                <form className="form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter First Name"
                                value={detail.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middle-name">Middle Name</label>
                            <input
                                type="text"
                                id="middleName"
                                placeholder=""
                                value={detail.middleName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter Last name"
                            value={detail.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Your Email"
                            value={detail.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter Phone Number"
                            value={detail.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            value={detail.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter Password"
                                value={detail.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Enter Password"
                                value={detail.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="remember-me"
                            onClick={togglePasswordVisibility}
                        />
                        <label htmlFor="remember-me">Show Password</label>
                    </div>

                    <a href="/login" className="register-btn" onClick={handleSubmit}>Register</a>
                </form>

                <p className="login-text">
                    Already have an account?{" "}
                    <a href="/login" className="login-link">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegistrationRight;
