import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import 'animate.css';

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '', userType: '' });
    const [errors, setErrors] = useState({});

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (loginData.email.trim() === '') {
            newErrors.email = 'Email is required';
        }
        if (loginData.password.trim() === '') {
            newErrors.password = 'Password is required';
        }
        if (loginData.userType.trim() === '') {
            newErrors.userType = 'User type is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to login.');
                }

                await Swal.fire({
                    title: "Login Successful !!",
                    showClass: {
                        popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                        `
                    },
                    hideClass: {
                        popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                        `
                    }
                });

                console.log('Login successful!');
                if (loginData.userType.trim() === 'admin') {
                    window.location.href = "/home";
                }
                else if (loginData.userType.trim() === 'user') {
                    localStorage.setItem('userEmail', loginData.email);
                    window.location.href = `/user-home`;
                }
                else if (loginData.userType.trim() === 'recruiter') {
                    localStorage.setItem('userEmail', loginData.email);
                    window.location.href = `/recruiter-home`;
                }


            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Something went wrong!",
                });
                console.error('Login error:', error.message);
                // Handle error, such as displaying error message to the user
            }
        }
    };


    // const handleLoginSubmit = (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
    //         // Add login logic here
    //         console.log('Login data:', loginData);
    //     }
    // };

    return (
        <div className='max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center py-6'>
                <a href="/" className="flex items-center gap-2 text-2xl text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                        <ellipse cx="22.5" cy="21" rx="14.5" ry="15" fill="#3575E2" />
                        <ellipse cx="14.5" cy="15" rx="14.5" ry="15" fill="#3575E2" fillOpacity="0.3" />
                    </svg><span>JobVista</span>
                </a>
                <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                    {/* <button onClick={handleLoginClick} className='py-2 px-5 border rounded'>Log in</button>
                    <button onClick={handleSignupClick} className='py-2 px-5 border rounded bg-blue text-white'>Sign up</button> */}

                    <Link to="/login" className='py-2 px-5 border rounded'>Log in</Link>
                    <Link to="/sign-up" className='py-2 px-5 border rounded bg-blue text-white'>Sign up</Link>
                </div>
            </nav>
            <div className="max-w-md mx-auto border border-gray-300 rounded-md px-10 py-8">
                <h2 className=" text-center text-3xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userType" className="block mb-1">User Type</label>
                        <select id="userType" name="userType" value={loginData.userType} onChange={handleLoginChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
                            <option value="">Select User Type</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                        {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input type="email" id="email" name="email" value={loginData.email} onChange={handleLoginChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input type="password" id="password" name="password" value={loginData.password} onChange={handleLoginChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button type="submit" className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
