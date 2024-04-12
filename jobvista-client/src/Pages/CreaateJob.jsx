import { useState } from "react";
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable';
import { Bounce ,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreaateJob = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        data.skills = selectedOption;
        // console.log(data);
        fetch("http://localhost:3000/post-job", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((result) => {
            console.log(result)
            if (result.acknowledged === true) {
                toast("Job Posted Successfully!!!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Bounce,
                    style: {
                        backgroundColor: 'green',
                        color: 'white',
                    },
                });
                
            }
            reset()
        })
    };

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
                            <input type="text" defaultValue={"web Developer"}
                                {...register("jobTitle")} className="create-job-input" />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Name</label>
                            <input type="text" placeholder="Example: Microsoft"
                                {...register("companyName")} className="create-job-input" />
                        </div>
                    </div>
                    {/* 2nd row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Minimum Salary</label>
                            <input type="text" placeholder="$20k"
                                {...register("minPrice")} className="create-job-input" />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Maximum Salary</label>
                            <input type="text" placeholder="$120k"
                                {...register("maxPrice")} className="create-job-input" />
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Salary Type</label>
                            <select {...register("salaryType")} className="create-job-input">
                                <option value="">Choose your Salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Location</label>
                            <input type="text" placeholder="Example: Delhi"
                                {...register("jobLocation")} className="create-job-input" />
                        </div>
                    </div>

                    {/* 4th row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Posting Date</label>
                            <input type="date" placeholder="Example: 2023-10-28"
                                {...register("postingDate")} className="create-job-input" />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Experience Level</label>
                            <select {...register("experienceLevel")} className="create-job-input">
                                <option value="">Select your Experience Level</option>
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
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            className="create-job-input py-4" />
                    </div>

                    {/* 6th row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Logo</label>
                            <input type="url" placeholder="paste your image url: https://companylogo.com/img.jpg"
                                {...register("companyLogo")} className="create-job-input" />
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Employement Type</label>
                            <select {...register("employmentType")} className="create-job-input">
                                <option value="">Select your Employement Type</option>
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
                            defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}
                            placeholder="Job description"
                            {...register("description")} />
                    </div>

                    {/* 8th row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Posted By</label>
                        <input type="email" placeholder="your email"
                            {...register("postedBy")} className="create-job-input" />
                    </div>

                    <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" />
                </form>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition="Bounce"
/>
            </div>
        </div>
    )
}

export default CreaateJob