import CardInfo from "../../components/common/_cardinfo";
import Button from "../../components/common/buttons/_button";

const OurService_items = {

    books: {
        admin: { icon: 'faBook', content: 'Manage available books and perform CRUD operations on the database.' },
        user: { icon: 'faBook', content: 'See all available books. their descriptions and if they are available to borrow or not>' },
    },
    loans: {
        admin: { icon: 'faHandHolding', content: `Manage loans by:<ul className="list-disc"><li>. tracking all loans.</li><li>. can users from borrowing.</li><li>. else...</li></ul>` },
        user: { icon: 'faHandHolding', content: `Manage you own loans by:<ul><li>. tracking your loans.</li><li>. contact management for extending your loan.</li></ul>` },

    },
    borrow: {
        admin: { icon: 'faBookOpen', content: 'Display all borrowing requests and accept those comply to the terms.' },
        user: { icon: 'faBookOpen', content: 'Make a request to borrow your desired book, wait for an admin to approve then get your receipt to collect it.' },
    },
};


const ContentSection = () => {

    return (
        <>
            <div className="px-8 md:px-16 py-10 font-bold bg-orange-100 min-h-40">
                <h1 className="text-4xl mb-12">Services We Provide</h1>
                <div className="servicesContainer ">
                    <CardInfo OurService_items={OurService_items} button={<Button type="primary">Learn more</Button>} />
                </div>
            </div>


            <div className="joinUs flex py-4 h-80 flex-col md:flex-row md:h-40 justify-around items-center md:py-0 md:px-10 overflow-clip  bg-orange-800">
                <h1 className="text-4xl text-white">Join Us</h1>
                <img className="relative  md:top-6" src="/src/assets/images/landing/Combined Shapecircle.svg" alt="" />
                <div className=" flex ">
                    <button className="bg-white text-orange-800 w-28 h-10 text-xl rounded-md mx-4 hover:font-bold">Sign Up</button>
                    <button className="bg-white text-orange-800 w-28 h-10 text-xl rounded-md mx-4 hover:font-bold ">Sign In</button>
                </div>
            </div>


            <div className="py-10 px-10 block md:flex justify-center" >
                <form className="ContactUs flex flex-col w-[25rem] lg:w-[30rem]" action="">
                    <label className="text-lg mb-4" htmlFor="">
                        Name
                        <input className="block rounded-md" type="text" />
                    </label>
                    <label className="text-lg mb-4" htmlFor="">
                        Email
                        <input className="block rounded-md" type="email" />
                    </label>
                    <textarea className="rounded-md w-72 h-40 md:w-96" placeholder="write a message" name="textt"></textarea>
                </form>
                <picture className="lg:w-[30rem] ">
                    <img src="/src/assets/images/landing/Sent Message-bro.png" alt="" />
                </picture>
            </div>
        </>
    );
}

export default ContentSection;