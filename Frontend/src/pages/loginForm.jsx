import { Link, useNavigate } from "react-router-dom";
import Input from "../components/common/_input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";

import auth from "../../services/authService";
import * as config from '../../config.json';

import '../styles/loginPage.scss'






const apiEndpoint = config.apiUrl + '/Auth/Login';
const LoginForm = ({errorss}) => {

    const inputs = [
        { label: 'Email', name: 'email', id: 'email', type: 'email' },
        { label: 'Password', name: 'password', id: 'password', type: 'password' },
    ]

    const schema = yup
        .object({
            email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
            password: yup.string().required('must enter a passward'),
        }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });



    const onSubmit = async ({email,password}) => {
        console.log(data)
        try {
            await auth.login(email,password);
            window.location = '/dashboard';
            
        } catch (ex) {
            if(ex.response&&ex.response.status === 400||500){
                console.log('wrong!!!');
                const errors = { ...errorss };
                errors.username = ex.response.data;
                console.log(errors.username);

            }
        }
        
    };
    
    return (
        <div className="enterPage">
            <div className="formContainer w-80 rounded-md mx-auto mt-16 md:mt-32 pt-4  ">
                <form className="w-[90%] mx-auto mb-8 " onSubmit={handleSubmit(onSubmit)}>
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
                    <button className="w-full text-white bg-gradient-to-r from-blue-500 
                via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;