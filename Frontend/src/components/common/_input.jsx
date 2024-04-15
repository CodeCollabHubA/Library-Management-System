const Input = ({ name, label, errors,register, ...rest }) => {
    return (
        <div className="my-3 mx-2">
            <label className="block  font-normal" htmlFor={name}>{label}</label>
                <input className="bg-gray-50 border px-2 border-gray-300 w-80 h-9"
                {...register(`${name}`)}
                name={name}
                {...rest} />
            {<div className="text-red-600">{errors[name]?.message}</div>}
        </div>
    );
}
 
export default Input;
