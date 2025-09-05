import React from "react";
import "./Hero.css";
import heroImg from '/src/assets/Hero.png'
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero container flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Hero Text */}
      <motion.div
        className="hero-text max-w-lg"
        initial={{ opacity: 0, y: -50 }}        // upar se start hoga + invisible
        animate={{ opacity: 1, y: 0 }}          // neeche aa jayega + visible
        transition={{ duration: 0.8, ease: "easeOut" }} // smooth transition
      >
        <h1 className="text-4xl font-bold">
          NextStep - <span className="text-blue-600">"Discover. Decide. Do"</span>
        </h1>
        <h4 className="mt-3 text-lg text-gray-600">
          Empowering students and learners with the right resources, guidance, and tools to shape their future.
        </h4>
        <p className="mt-4 text-gray-500">
          NextStep connects ambitious learners with personalized academic support, career guidance, and growth opportunities. Whether you're preparing for exams, exploring new skills, or planning your career, we're here to guide you at every stage.
        </p>
        <a
          href="/register"
          className="primary-btn inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="hero-image"
        initial={{ opacity: 0, y: -50 }}      // upar se fade in
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} // thoda delay image ke liye
      >
        <img src={heroImg} alt="student with books" className="w-full max-w-md" />
      </motion.div>
    </section>
  );
};

export default Hero;
