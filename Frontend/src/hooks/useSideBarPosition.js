import { useEffect, useRef, useState } from 'react';

const useSideBarPosition = () => {
    const footerRef = useRef(null);
    const [sideBarPosition, setSideBarPosition] = useState("fixed");

    const handleScroll = () => {
        let isFooterApearInScreen = (footerRef.current.getBoundingClientRect().top - window.innerHeight) < 0
        if (isFooterApearInScreen) {
            setSideBarPosition("absolute")
        } else {
            setSideBarPosition("fixed")
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return { footerRef, sideBarPosition }
}
export default useSideBarPosition