import axios from "axios";
import React, { Component } from 'react';

class ApiTut extends Component {
    state = {
        posts: []
    }
    async componentDidMount() {
        const promise = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = promise.data
        this.setState({ posts })
    }


    handleAdd = post => {
        console.log('Add');

    }
    handleDelete = post => {
        console.log('Delete')
    }
    handleUpdate = post => {
        console.log('Update')
    }
    render() {
        return (
            <>
                <div className="relative overflow-x-auto">
                    <button onClick={()=>this.handleAdd()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Update
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.posts.map(item => (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button type="button" className="focus:outline-none text-white
                                    bg-green-700 hover:bg-green-800 focus:ring-4
                                    focus:ring-green-300 font-medium rounded-lg
                                        text-sm px-5 py-2.5 me-2 mb-2"
                                        onClick={() => this.handleUpdate()}>Update</button>
                                    </td>
                                    <td>
                                        <button type="button" className="focus:outline-none text-white
                                    bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300
                                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600
                                    dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() => this.handleDelete()}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default ApiTut;