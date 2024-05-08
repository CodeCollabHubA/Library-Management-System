import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from "react-hot-toast";

import auth from '../../services/authService'
import Input from "../../components/formFields/_input"
import Button from "../../components/common/buttons/_button";
import { useMyContext } from "../../context/ContextProvider";
import { loginInputs as inputs, loginSchema as schema } from "../../utils/inputs"

import './loginPage.scss'

const LoginForm = () => {

    const { setUser } = useMyContext()
    const location = useLocation();

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


    const onSubmit = async ({ email, password }) => {
        await auth.login(email, password, setUser);
        toast.success('enterd')
        if (location.pathname === "/login") {
            setTimeout(() => navigate('/dashboard'), 2000);
        }
    };

    return (
        <div className="enterPage">
            <div className="formContainer w-80 rounded-md mx-auto mt-16 md:mt-32 pt-4  ">
                <form className="flex flex-col gap-5 px-5 py-10 w-[90%] mx-auto " onSubmit={handleSubmit(onSubmit)}>
                    {inputs.map(item => (
                        <Input key={item.id} label={item.label} name={item.name} type={item.type} register={register} errors={errors} />
                    ))}
                    <div className="flex flex-wrap justify-between h-20">
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
                    <div>
                        <Button className="w-full" type="submit">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default LoginForm;