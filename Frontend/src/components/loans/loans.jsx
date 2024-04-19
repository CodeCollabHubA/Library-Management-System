import Table from "../common/table";
const Loans = () => {
    const header = [
        {name:'User request',id:23 },
        {name:'status',id:93 },
        {name:'Action',id:3 }
    ]
    const editbuttonPath='/dasbhoard'
    const loans = [
        {
            userName: 'man',
            credit:'text',
        }
    ]
    return ( 
        <>
            Loans
            {/* <Table headerItems={header} bodyItmes={loans} editbuttonPath={editbuttonPath} /> */}
        </>
     );
}
 
export default Loans;