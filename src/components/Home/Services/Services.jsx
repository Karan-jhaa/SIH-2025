import React from "react";
import "./Services.css";
import { motion } from "framer-motion";

const Services = () => {
    return (

        <section className="services" id="service">
            {/* First Card - Left side se aayega */}
            <motion.div
                className="service-card"
                initial={{ opacity: 0, x: -100 }}   // start hidden left
                whileInView={{ opacity: 1, x: 0 }}  // jab viewport me aaye to animate
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }} // ek baar chale, jab 20% card dikhe
            >
                <motion.button
                    className="secondary-btn"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
                    viewport={{ once: true }}
                    onClick={() => window.location.href = '/Quiz'}  // Redirect to /quiz page on click
                >
                    Take Quiz
                </motion.button>
                <p>Test your knowledge with our interactive quizzes.</p>
                <p>Get instant feedback and track your progress.</p>
                <p>Challenge yourself and solidify your understanding.</p>
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl9VJPVllMgqXHL0_7dmICVNUXAEa8RF3b5gkyPjK2F3eQO0VIISGoqncEGtvqDrLtxAlr9aM_RSFGKkBkatlfzIcSlU2xyZ6gbS5AVmbv9bWNLg_TwN9l9-Mg4-cRxLSuG0307pSsDklt0fYfDA68ppW2UxxBPAekLsb2q_IRHWYzWxnKz7Ql9Di03MZVvTWFE49WEFdRglQEFeF9NCBkq0Uw5NBGPhWHf2Grb-AiAKEudB9USfgMUkWHljqnVeW5mHnNaR5wdUM"
                    alt="Quiz"
                />
            </motion.div>

            {/* Second Card - Right side se aayega */}
            <motion.div
                className="service-card"
                initial={{ opacity: 0, x: 100 }}    // start hidden right
                whileInView={{ opacity: 1, x: 0 }}  // jab viewport me aaye to animate
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.button
                    className="secondary-btn"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                >
                    Know about college
                </motion.button>
                <p>Discover detailed information about colleges and universities.</p>
                <p>Find the perfect fit for your academic and career goals.</p>
                <p>Explore programs and campus life.</p>
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC707rF_-eQsKpm5ojVySo2IAWMVd4VIw_As4Jrf9jFUmE4YhxIc_yBEIj-dlVOfVKosSGvUfojV3R4YURThd1EvDKs3AP-bwHwYIEILGxD_YHtnf-_88YIt0GndPVsn2JgtBSDfBH6u6rVaeNVh6q61gN8tMEMl25kvQASxuihpSAaGCHxvSH6lZH7op6Br9-d3A5b6p7CUGAt7npzozPlGnAqeyKL0MKqLbK0T51devQhkOoOfTbSupFade7ST8o1OBM_5mzceY8"
                    alt="College"
                />
            </motion.div>
        </section>

    );
};

export default Services;
