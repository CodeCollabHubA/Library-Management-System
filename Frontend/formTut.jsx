import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        name:yup.string().required('enter name'),
        // passward: yup.string().min(8).required('must enter a passward'),
        email: yup.string()
            .when('mode', {
            is: 'signUp',
            then:(schema)=>schema.email('Please enter a valid email address').required('must enter an email address'),
        })
        
    }).required();


const FormTut = () => {
    const mode='signUp'
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            mode,
        }
    })
    const onSubmit = data => {
        console.log(data)
    }
    return ( 
        <div className="bg-slate-400">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">name
                    <input className="block border-4" {...register('name')} />
                    <span className="text-red-700">{errors.name?.message}</span>
                </label>
                <label htmlFor="">email
                    <input className="block border-4" {...register('email')} />
                    <span className="text-red-700">{errors.email?.message}</span>
                </label>
                <button type="submit" className="bg-red-600 w-10 h-7" >
                    login 
                </button>
            </form>
        </div>
     );
}
 
export default FormTut;