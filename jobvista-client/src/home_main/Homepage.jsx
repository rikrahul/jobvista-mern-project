import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Singup'
import Login from './Login';


const Homepage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (

        <div className='max-w-screen-2x1 container mx-auto xl:px-24 px-4 '>
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
            <div className='max-w-screen-2xl container flex align-content justify-between mx-auto xl:px-4 px-4 md:py-20 py-14'>
                <div className='mt-8'>
                    <h1 className='text-5xl font-bold text-primary mb-3'>Find your <span className='text-blue'>Dream job</span> today</h1>
                    <p className='text-lg max-w-screen-sm text-black/70 mb-8'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you.</p>
                    <button className='mt-8 py-2 px-8 border rounded bg-blue text-white text-2xl'>Find</button>
                </div>
                <img src="\public\images\search.jpg" alt="" className='max-w-md' />
            </div>
        </div>
    )
}

export default Homepage;
