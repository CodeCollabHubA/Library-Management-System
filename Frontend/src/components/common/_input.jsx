const Input = ({ name, label, errors, register, ...rest }) => {
    
    return (
        <div className="my-3 mx-2">
            <label className="block font-normal" htmlFor={name}>{label}</label>
                <input className="p-2.5 text-sm text-gray-900
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-80 h-9"
                {...register(`${name}`)}
                name={name}
                {...rest} />
            {<div className="text-red-600">{errors[name]?.message}</div>}
        </div>
    );
}
 
export default Input;
