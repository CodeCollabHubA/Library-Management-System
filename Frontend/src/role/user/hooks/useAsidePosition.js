import React, { useEffect, useRef, useState } from 'react';

export default () => {
    const footerRef = useRef(null);
    const [asidePosition, setAsidePosition] = useState("fixed");

    const handleScroll = () => {
        let isFooterApearInScreen = (footerRef.current.getBoundingClientRect().top - window.innerHeight) < 0
        if (isFooterApearInScreen) {
            setAsidePosition("absolute")
        } else {
            setAsidePosition("fixed")
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return { footerRef, asidePosition }
}
