import { useState } from "react";
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable';
import { useLoaderData, useParams } from 'react-router-dom'

const UpdateJob = () => {
    const {id}= useParams();
    // console.log(id)
    const {_id,jobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,experienceLevel,companyLogo,employmentType,description,postedBy,skills}= useLoaderData()
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        if (selectedOption) {
            data.skills = selectedOption;
        }
        fetch(`http://localhost:3000/update-job/${id}`,{
            method: "PATCH",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => res.json()).then((result) => {
            if(result.acknowledged === true){
                alert("Job Updated Successfully!!!");
            }
        });
    };
    

    // const resetForm = () => {
    //     // Reset individual input values
    //     // You can add more fields as needed
    //     reset({
    //         jobTitle: "",
    //         companyName: "",
    //         minPrice: "",
    //         maxPrice: "",
    //         salaryType: "",
    //         jobLocation: "",
    //         postingDate: "",
    //         experienceLevel: "",
    //         companyLogo: "",
    //         employmentType: "",
    //         description: "",
    //         postedBy: ""
    //     });
    // };

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
    <div className='max-w-screen-2xl conatiner mx-auto xl:px-24 px-4'>
    {/* Form */}
    <div className='bg-[#fafafa] mb-5 py-10 px-4 rounded-2xl lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* 1st Row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Job Title</label>
                    <input type="text" defaultValue={jobTitle}
                        {...register("jobTitle")} className="create-job-input" />
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Company Name</label>
                    <input type="text" defaultValue={companyName} placeholder="Example: Microsoft"
                        {...register("companyName")} className="create-job-input" />
                </div>
            </div>
            {/* 2nd row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Minimum Salary</label>
                    <input type="text" defaultValue={minPrice} placeholder="$20k"
                        {...register("minPrice")} className="create-job-input" />
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Maximum Salary</label>
                    <input type="text" defaultValue={maxPrice} placeholder="$120k"
                        {...register("maxPrice")} className="create-job-input" />
                </div>
            </div>

            {/* 3rd row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Salary Type</label>
                    <select {...register("salaryType")} className="create-job-input">
                        <option value={salaryType}>{salaryType}</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Job Location</label>
                    <input type="text" defaultValue={jobLocation} placeholder="Example: Delhi"
                        {...register("jobLocation")} className="create-job-input" />
                </div>
            </div>

            {/* 4th row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Job Posting Date</label>
                    <input type="date" defaultValue={postingDate} placeholder="Example: 2023-10-28"
                        {...register("postingDate")} className="create-job-input" />
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Experience Level</label>
                    <select {...register("experienceLevel")} className="create-job-input">
                        <option value={experienceLevel}>{experienceLevel}</option>
                                <option value="No Experience">No Experience</option>
                                <option value="less than 1yr">less than 1yr</option>
                                <option value="1yr-2yr">1yr-2yr</option>
                                <option value="2yr-5yr">2yr-5yr</option>
                                <option value="more than 5yr">more than 5yr</option>
                    </select>
                </div>

            </div>

            {/* 5th row */}
            <div>
                <label className="block mb-2 text-lg">Required Skill Sets:</label>
                <CreatableSelect
                    defaultValue={skills}
                    onChange={setSelectedOption}
                    options={options}
                    isMulti
                    className="create-job-input py-4" />
            </div>

            {/* 6th row */}
            <div className="create-job-flex">
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Company Logo</label>
                    <input type="url" defaultValue={companyLogo} placeholder="paste your image url: https://companylogo.com/img.jpg"
                        {...register("companyLogo")} className="create-job-input" />
                </div>
                <div className="lg:w-1/2 w-full">
                    <label className="block mb-2 text-lg">Employement Type</label>
                    <select {...register("employmentType")} className="create-job-input">
                        <option value={employmentType}>{employmentType}</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Temporary">Temporary</option>
                    </select>
                </div>

            </div>

            {/* 7th row */}
            <div className="w-full">
                <label className="block mb-2 text-lg">Job Description</label>
                <textarea className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
                    rows={6}
                    defaultValue={description}
                    placeholder="Job description"
                    {...register("description")} />
            </div>

            {/* 8th row */}
            <div className="w-full">
                <label className="block mb-2 text-lg">Job Posted By</label>
                <input type="email" defaultValue={postedBy} placeholder="your email"
                    {...register("postedBy")} className="create-job-input" />
            </div>

            <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" />
        </form>

    </div>
</div>
  )
}

export default UpdateJob