import Input from "./_inputField";

const Form = ({ inputsNo }) => {
    console.log(inputsNo);
    return (
        <form className="">
            {inputsNo.map(item => (
                <Input key={item.id} id={item.id} label={item.label} name={item.name} type={item.type} />
            ))}
        </form>
    );
}

export default Form;