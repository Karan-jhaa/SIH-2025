import React from "react";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import About from "./About/About";
import Footer from "./Footer/Footer";

const Home = () => {
    return (
        <div>
            <Header />
            <Hero />
            <Services />
            <About />
            <Footer />
        </div>
    )
}

export default Home;