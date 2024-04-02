import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const JobApplicants = () => {
    const [userEmail, setUserEmail] = useState('');
    const [application, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
    },);



    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
                <div className='font-bold text-lg text-center'>
                    Job Applicants : {application.length}
                </div>

                <div className='py-2'>
                    {/* Render filtered applications */}
                    {application.map((data) => {
                        // Find the corresponding job details
                        const jobDetails = jobs.find(job => job._id === data.jobId);
                        return (
                            <Link to={`/application-details/${data._id}`} className='my-4 px-5 py-8 border-2 border-gray-200 rounded-md flex gap-10 flex-col sm:flex-row items-start text-gray-700' key={data._id}>
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
                                    {/* <p>Date : {new Date(data.createAt).toLocaleDateString()}</p> */}
                                    <p>Date & Time : {new Date(data.createAt).toLocaleString()}</p>
                                </div>
                            </Link>

                        );
                    })}
                </div>


            </div>
        </div>
    )
}

export default JobApplicants