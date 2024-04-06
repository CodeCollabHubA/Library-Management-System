import { Link } from "react-router-dom";
import Input from "./utilities/_input";

const SignUp = ({ register, handleSubmit, onSubmit, errors }) => {

    return (
        <div className=" w-10/12 mx-auto mt-16 md:mt-28 ">
            <div className="md:flex ">
                <main className="md:w-1/2 py-4 rounded-s-xl bg-zinc-100">
                    <form className="w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Frist Name" name="fristName" register={register} errors={errors} />
                        <Input label="Last Name" name="lastName" register={register} errors={errors} />
                        <Input label="Email" name="email" register={register} errors={errors} />
                        <Input label="Password" name="password" register={register} errors={errors} />
                        <Input label="Phone" name="phone" register={register} errors={errors} />
                        <Input label="Admin Id" name="adminId" register={register} errors={errors} />
                        <Link to='/dashboard'>
                        <button className="w-full  text-white bg-gradient-to-r from-blue-500 via-blue-600
                        to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center me-2 mb-2"
                            type="submit">signUp</button>
                        </Link>
                    </form>
                </main>
                <picture className="w-1/2">
                    <img className="max-h-full" src="/src/assets/Login-amico.png" alt="Sign Up Pic" />
                </picture>
            </div>
        </div>
    );
}
 
export default SignUp;