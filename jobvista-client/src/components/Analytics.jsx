import React, { useEffect, useState } from 'react';

const Analytics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [admins, setAdmins] = useState(0);
    const [recruiters, setRecruiters] = useState(0);
    const [regularUsers, setRegularUsers] = useState(0);
    const [onReviewCount, setOnReviewCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    useEffect(() => {
        // Fetch user data
        fetch(`http://localhost:3000/all-usersignup`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        fetch(`http://localhost:3000/all-jobs`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
            });

        fetch(`http://localhost:3000/all-jobApplication`)
            .then(res => res.json())
            .then(data => {
                setApplications(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching application data:', error);
            });
    }, []);

    useEffect(() => {
        // Calculate the number of admins, recruiters, and regular users
        const calculateUserTypes = () => {
            let adminCount = 0;
            let recruiterCount = 0;
            let regularUserCount = 0;

            users.forEach(user => {
                if (user.userType === 'admin') {
                    adminCount++;
                } else if (user.userType === 'recruiter') {
                    recruiterCount++;
                } else {
                    regularUserCount++;
                }
            });

            setAdmins(adminCount);
            setRecruiters(recruiterCount);
            setRegularUsers(regularUserCount);
        };

        if (users.length > 0) {
            calculateUserTypes();
        }
    }, [users]);

    useEffect(() => {
        // Calculate the counts for different application statuses
        const calculateApplicationStatuses = () => {
            let onReview = 0;
            let accepted = 0;
            let rejected = 0;

            applications.forEach(application => {
                if (application.status === 'on review') {
                    onReview++;
                } else if (application.status === 'accepted') {
                    accepted++;
                } else if (application.status === 'rejected') {
                    rejected++;
                }
            });

            setOnReviewCount(onReview);
            setAcceptedCount(accepted);
            setRejectedCount(rejected);
        };

        if (applications.length > 0) {
            calculateApplicationStatuses();
        }
    }, [applications]);

    return (
        <div className='px-5 py-3'>
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
                <div className='rounded-lg bg-orange-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{users.length}</h4>
                    <p className='my-2 font-medium text-lg'>Total Users</p>
                </div>
                <div className='rounded-lg bg-green-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{admins}</h4>
                    <p className='my-2 font-medium text-lg'>Admins</p>
                </div>
                <div className='rounded-lg bg-yellow-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{recruiters}</h4>
                    <p className='my-2 font-medium text-lg'>Recruiters</p>
                </div>
                <div className='rounded-lg bg-indigo-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{regularUsers}</h4>
                    <p className='my-2 font-medium text-lg'>Applicants</p>
                </div>
            </div>

            {/* Job information display */}
            <h2 className="text-2xl font-bold mb-4">Jobs & Application Information</h2>
            <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
                <div className='rounded-lg bg-amber-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{jobs.length}</h4>
                    <p className='my-2 font-medium text-lg'>Total Jobs</p>
                </div>
                <div className='rounded-lg bg-cyan-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{onReviewCount}</h4>
                    <p className='my-2 font-medium text-lg'>Applications on Review</p>
                </div>
                <div className='rounded-lg bg-violet-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{acceptedCount}</h4>
                    <p className='my-2 font-medium text-lg'>Accepted Applications</p>
                </div>
                <div className='rounded-lg bg-red-400 text-white shadow-lg px-4 py-8'>
                    <h4 className='font-semibold text-xl'>{rejectedCount}</h4>
                    <p className='my-2 font-medium text-lg'>Rejected Applications</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
