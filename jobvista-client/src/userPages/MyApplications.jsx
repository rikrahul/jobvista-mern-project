import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const MyApplications = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [application, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        // Retrieve user's email from local storage
        const storedEmail = localStorage.getItem('userEmail');
        setUserEmail(storedEmail || ''); // Set to empty string if storedEmail is null or undefined

        // Fetch application data
        fetch(`http://localhost:3000/all-jobApplicationByEmail/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setApplications(data);
                // Fetch job data
                fetch("http://localhost:3000/all-jobs")
                    .then(res => res.json())
                    .then(data => {
                        setJobs(data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching job data:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching application data:', error);
            });
    }, [userEmail]);
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

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle delete application
    const handleDelete = (applicationId) => {
        fetch(`http://localhost:3000/all-jobApplication/${applicationId}`, {
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
                    // Filter out the deleted job from the jobs array
                    setApplications(application.filter(app => app._id !== applicationId));
                    alert("Job Deleted Successfully!!!");
                } else {
                    alert("Failed to delete job. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error deleting job:", error);
                alert("An error occurred while deleting the job. Please try again later.");
            });
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'on review':
                return 'text-orange-500';
            case 'accepted':
                return 'text-green-500';
            case 'rejected':
                return 'text-red-500';
            default:
                return '';
        }
    };



    const navItems = [
        { path: "/user-home", title: "Search" },
        { path: "/my-applications", title: "My Applications" },
        { path: "/salary", title: "Salary Estimate" },
    ];

    // Filtered and sorted applications
    let filteredApplications = [...application];

    if (statusFilter) {
        filteredApplications = filteredApplications.filter(app => app.status === statusFilter);
    }

    if (sortBy === 'latest') {
        filteredApplications.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
    } else if (sortBy === 'jobTitle') {
        filteredApplications.sort((a, b) => {
            const jobA = jobs.find(job => job._id === a.jobId);
            const jobB = jobs.find(job => job._id === b.jobId);
            return jobA.jobTitle.localeCompare(jobB.jobTitle);
        });
    }
    // Filter the applied jobs based on the user's email
    //const filteredApplications = application.filter(data => data.email === userEmail);


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
<div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
          <span className="text-gray-500">{userEmail ? `User Panel - ${userEmail}` : "User Panel"}</span>
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

                        <li className='text-white py-1'><Link to="/">Log out</Link></li>
                    </ul>
                </div>
            </header>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
                <div className='font-bold text-lg text-center'>
                    Total Applied Jobs: {filteredApplications.length}
                </div>

                <div className='py-2'>
                    {/* Filter and sort controls */}
                    <div className="flex justify-end items-center mb-4">
                        <label htmlFor="statusFilter" className="mr-4">Status:</label>
                        <select
                            id="statusFilter"
                            className="border-2 border-gray-400 rounded-md px-2 py-1 mr-4"
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                        >
                            <option value="">All</option>
                            <option value="on review">On Review</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <label htmlFor="sortBy" className="mr-4">Sort by:</label>
                        <select
                            id="sortBy"
                            className="border-2 border-gray-400 rounded-md px-2 py-1"
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                        >
                            <option value="">None</option>
                            <option value="latest">Latest</option>
                            <option value="jobTitle">Job Title</option>
                        </select>
                    </div>
                    {/* Render filtered applications */}
                    {filteredApplications.map((data) => {
                        // Find the corresponding job details
                        const jobDetails = jobs.find(job => job._id === data.jobId);
                        return (
                            <div className='my-4 px-5 py-8 border-2 border-gray-200 rounded-md flex gap-10 flex-col sm:flex-row items-start text-gray-700' key={data._id}>

                                <Link to={`/application-details/${data._id}`} className="flex gap-10 flex-col sm:flex-row items-start text-gray-700">
                                    <div>
                                        {jobDetails && (
                                            <div>
                                                <img src={jobDetails.companyLogo} alt="" width={100} height={100} className='ml-2' />
                                                <p className='pt-2 text-center'>{jobDetails.companyName}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className='ml-15'>
                                        <p>Job Id: {data.jobId}</p>
                                        {jobDetails && (
                                            <p>Job Title : {jobDetails.jobTitle}</p>
                                        )}
                                        <p>Name : {data.name}</p>
                                        <p>Email : {data.email}</p>
                                        <p className={getStatusColor(data.status || 'on review')}>Status : {data.status}</p>
                                        {/* <p>Date : {new Date(data.createAt).toLocaleDateString()}</p> */}
                                        <p>Date & Time : {new Date(data.createAt).toLocaleString()}</p>
                                    </div>
                                </Link>
                                <div className="ml-auto flex items-center"> {/* Added this div for positioning Edit and Delete links */}
                                    <Link to={`/edit-application/${data?._id}`} className="mx-5 bg-blue px-4 py-2 text-white rounded-md">Edit</Link> {/* Added margin-right for spacing */}
                                    <button onClick={() => handleDelete(data._id)} className="mx-5 bg-red-600 px-4 py-2 text-white rounded-md">Delete</button>
                                </div>
                            </div>

                        );
                    })}
                </div>


            </div>
        </div>
    )
}
export default MyApplications