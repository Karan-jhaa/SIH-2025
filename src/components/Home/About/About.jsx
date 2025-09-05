import React from "react";
import "./About.css";

const About = () => {
    return (
        <section className="about container" id="about">
            <h2>About Us</h2>
            <p>
                At NextStep, our mission is to simplify the toughest decisions in a student’s life. From choosing the right stream after Class 10 to selecting the right college and career after Class 12, and even guiding you towards the right job opportunities after graduation — we are with you at every milestone.
            </p>
            <p>
                We help students:
                <ul>
                    <li>
                        Understand which stream matches their interests and strengths after Class 10.
                    </li>
                    <li>
                        Explore career options, fields, and colleges based on their chosen stream after Class 12.
                    </li>
                    <li>
                        Get clear roadmaps that connect education with future career paths.
                    </li>
                    <li>
                        Discover the best job roles, industries, and opportunities after completing college.
                    </li>
                </ul>
            </p>
            <p>
                Our vision is to empower every student to move forward with clarity, confidence, and purpose. With NextStep, you don’t just study — you know exactly where each step will lead, from school to college to your dream career.
            </p>
        </section>
    );
};

export default About;
