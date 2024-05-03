import React, { useState, useEffect } from 'react';
import { IoSearch, IoFilterSharp } from "react-icons/io5";
import * as XLSX from 'xlsx';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userRoleFilter, setUserRoleFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/all-usersignup`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const filterUsersByRole = (role) => {
        setUserRoleFilter(role);
        if (role === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => user.userType === role);
            setFilteredUsers(filtered);
        }
    };

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

    const handleExportToExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'users_data';

        const exportedData = users.map(({ fullName, email, userType, _id }, index) => ({
            '#': index + 1,
            'Name': fullName,
            'Email': email,
            'User-Role': userType,
            'Id': _id
        }));

        const ws = XLSX.utils.json_to_sheet(exportedData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], { type: fileType });
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName + fileExtension;
        link.click();
    };

    return (
        <div className="px-5 py-3 ">
            <h2 className="text-2xl font-bold mb-4">Total Users : {users.length}</h2>
            <div className="flex items-center mb-4">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md pl-10" 
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => filterUsersByName(e.target.value)}
                    />
                    <IoSearch className="h-6 w-6 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-md ml-3"
                    value={userRoleFilter}
                    onChange={(e) => filterUsersByRole(e.target.value)}
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button onClick={handleExportToExcel} className="bg-blue-500 text-white bg-blue px-4 py-2 rounded-md mb-4">Export to Excel</button>
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
