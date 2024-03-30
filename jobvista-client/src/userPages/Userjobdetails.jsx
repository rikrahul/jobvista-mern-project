import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader';
import { LiaRupeeSignSolid } from 'react-icons/lia';

const Userjobdetails = () => {
    const { id } = useParams();
    const [job, setJobs] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/all-jobs/${id}`).then(res => res.json()).then(data => setJobs(data))
    }, [])

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/user-home", title: "Search" },
        { path: "/my-applications", title: "My Applications" },
        { path: "/salary", title: "Salary Estimate" },
        // { path: "/post-job", title: "Post Job" },
    ]

    return (
        <div className='max-w-screen-2xl conatainer mx-auto xl:px-24'>
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
            <PageHeader title={job.jobTitle} path={job.jobTitle} />

            <div className="w-full">
                <label className="block mb-2 font-bold text-lg">Job Id</label>
                <p className='text-black/70'>{id}</p>
            </div>
            {/* 1st Row */}
            <div className="create-job-flex pt-4">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-1 text-lg font-bold">Job Title</label>
                    <p className='text-black/70'>{job.jobTitle}</p>
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-1 text-lg font-bold">Company Name</label>
                    <p className='text-black/70'>{job.companyName}</p>
                </div>
            </div>
            {/* 2nd Row */}
            <div className="create-job-flex pt-4">
                <div className="lg:w-1/2 w-full ">
                    <label className="block mb-1 text-lg font-bold">Salary</label>
                    <p className='text-black/70 flex items-center'><LiaRupeeSignSolid />{job.minPrice}-{job.maxPrice}</p>
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-1 text-lg font-bold">Salary Type</label>
                    <p className='text-black/70'>{job.salaryType}</p>
                </div>
            </div>
            {/* 3rd row */}
            <div className="create-job-flex pt-4">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-1 text-lg font-bold">Job Location</label>
                    <p className='text-black/70'>{job.jobLocation}</p>
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-1 text-lg font-bold">Posting Date</label>
                    <p className='text-black/70'>{job.postingDate}</p>
                </div>
            </div>
            {/* 4th row  */}
            <div className="create-job-flex pt-4">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-1 text-lg font-bold">Experience Level</label>
                    <p className='text-black/70'>{job.experienceLevel}</p>
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-1 text-lg font-bold">Employment Type</label>
                    <p className='text-black/70'>{job.employmentType}</p>
                </div>
            </div>
            {/* 5th row */}
            <div className='create-job-flex pt-4'>
                <div>
                    <label className="block mb-4 text-lg font-bold">Required Skill Sets:</label>
                    {job.skills && job.skills.length > 0 && (
                        <ul className=''>
                            {job.skills.map((skill, index) => (
                                <li key={index} className='bg-[#fafafa] inline p-2 m-2 border rounded-lg'>{skill.label}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {/* 6th row */}
            <div className="flex flex-col pt-6">
                <label className="block mb-2 text-lg font-bold">Job Description</label>
                <p className='text-black/70'>{job.description}
                    <p className='text-base text-primary/70 mb-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt blanditiis voluptate placeat nobis odio nihil quis minima odit, dolor, id natus dolore! Enim ut dicta perspiciatis quasi repellat deserunt nesciunt blanditiis. Qui voluptates magnam harum consequatur possimus error totam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus perferendis explicabo aliquid repellendus ea facilis asperiores nesciunt labore. Fuga, veritatis dicta molestias illum numquam eos! Soluta incidunt alias exercitationem cumque repellat reprehenderit dolore qui consequuntur accusamus. Molestias ipsa nesciunt at architecto officia reiciendis ducimus illum similique veritatis placeat voluptatem repellendus, rerum minus doloribus a consequuntur reprehenderit corrupti nemo itaque magnam?
                    </p>
                </p>
            </div>
            {/* 7th row  */}
            <div className="w-full mb-5">
                <label className="block mb-2 font-bold text-lg">Job Posted By</label>
                <p className='text-black/70'>{job.postedBy}</p>
            </div>
            <Link to={`/job-applications/${id}`} className="inline bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer">Apply Now</Link>
            {/* <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" /> */}

        </div>
    )
}

export default Userjobdetails