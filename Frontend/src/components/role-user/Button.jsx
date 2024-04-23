import { Link } from "react-router-dom";

const Button = ({ type, to, className, children, ...props }) => {
    const style = {
        basic: "w-fit mt-5 flex capitalize items-center justify-center px-3 py-2 text-sm font-medium text-center text-white rounded-md border-2 border-transparent outline-none",
        default: "bg-blue-700 hover:bg-white hover:border-blue-700 hover:text-blue-700",
        primary: " bg-orange-800 hover:bg-white hover:border-orange-800 hover:text-orange-800",
        submit: "text-white bg-green-700 hover:bg-green-800"
    }
    // if button type unknown not one of the above
    const buttonType = style[type] ? style[type] : style.default
    const stylee = `${style.basic} ${buttonType} ${className}`
    return (
        to ?
            <Link className={stylee} to={`${to}`} type={type} {...props}>{children}</Link>
            :
            <button className={stylee} title="button" type={type}  {...props}>{children}</button>
    );
}

export default Button;
