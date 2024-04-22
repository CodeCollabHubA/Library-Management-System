import { Link } from "react-router-dom";
const FooterSection = ({ footerRef }) => {
    return (
        <div ref={footerRef} className="bg-slate-900 text-white min-h-40">
            <div className="bg-slate-900 text-white min-h-40 flex wrap pt-16 px-10 mb-10 ">
                <Link className="w-1/3 text-center text-4xl font-bold" to='#'>Library.ai</Link>
                <div className="w-1/4"><h2 className="text-lg mb-2">MENU</h2>
                    <ul>
                        <li>About</li>
                        <li>Services</li>
                        <li>The Developers</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="w-1/4 "><h2 className="text-lg mb-2">SERVICE</h2>
                    <ul>
                        <li>Books</li>
                        <li>Loans</li>
                        <li>Borrow</li>
                    </ul>
                </div>
            </div>
            <hr className="border-none h-[2px] bg-slate-950 w-[95%] mx-auto " />
            <div className="w-full flex px-20 pb-8 mt-4">
                <p className="w-3/5">Copyright © 2024 Ahmed Yassin. All Rights Reserved.</p>
                <p className="w-1/5">Term of Use</p>
                <p className="w-1/5">Privacy Policy</p>
            </div>
        </div>
    );
}

export default FooterSection;