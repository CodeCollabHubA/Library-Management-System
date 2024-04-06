import { Link } from "react-router-dom";
// import Form from "./utilities/_form";
import Input from "./utilities/_input";

const Login = ({register,handleSubmit,errors,onSubmit}) => {
    return (
        <div className=" w-[70%] mx-auto mt-16 md:mt-28  ">
            <div className="md:flex ">
                <main className=" pt-8 rounded-s-xl bg-zinc-100 md:w-1/2">
                    <form className="w-[90%] mx-auto"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className=''>
                            <Input name='email' label='Email' register={register} errors={errors} />
                            <Input name='password' label='Passward' register={register} errors={errors} />
                        </div>
                        <div className="flex flex-wrap justify-between mt-10 h-20">
                            <label htmlFor="check" className="w-full">
                                <input id='check' type="checkbox" className="checked:outline-offset-0 me-3" />
                                Remember me
                            </label>
                            <Link className="text-red-700 hover:underline"
                                to='/'>
                                forgit passward?
                            </Link>
                            <Link className='text-blue-700 hover:underline'
                                to='/registration'>
                                register?
                            </Link>
                        </div>
                        <input className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600
                         to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            type="submit" value='Login'/>
                            
                    </form>
                </main>
                <picture className="w-1/2 flex justify-center">
                    <img className="max-h-[20rem]" src="/src/assets/Login-amico.png" alt="login Pic" />
                </picture>
            </div>
        </div>
    )
}

export default Login;