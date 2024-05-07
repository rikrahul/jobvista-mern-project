import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import 'animate.css';

const Singup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '' // Added userType field to the form data
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation
        const newErrors = {};
        if (formData.fullName.trim() === '') {
            newErrors.fullName = 'Full Name is required';
        }
        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        }
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        }
        if (formData.userType === '') {
            newErrors.userType = 'User type is required';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
    
        if (Object.keys(newErrors).length === 0) {

            const formDataToSend = { ...formData };
            if (formData.password === formData.confirmPassword) {
                delete formDataToSend.confirmPassword;
            }
    
            fetch("http://localhost:3000/sign-up", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formDataToSend)
            }).then(res => res.json()).then((result) => {
                console.log(result)
                if (result.acknowledged === true) {
                    // alert("Signup Successfully!!!")
                    Swal.fire({
                        title: "Signup Successful !!",
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
                }
            })
    
            // Reset form data
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                userType: ''
            });
        } else {
            // If there are errors, update the state to display them
            setErrors(newErrors);
        }
    };
    

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
            <Link to="/login" className='py-2 px-5 border rounded'>Log in</Link>
            <Link to="/sign-up" className='py-2 px-5 border rounded bg-blue text-white'>Sign up</Link>
        </div>
    </nav>

    <div className="max-w-md mx-auto border border-gray-300 rounded-md px-10 py-8">
    <h2 className="text-3xl font-semibold mb-4 text-center">Sign up</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="userType" className="block mb-1">User Type</label>
            <select id="userType" name="userType" value={formData.userType} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
                <option value="">Select User Type</option>
                {/*<option value="admin">Admin</option> */}
                <option value="recruiter">Recruiter</option>
                <option value="user">User</option>
            </select>
            {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
        </div>
        <div>
            <label htmlFor="fullName" className="block mb-1">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>
        <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div>
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">Register</button>
        {/* <p className="mt-2 ">Already have an account? <Link to="/login">Login</Link></p> */}
    </form>
</div>
</div>
  )
}

export default Singup