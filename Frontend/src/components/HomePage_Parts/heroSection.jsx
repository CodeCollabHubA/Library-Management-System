import { Link } from "react-router-dom";

const HeroSection = () => {
    return ( 
        <div className=" hero flex flex-wrap items-center justify-center ">
            <section className="lg:w-1/2">
                <div className="  lg:w-3/4 mx-auto">
                    <h1 className="text-orange-800 text-7xl">
                        Find your next favourite book
                    </h1>
                    <p className="text-lg font-light my-14">
                        Library.ai is a Library Management System. it automates all your library processes.
                    </p>
                    <div>
                        <Link to='/login'>
                            <button className="w-[8rem] h-[3rem] transition-all ease-in border-4
                            hover:bg-orange-800 border-orange-800
                            rounded-lg text-[1.5rem] hover:text-white">Log in</button>
                        </Link>
                        <button
                            className="w-[8rem] h-[3rem] transition-all ease-in  hover:underline hover:text-orange-800 text-[1.5rem]">
                            About Us
                        </button>
                    </div>
                </div>
            </section>
            <section className="lg:w-1/2">
            <img  className='h-[40rem]'src="/src/assets/Library-bro.png" alt="hero" />
            </section>
        </div>
    );
}

export default HeroSection;