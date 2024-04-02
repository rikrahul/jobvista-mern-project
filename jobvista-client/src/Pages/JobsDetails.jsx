import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader';
import { LiaRupeeSignSolid } from 'react-icons/lia';


const JobsDetails = () => {
  const { id } = useParams();
  const [job, setJobs] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`).then(res => res.json()).then(data => setJobs(data))
  }, [])

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "Python", label: "Python" },
    { value: "React", label: "React" },
    { value: "C#", label: "C#" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ]
  return (
    <div className='max-w-screen-2xl conatainer mx-auto xl:px-24'>
      <PageHeader title={job.jobTitle} path={job.jobTitle} />
      <div className="w-full">
                <label className="block my-2 font-bold text-lg">Job Id</label>
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
      <div className="flex flex-col pt-6 mb-5">
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
      {/* <button className="block my-8 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer">Apply</button> */}
      {/* <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" /> */}

    </div>
  )
}

export default JobsDetails