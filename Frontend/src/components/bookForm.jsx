import { Link } from "react-router-dom";
import Input from "./common/_input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import apiUrl from '../../config.json'

const BookForm = () => {
    const inputs = [
        { name: 'title', label: 'Book Title', type:'text'},
        {name:'noCopies',label:'No. Copies',type:'number'},
        {name:'ISBN',label:'ISBN',type:'text'},
        {name:'authNo',label:'Author No',type:'text'},
        
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
        const { data: user } = await axios.post(apiEndpoint, data)
        console.log(user)
        console.log('submitted')
    };

    return ( 
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {inputs.map(item => (
                    <Input key={item.name} name={item.name} register={register} type={item.type} />
                ))}
                <textarea name="description" id="description" cols="30" rows="10"></textarea>
            </form>
        </>
     );
}
 
export default BookForm;