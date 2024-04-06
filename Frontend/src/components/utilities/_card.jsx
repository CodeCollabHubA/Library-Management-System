const Card = () => {
    return (
        <div className="cursor-pointer w-48 h-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="h-2/3 mx-auto overflow-hidden" href="#">
                <img class=" rounded-t-lg" src="/src/assets/gd.jpg" alt="" />
            </div>
            <div className="py-5 px-2 h-1/3">
                <a href="#">
                    <h5 className=" mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy</h5>
                </a>
            </div>
        </div>
    );
}

export default Card;