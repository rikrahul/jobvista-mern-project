import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import Banner from "../components/Banner";
import Jobs from "../Pages/Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import Ucard from '../components/Ucard';

const Userhome = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/all-jobs").then(res => res.json()).then(data => {
            setJobs(data);
            setIsLoading(false);
        })
    }, []);

    //console.log(jobs)
    //handle input change
    const [query, setQuery] = useState("");
    const handleInputChange = (event) => {
        setQuery(event.target.value)
    }

    //  filter jobs by title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)

    // ------------Radio based filtering------------
    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    // ------------Button based filtering------------
    const handleClick = (event) => {
        setSelectedCategory(event.target.value)
    }

    // calculate the index range
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    }

    //function for the next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    // function for the previous Page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }


    // main function
    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;

        //filtering input items
        if (query) {
            filteredJobs = filteredItems;
        }

        // category filtering
        if (selected) {
            // Convert selected date string to Date object
            const selectedDate = new Date(selected);
            filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) =>
                jobLocation.toLowerCase() === selected.toLowerCase() ||
                parseInt(maxPrice) <= parseInt(selected) ||
                experienceLevel.toLowerCase() === selected.toLowerCase() ||
                salaryType.toLowerCase() === selected.toLowerCase() ||
                employmentType.toLowerCase() === selected.toLowerCase() ||
                new Date(postingDate) >= selectedDate // Convert postingDate to Date object for comparison
            );
            console.log(filteredJobs);
        }

        // slice the data based on current page
        const { startIndex, endIndex } = calculatePageRange();
        filteredJobs = filteredJobs.slice(startIndex, endIndex)
        return filteredJobs.map((data, i) => <Ucard key={i} data={data} />)

    }
    const result = filteredData(jobs, selectedCategory, query);


    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/user-home", title: "Search" },
        { path: `/my-applications`, title: "My Applications" },
        { path: "/salary", title: "Salary Estimate" },
        // { path: "/post-job", title: "Post Job" },
    ]
    return (
        <div>
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
                    <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                        {/* <Link to="/login" className='py-2 px-5 border rounded'>Log in</Link> */}
                        <Link to="/" className='py-2 px-5 border rounded bg-blue text-white'>Log Out</Link>
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

            <Banner query={query} handleInputChange={handleInputChange} />

            {/* main content */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">

                {/* Left Side */}
                <div className="bg-white p-4 rounded">
                    <Sidebar handleChange={handleChange} handleClick={handleClick} />
                </div>

                {/* Job cards */}
                <div className="col-span-2 bg-white p-4 rounded-sm">
                    {
                        isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ? (<Jobs result={result} />) : <>
                            <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                            <p>No Data found!</p>
                        </>
                    }

                    {/* Pagination here */}
                    {
                        result.length > 0 ? (
                            <div className="flex justify-center mt-4 space-x-8">
                                <button onClick={prevPage} disabled={currentPage === 1} className="hover:underline">Previous</button>
                                <span className="mx-2"></span>
                                <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className="hover:underline">Next</button>
                            </div>
                        ) : ""
                    }


                </div>

                {/* Right side */}
                <div className="bg-white p-4 rounded"><Newsletter /></div>
            </div>

        </div>
    )
}

export default Userhome