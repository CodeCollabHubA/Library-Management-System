import React from 'react';
import Navbar from '../components/HomePage/navbar'
import HeroSection from '../components/HomePage/heroSection'
import ContentSection from '../components/HomePage/contentSection'
import FooterSection from '../components/HomePage/footerSection'


const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <ContentSection />
            <FooterSection />
        </>
    );
}
 
export default Home;
