import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from "react-hot-toast";
import auth from '../../services/authService'
import Input from "../../components/formFields/_input"
import Button from "../../components/common/buttons/_button";


import './loginPage.scss'


const LoginForm = () => {

    const inputs = [
        { label: 'Email', name: 'email', id: 'email', type: 'email' },
        { label: 'Password', name: 'password', id: 'password', type: 'password' },
    ]

    const schema = yup.object({
        email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
        password: yup.string().required('must enter a passward'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


    const onSubmit = async ({ email, password }) => {
        await auth.login(email, password);
            toast.success('enterd')
            setTimeout(() => { window.location = '/dashboard' }, 2000);
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