import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import PDFReport from '../components/PDFReport';
import { PDFDownloadLink } from '@react-pdf/renderer';

const ApplicantDetails = () => {
    const { id } = useParams();
    const [application, setApplications] = useState({});
    const [job, setJobs] = useState({});
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        // Fetching applicant data
        fetch(`http://localhost:3000/all-jobApplication/${id}`)
            .then(res => res.json())
            .then(data => {
                setApplications(data);
                // Fetching Job data after setting the application data
                fetch(`http://localhost:3000/all-jobs/${data.jobId}`)
                    .then(res => res.json())
                    .then(jobData => setJobs(jobData))
                    .catch(error => console.error('Error fetching job data:', error));
            })
            .catch(error => console.error('Error fetching application data:', error));
    }, [id]); // Add 'id' to the dependency array

    useEffect(() => {
        if (application && job) {
            setPdfData({
                ...application,
                ...job
            });
        }
    }, [application, job]);

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24'>
            <PageHeader title={job.jobTitle} path={job.companyName} />
            <div className=' w-full my-5'>
                <h2 className='text-2xl font-bold text-center rounded-md py-2 bg-blue text-white '>Job Details</h2>
                <div className='my-4'>
                    <div className='block my-2 text-lg font-bold'>
                        <img src={job.companyLogo} alt="" width={100} height={100} />
                    </div>
                    <div className="create-job-flex pt-4">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Job Id</label>
                            <p className='text-black/70'>{application.jobId}</p>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Job Title</label>
                            <p className='text-black/70'>{job.jobTitle}</p>
                        </div>
                    </div>
                    <div className='create-job-flex pt-4'>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Company Name</label>
                            <p className='text-black/70'>{job.companyName}</p>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Job Location</label>
                            <p className='text-black/70'>{job.jobLocation}</p>
                        </div>
                    </div>
                    <div className='create-job-flex pt-4'>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Salary</label>
                            <p className='text-black bg-white px-2 py-1 rounded-md flex items-center'><LiaRupeeSignSolid />{job.minPrice}-{job.maxPrice}</p>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Posting Date</label>
                            <p className='text-black/70'>{job.postingDate}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-center rounded-md py-2 bg-blue text-white '>Applicant Details</h2>
                    <div className='create-job-flex pt-4'>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Applicant ID</label>
                            <p className='text-black/70'>{id}</p>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Name</label>
                            <p className='text-black/70'>{application.name}</p>
                        </div>
                    </div>
                    <div className='create-job-flex pt-4'>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Email</label>
                            <p className='text-black/70'>{application.email}</p>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Phone</label>
                            <p className='text-black/70'>{application.phone}</p>
                        </div>
                    </div>
                    <div className='create-job-flex pt-4'>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Cover Letter</label>
                            <p className='text-black/70'>{application.coverLetter}</p>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-1 text-lg font-bold">Date & Time</label>
                            <p className='text-black/70'>{new Date(application.createAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-8'>
                    <h2 className='text-2xl font-bold mb-4'>Resume</h2>
                    <img src={application.resume} alt="Applicant Resume" className="w-full max-w-md mb-4 border-2 border-gray-700" />
                    {pdfData && (
                        <PDFDownloadLink document={<PDFReport data={pdfData} />} fileName="report.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                        </PDFDownloadLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicantDetails;
