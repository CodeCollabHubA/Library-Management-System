import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className=" hero block mt-10 lg:mt-0 md:flex flex-wrap items-center justify-center ">
            <section className="md:w-1/2">
                <div className=" mx-auto md:px-1">
                    <h1 className="text-orange-800 text-center text-5xl mt-10 md:mt-0 md:text-8xl ">
                        Find your next favourite book
                    </h1>
                    <p className="text-2xl  font-light my-14 mx-10 text-center">
                        Library.ai is a Library Management System. it automates all your library processes.
                    </p>
                    <div className=" flex justify-center">
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
            <section className="md:w-1/2">
                <img className=' md:h-[30rem] lg:h-[40rem]' src="/src/assets/images/landing/Library-bro.png" alt="hero" />
            </section>
        </div>
    );
}

export default HeroSection;