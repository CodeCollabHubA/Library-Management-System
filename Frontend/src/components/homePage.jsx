import React from 'react';
import Navbar from './HomePage_Parts/navbar'
import HeroSection from './HomePage_Parts/heroSection'
import ContentSection from './HomePage_Parts/contentSection'
import FooterSection from './HomePage_Parts/footerSection'


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
