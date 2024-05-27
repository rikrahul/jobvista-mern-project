import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {FaBarsStaggered, FaXmark} from "react-icons/fa6";
import Swal from 'sweetalert2'
import 'animate.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen]= useState(false)
    const [storedEmail, setStoredEmail] = useState(null);
    const handleMenuToggler = () =>{
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
      const email = localStorage.getItem('userEmail');
      setStoredEmail(email); // Set storedEmail state with the retrieved email
  }, []);

    const navItems =[
        {path: "/home", title: "Search"},
        {path: "/my-job", title: "My Jobs"},
        {path: "/post-job", title: "Post Job"},
        {path: "/job-applicants", title: "Job Applicants"},
        {path: "/dashboard", title: "Dashboard"}
    ]
    const handleLogout = () => {
      Swal.fire({
          title: "Log Out Successful !!",
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
      }).then(() => {
          // Redirect to root page after alert is closed
          window.location.href = "/";
      });
  };
  return (
    <header className='max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
        <nav className='flex justify-between items-center py-6'>
            <a href="/home" className="flex items-center gap-2 text-2xl text-black">
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
    <span className="text-gray-500">{storedEmail ? `Admin Panel - ${storedEmail}` : "Admin Panel"}</span>
    <Link to="/" className='py-2 px-5 border rounded bg-blue text-white' onClick={handleLogout}>Log Out</Link>            
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

            <li className='text-white py-1'><Link to="/">Log Out</Link></li>
          </ul>
        </div>
    </header>
  )
}

export default Navbar