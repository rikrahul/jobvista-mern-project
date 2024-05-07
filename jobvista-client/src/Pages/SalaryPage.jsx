import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import PageHeader from '../components/PageHeader'

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);
  const [storedEmail, setStoredEmail] = useState(null);


  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setStoredEmail(email);
    fetch("salary.json").then(res => res.json()).then(data => setSalary(data))
  }, [searchText])

  const handleSearch = () => {
    const filter = salary.filter((job) => job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    console.log(filter)
    setSalary(filter)

  }
  console.log(searchText)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
  const navItems = [
    { path: "/user-home", title: "Search" },
    { path: "/my-applications", title: "My Applications" },
    { path: "/salary", title: "Salary Estimate" },
    // { path: "/post-job", title: "Post Job" },
  ]
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <header className='max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
        {/* navbar  */}
        <nav className='flex justify-between items-center py-6'>
          <a href="/" className="flex items-center gap-2 text-2xl text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
              <ellipse cx="22.5" cy="21" rx="14.5" ry="15" fill="#3575E2" />
              <ellipse cx="14.5" cy="15" rx="14.5" ry="15" fill="#3575E2" fillOpacity="0.3" />
            </svg><span>JobVista</span>
          </a>
          {/*  nav items for large devices */}
          <ul className="hidden md:flex gap-12">
            {
              navItems.map(({ path, title }) => (
                <li key={path} className="text-base text-primary">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
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
          {/*signup and login button*/}
          <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
            <span className="text-gray-500">{storedEmail ? `User Panel - ${storedEmail}` : "User Panel"}</span>
            <Link to="/" className='py-2 px-5 border rounded bg-blue text-white' onClick={handleLogout}>Log Out</Link>
          </div>


          {/*mobile menu */}
          <div className='md:hidden block'>
            <button onClick={handleMenuToggler}>
              {
                isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />
              }
            </button>
          </div>
        </nav>
        {/*navitems for mobile */}
        <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
          <ul>
            {
              navItems.map(({ path, title }) => (
                <li key={path} className="text-base text-white first-text-white py-1">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
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
      <PageHeader title={"Estimate Salary"} path={"Salary"} />

      <div className='mt-5'>
        <div className='search-box p-2 text-center mb-2'>
          <input type="text" name="search" id="search" className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' onChange={(e) => setSearchText(e.target.value)} />
          <button onClick={handleSearch} className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4'>Search</button>
        </div>
      </div>

      {/* salary display card */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
        {
          salary.map((data) => (
            <div key={data.id} className='shadow px-4 py-8'>
              <h4 className='font-semibold text-xl'>{data.title}</h4>
              <p className='my-2 font-medium text-blue text-lg'>{data.salary}</p>
              <div className='flex flex-wrap gap-4'>
                <a href="/" className='underline'>{data.status}</a>
                <a href="/" className='underline'>{data.skills}</a>
              </div>
            </div>

          ))
        }
      </div>



    </div>
  )
}

export default SalaryPage