import { Link } from "react-router-dom";
import Input from "./common/_input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const RegisterForm = () => {
    const schema = yup
        .object({
            fristName: yup.string().required('must enter a first name'),
            lastName: yup.string().required('must enter a last name'),
            password: yup.string().min(8).required('must enter a passward'),
            email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
            phone: yup.string().test('custom-pattern', 'Invalid phone format', (value) => {
                const customPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                return customPattern.test(value);
            }).required('must enter your phone number'),
        }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = (data) => {
        console.log(data)
        console.log('subkkk')
    }

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
                        
                        <button className="w-full  text-white bg-gradient-to-r from-blue-500 via-blue-600
                        to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center me-2 mb-2"
                            type="submit">Register</button>
                       
                    </form>
                </main>
                <picture className="w-1/2">
                    <img className="max-h-full" src="/src/assets/Login-amico.png" alt="Sign Up Pic" />
                </picture>
            </div>
        </div>
    );
}
 
export default RegisterForm;