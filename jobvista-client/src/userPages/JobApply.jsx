import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHeader from '../components/PageHeader';
import { useParams } from 'react-router-dom';

const JobApply = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Destructure reset from useForm
  const { id } = useParams();
  const [job, setJobs] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [resumeImage, setResumeImage] = useState(null);

  useEffect(() => {
    // Retrieve user's email from local storage
    const storedEmail = localStorage.getItem('userEmail');
    setUserEmail(storedEmail || '');
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then(res => res.json())
      .then(data => setJobs(data));
  }, [id]); // Include id in dependency array

  const onSubmit = (data) => {
    // Add jobId to the form data
    data.jobId = id;
    data.email = userEmail;
    data.status = "on review"

    fetch(`http://localhost:3000/job-applications/${id}`, {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        if (result.acknowledged === true) {
          alert("Job Applied Successfully!!!")
          reset(); // Reset form fields after successful submission
          setResumeImage(null);
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Handle error if submission fails
      });
  };

  const handleResumeChange = (event) => {
    const imageUrl = event.target.value;
    setResumeImage(imageUrl);
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24'>
      <PageHeader title={job.jobTitle} path={job.companyName} />

      <div className='bg-gray-100 m-5 py-10 px-4 rounded-2xl lg:px-16 '>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-8 bg-white rounded-lg">
          <h2 className="text-2xl bg-blue px-5 py-2 text-white text-center font-bold mb-4">Job Application Form</h2>
          <div className='my-4 flex justify-center items-center'>
            <img src={job.companyLogo} alt="" width={100} height={100} />
          </div>
          <div className='mb-4'>
            <label className="block mb-2 text-center text-gray-500 font-bold">{job.companyName}</label>
            <label className="block mb-2 font-bold">Job Id</label>
            <input
              {...register("jobId")}
              type="text"
              id="jobId"
              value={id}
              disabled
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="name">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              id="email"
              value={userEmail}
              disabled
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {/* {errors.email && <p className="text-red-500">{errors.email.message}</p>} */}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="phone">Phone</label>
            <input
              {...register("phone", { required: "Phone number is required", pattern: { value: /^[0-9]*$/, message: "Invalid phone number" } })}
              type="tel"
              id="phone"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="resume">Upload Resume</label>
            <input
              {...register("resume", { required: "Resume is required" })}
              type="url"
              placeholder="Paste your resume URL"
              id="resume"
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={handleResumeChange}
            />
            {errors.resume && <p className="text-red-500">{errors.resume.message}</p>}
            <div className='my-4 flex justify-center items-center'>
            {resumeImage && <img src={resumeImage} alt="Resume Preview" className="max-w-full h-auto" />}
          </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="coverLetter">Cover Letter</label>
            <textarea
              {...register("coverLetter", { required: "Cover letter is required" })}
              id="coverLetter"
              className="border border-gray-300 rounded-md p-2 w-full h-32"
            />
            {errors.coverLetter && <p className="text-red-500">{errors.coverLetter.message}</p>}
          </div>
          <button type="submit" className="bg-blue text-white px-4 py-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;