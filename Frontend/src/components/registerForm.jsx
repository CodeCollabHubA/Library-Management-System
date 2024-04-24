import { Link } from "react-router-dom";
import Input from "./common/_input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/loginPage.scss'



const RegisterForm = () => {
    const schema = yup
        .object({
            fristName: yup.string().required('must enter a first name'),
            lastName: yup.string().required('must enter a last name'),
            email: yup.string().email('Please enter a valid email address').required('must enter an email address'),
            password: yup.string().min(8).required('must enter a passward'),
            confirm_password: yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
        }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = (data) => {
        console.log(data)
        console.log('registered')
    }

    return (
        <div className=" enterPage">
                 <div className="formContainer flex justify-center  w-[70%] rounded-md mx-auto mt-16 md:mt-32 pt-4">
                    <form className="w-[40%] ms-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Frist Name" name="fristName" register={register} errors={errors} />
                        <Input label="Last Name" name="lastName" register={register} errors={errors} />
                        <Input label="Email" name="email" register={register} errors={errors} />
                        <Input label="Password" name="password" register={register} errors={errors} />
                        <Input label="Confirm Password" name="confirm_password" register={register} errors={errors} />
                        
                        <button className="w-full  text-white bg-gradient-to-r from-blue-500 via-blue-600
                        to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center me-2 mb-2"
                            type="submit">Register</button>
                </form>
                <div className="img w-[35%] h-[25rem] flex items-center justify-center">
                    {/* <img src="/src/assets/registerForm.png" alt="" /> */}
                </div>
                </div>
        </div>
    );
}
 
export default RegisterForm;