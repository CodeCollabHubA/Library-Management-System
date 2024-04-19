

const InboxSidebar = () => {
    const items = [
        {src:'/src/images/inbox.svg',name:"Inbox"},
        {src:'',name:"Started"},
        {src:'',name:"Snoozed"},
        {src:'',name:"Sent"},
        {src:'',name:"Drafts"},
        {src:'',name:"Trash"},
    ]
    
    return ( 
        <>
            <button className="px-5 py-3 w-full text-base font-medium text-center inline-flex items-center justify-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Compose
            </button>
            <ul>
                {items.map(item => (
                    <li  className="text-lg my-5 text-gray-600 ">
                        <img src={item.src}/>{item.name}
                    </li>
                )) }
            </ul>
        </>
     );
}
 
export default InboxSidebar;