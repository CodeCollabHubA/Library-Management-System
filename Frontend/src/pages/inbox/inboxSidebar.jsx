

const InboxSidebar = () => {
    const items = [
        {src:'/src/images/inbox1.svg',name:"Inbox"},
        {src:'/src/images/star.svg',name:"Started"},
        {src:'/src/images/borrow.svg',name:"Borrows"},
        {src:'/src/images/trash-bin1.svg',name:"Trash"},

    ]
    
    return ( 
        <>
            <button className="px-5 py-3 w-full text-base font-medium text-center inline-flex items-center justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Compose
            </button>
            <ul>
                {items.map(item => (
                    <li  className="text-lg my-5 text-gray-600 flex items-center rounded-md h-10 cursor-pointer hover:bg-blue-200   ">
                        <img className="mx-3" src={item.src}/>{item.name}
                    </li>
                )) }
            </ul>
        </>
     );
}
 
export default InboxSidebar;