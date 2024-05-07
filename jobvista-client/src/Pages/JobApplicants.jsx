import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobApplicants = () => {
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch application data
        fetch(`http://localhost:3000/all-jobApplication`)
            .then(res => res.json())
            .then(data => {
                setApplications(data);
            })
            .catch(error => {
                console.error('Error fetching application data:', error);
            });

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
    }, []);

    const handleStatusChange = (applicationId, event) => {
        const newStatus = event.target.value;
        fetch(`http://localhost:3000/update-application/${applicationId}`, {
            method: "PATCH",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        }).then(res => res.json())
            .then((result) => {
                if (result.acknowledged === true) {
                    setApplications(prevApplications => prevApplications.map(application => {
                        if (application._id === applicationId) {
                            return { ...application, status: newStatus };
                        }
                        return application;
                    }));
                    alert("Application Updated Successfully!!!");
                }
            })
            .catch(error => {
                console.error('Error updating application status:', error);
                alert("Failed to update application status");
            });
    };

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

    // Apply filters and sorting
    let filteredApplications = [...applications];

    if (statusFilter) {
        filteredApplications = filteredApplications.filter(app => app.status === statusFilter);
    }

    if (searchQuery) {
        filteredApplications = filteredApplications.filter(app => {
            const jobDetails = jobs.find(job => job._id === app.jobId);
            return jobDetails && jobDetails.companyName.toLowerCase().includes(searchQuery.toLowerCase());
        });
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

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
                <div className='font-bold text-lg text-center'>
                    Job Applicants : {filteredApplications.length}
                </div>
            {/* Search field */}
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search by company name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 text-center border-gray-400 rounded-md px-2 py-1 mr-2 w-60"
                />
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
                                <div className="ml-auto flex items-center">
                                    <select
                                        className="border-2 border-gray-400 rounded-md px-2 py-1 mr-2"
                                        defaultValue={data.status}
                                        onChange={(event) => handleStatusChange(data._id, event)}
                                    >
                                        <option value="on review">on review</option>
                                        <option value="accepted">accepted</option>
                                        <option value="rejected">rejected</option>
                                    </select>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default JobApplicants;
