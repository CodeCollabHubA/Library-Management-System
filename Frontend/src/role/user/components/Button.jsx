import { Link } from "react-router-dom";

const Button = ({ type, to, className, children, ...props }) => {
    let basic = "w-fit mt-5 flex capitalize items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-800 rounded-2xl border-2 border-transparent outline-none"
    const primary = "hover:bg-white hover:border-orange-800 hover:text-orange-800"
    const blue = "hover:bg-blue-800"
    basic = type === "blue" ? `${basic} ${blue}` : `${basic} ${primary}`
    const style = `${basic} ${className}`
    return (
        to ?
            <Link className={style} to={`${to}`} {...props}>{children}</Link>
            :
            <button className={style} type="button" title="button" {...props}>{children}</button>
    );
}

export default Button;
