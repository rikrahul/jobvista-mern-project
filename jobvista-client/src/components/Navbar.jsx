import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {FaBarsStaggered, FaXmark} from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen]= useState(false)
    const handleMenuToggler = () =>{
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems =[
        {path: "/home", title: "Search"},
        {path: "/my-job", title: "My Jobs"},
        {path: "/post-job", title: "Post Job"},
        {path: "/job-applicants", title: "Job Applicants"}
    ]
  return (
    <header className='max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
        <nav className='flex justify-between items-center py-6'>
            <a href="/" className="flex items-center gap-2 text-2xl text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
  <ellipse cx="22.5" cy="21" rx="14.5" ry="15" fill="#3575E2"/>
  <ellipse cx="14.5" cy="15" rx="14.5" ry="15" fill="#3575E2" fillOpacity="0.3"/>
</svg><span>JobVista</span>
            </a>
            {/*  nav items for large devices */}
            <ul className="hidden md:flex gap-12">
                {
                    navItems.map(({path,title}) => (
                        <li key={path} className="text-base text-primary">
                  <NavLink
                    to={path}
                    className={({ isActive}) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    {title}
                  </NavLink>
                        </li>
                     ))
                }
            </ul>

            {/*signup and login button*/}
            <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                {/* <Link to="/login" className='py-2 px-5 border rounded'>Log in</Link> */}
                {/* <div className='bg-[#fafafa] py-2 px-5  border rounded-lg'>Admin</div> */}
                <Link to="/" className='py-2 px-5 border rounded bg-blue text-white'>Log Out</Link>
            </div>


            {/*mobile menu */}
            <div className='md:hidden block'>
                <button onClick={handleMenuToggler}>
                  {
                    isMenuOpen ? <FaXmark className='w-5 h-5 text-primary'/> : <FaBarsStaggered className='w-5 h-5 text-primary'/>
                  }
                </button>
            </div>
        </nav>


        {/*navitems for mobile */}
        <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
          <ul>
          {
                    navItems.map(({path,title}) => (
                        <li key={path} className="text-base text-white first-text-white py-1">
                  <NavLink
                    to={path}
                    className={({ isActive}) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    {title}
                  </NavLink>
                        </li>
                     ))
                }

            <li className='text-white py-1'><Link to="/login">Log in</Link></li>
          </ul>
        </div>
    </header>
  )
}

export default Navbar