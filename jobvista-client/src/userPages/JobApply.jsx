import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import PageHeader from '../components/PageHeader'
import { useParams } from 'react-router-dom';

const JobApply = () => {
  const { id } = useParams();
  const [job, setJobs] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`).then(res => res.json()).then(data => setJobs(data))
  }, [])

  const statesOfIndia = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  return (
    <div className='max-w-screen-2xl conatainer mx-auto xl:px-24'>
      <PageHeader title={job.jobTitle} path={job.companyName} />

      <div className='bg-[#fafafa] m-5 py-10 px-4 rounded-2xl lg:px-16'>
        <form className="space-y-5">
          <img src={job.companyLogo} alt="" width={100} height={100} />
          <label className="block mb-2 font-bold text-lg">Job Id : {id}</label>

          {/* 1st Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Name</label>
              <div className="border-2 border-blue">
                <input type="text" class="create-job-input border-none focus:outline-none" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Email</label>
              <div className="border-2 border-blue">
                <input type="email" class="create-job-input border-none focus:outline-none" />
              </div>
            </div>
          </div>
          {/* 2nd Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Phone No.</label>
              <div className="border-2 border-blue">
                <input type="text" class="create-job-input border-none focus:outline-none" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Location</label>
              <div className='border-2 border-blue'>
                <select className="create-job-input">
                  <option value="">Select your Location</option>
                  {statesOfIndia.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* 3rd row  */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">CV</label>
              <div className='border-2 border-blue'>
                <input type="url" placeholder="paste your image url: https://cv.com/img.jpg"
                  className="create-job-input" />
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <input type="submit" class="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-lg cursor-pointer" />
          </div>

        </form>
      </div>
    </div>
  )
}

export default JobApply