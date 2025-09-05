import React from "react";
import "./Contact.css";
import Header from "../Header/Header";
import Footer from "../../Home/Footer/Footer";
import Img from "./Logo.jpeg"

export default function Contact() {
    return (
        <div>
            <Header />
            <section className="contact-container">
                <div className="contact-info">
                    <h1>Get in Touch</h1>
                    <p>
                        Have a project in mind or just want to say hello? We'd love to hear
                        from you.
                    </p>

                    <div className="contact-image">
                        <img src={Img} alt="Contact Us" />
                    </div>

                    <div className="contact-details">
                        <div>
                            <span>📞</span> <span>+1 (555) 123-4567</span>
                        </div>
                        <div>
                            <span>📧</span> <span>contact@nextstep.com</span>
                        </div>
                    </div>

                    <div className="contact-socials">
                        <a href="#">🌐</a>
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                    </div>
                </div>

                <form className="contact-form">
                    <div>
                        <label>Name</label>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Your Email" />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input type="tel" placeholder="Your Phone" />
                    </div>
                    <div>
                        <label>Issue</label>
                        <select>
                            <option>Select an Issue</option>
                            <option>General Inquiry</option>
                            <option>Project Proposal</option>
                            <option>Support</option>
                        </select>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea rows="4" placeholder="Describe your issue"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </section>
            <Footer />
        </div>
    );
}
