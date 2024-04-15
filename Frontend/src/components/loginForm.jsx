import { Link } from "react-router-dom";
import Input from "./common/_input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import apiUrl from '../../config.json'

const apiEndpoint = 'http://localhost:5053/api/User';



const LoginForm = () => {

    const inputs = [
        { label: 'Email', name: 'email', id: 'email', type: 'email' },
        { label: 'Password', name: 'password', id: 'password', type: 'password' },
    ]

    const schema = yup
        .object({
            email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
            password: yup.string().min(8).required('must enter a passward'),
        }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const {data:user} =await axios.post(apiEndpoint,data)
        console.log(user)
        console.log('submitted')
    };
    
    return (
        <div className=" w-[70%] mx-auto mt-16 md:mt-28  ">
            <div className="md:flex ">
                <main className=" pt-8 rounded-s-xl bg-zinc-100 md:w-1/2">
                    <form className="w-[90%] mx-auto mb-8" onSubmit={handleSubmit(onSubmit)}>
                        {inputs.map(item => (
                            <Input key={item.id} label={item.label} name={item.name} type={item.type} register={register} errors={errors} />
                        ))}
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
                        <button className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Log in
                        </button>
                    </form>
                </main>
                <picture className="w-1/2 flex justify-center items-center">
                    <img className="max-h-[20rem]" src="/src/assets/Login-amico.png" alt="login Pic" />
                </picture>
            </div>
        </div>
    )
}

export default LoginForm;