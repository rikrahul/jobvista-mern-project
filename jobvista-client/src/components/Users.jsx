import React, { useState, useEffect } from 'react';
import { IoSearch, IoFilterSharp } from "react-icons/io5";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userRoleFilter, setUserRoleFilter] = useState(''); // State to store the selected user role filter
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch user data
        fetch(`http://localhost:3000/all-usersignup`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data); // Initialize filtered users with all users
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    // Function to filter users based on user role
    const filterUsersByRole = (role) => {
        setUserRoleFilter(role);
        if (role === '') {
            setFilteredUsers(users); // If no role is selected, show all users
        } else {
            const filtered = users.filter(user => user.userType === role);
            setFilteredUsers(filtered);
        }
    };

    // Function to filter users based on search query
    const filterUsersByName = (query) => {
        setSearchQuery(query);
        const filtered = users.filter(user =>
            user.fullName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/all-usersignup/${id}`, {
            method: "DELETE",
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to delete job. Server returned status ${res.status}.`);
            }
            return res.json();
        })
        .then(data => {
            if (data.acknowledged === true) {
                // Filter out the deleted user from both users and filteredUsers arrays
                const updatedUsers = users.filter(user => user._id !== id);
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
                alert("User Deleted Successfully!!!");
            } else {
                alert("Failed to delete User. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user. Please try again later.");
        });
    }
    

    return (
        <div className="px-5 py-3 ">
            <h2 className="text-2xl font-bold mb-4">Total Users : {users.length}</h2>
            <div className="flex items-center mb-4">
                {/* Search input field with search icon */}
                <div className="relative flex items-center">
                    <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md pl-10" 
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => filterUsersByName(e.target.value)}
                    />
                    <IoSearch className="h-6 w-6 text-gray-400 absolute left-3 top-2.5" /> {/* Search icon */}
                </div>
                {/* Dropdown menu to select user role */}
                <select
                    className="px-4 py-2 border border-gray-300 rounded-md ml-3"
                    value={userRoleFilter}
                    onChange={(e) => filterUsersByRole(e.target.value)}
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="user">User</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Users</h3>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            NO.
                                        </th>
                                        <th className="px-10 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>
                                        <th className="px-10 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Email
                                        </th>
                                        <th className="px-10 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            User-Role
                                        </th>
                                        <th className="px-10 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Id
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            DELETE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">Loading...</td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((data, index) => (
                                            <tr key={index}>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="border-t-0 px-10 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data.fullName}
                                                </td>
                                                <td className="border-t-0 px-10 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data.email}
                                                </td>
                                                <td className="border-t-0 px-10 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data.userType}
                                                </td>
                                                <td className="border-t-0 px-10 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {data._id}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button onClick={() => handleDelete(data._id)} className="bg-red-600 px-6 py-2 text-white rounded-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>




    );
};

export default Users;
