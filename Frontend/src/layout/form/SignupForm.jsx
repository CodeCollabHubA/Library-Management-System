import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from "react-hot-toast";

import auth from '../../services/authService'
// import Button from "../../components/common/buttons/_button";
import Button from "../../components/common/buttons/_button";
import Input from "../../components/formFields/_input"
import './loginPage.scss'
import { useMyContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

import { signupInputs as inputs, signupSchema as schema } from "../../utils/inputs"



const SignupForm = () => {

    const { setUser } = useMyContext()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    const onSubmit = async (data) => {
        await auth.signUp(data, setUser);
        toast.success('enterd')
        setTimeout(() => { navigate('/dashboard') }, 2000);
    }

    return (
        <div className=" enterPage">
            <div className="formContainer flex justify-center  w-[70%] rounded-md mx-auto mt-16 md:mt-32 pt-4">
                <form className="w-[40%] ms-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col gap-5">
                        {inputs.map(item => (
                            <Input key={item.name} label={item.label} name={item.name} register={register} type={item.type} errors={errors} />
                        ))}
                    </div>

                    <div>
                        <Button className="w-full mt-5" type="submit">Sign up</Button>
                    </div>
                </form>
                <div className="w-full md:w-1/2 flex items-center justify-center -order-1 md:order-1">
                    <div className="w-1/2 md:w-2/3">
                        <img className="w-full" src="/src/assets/images/pages/signup.png" alt="Sign Up Pic" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;