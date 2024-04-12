import React, { useState } from 'react'
import { FaQuestionCircle, FaRegSmile } from "react-icons/fa"

const Newsletter = () => {
    const [openIndex, setOpenIndex] = useState(null); // State to track which FAQ item is open

    // Function to handle click event and toggle FAQ visibility
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {/* FAQs */}
            <div className='mt-10'>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                    <FaQuestionCircle />
                    FAQs
                </h3>
                <div className='text-primary/75 text-base mb-4'>
                    {/* Map through each FAQ item */}
                    {[...Array(4).keys()].map((index) => (
                        <div className='bg-gray-100 rounded-md shadow-md px-2 py-2 my-2' key={index}>
                            {/* Render FAQ title with a clickable button */}
                            <button
                                className='flex items-center justify-between w-full text-left focus:outline-none'
                                onClick={() => handleToggle(index)}
                                style={{ marginBottom: openIndex === index ? '0' : '0.5rem' }} // Adjust margin based on open state
                            >
                                <strong >Q: {faqQuestions[index]}</strong>
                                {/* Change the icon based on whether the FAQ is open or closed */}
                                {openIndex === index ? '-' : '+'}
                            </button>
                            {/* Render FAQ answer only if it's open */}
                            <div style={{ maxHeight: openIndex === index ? '500px' : '0', overflow: 'hidden', transition: 'max-height 1s ease' }}>
                                <p>{faqAnswers[index]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Success Stories */}
            <div className='mt-10'>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                    <FaRegSmile />
                    User Success Stories
                </h3>
                <div className='text-primary/75 text-base mb-4'>
                    <div className='bg-blue text-white rounded-lg px-4 py-2 shadow-md'>
                        <p className='mb-1'><strong>John Doe - Software Developer</strong></p>
                        <p>"Thanks to the job listings on this platform, I found my dream job as a software developer at Linear Company. I couldn't be happier with the opportunities it has provided me."</p>
                    </div>
                    <div className='bg-blue text-white rounded-lg px-4 py-2 mt-4  shadow-md'>
                        <p className='mb-1'><strong>Jane Smith - Marketing Manager</strong></p>
                        <p>"After months of searching, I finally landed my ideal role as a PR manager at Oppo Corporation through this platform. The process was smooth, and I'm grateful for the support."</p>
                    </div>
                    {/* Add more success stories as needed */}
                </div>
            </div>
        </div>
    )
}

const faqQuestions = [
    "What is Jobvista?",
    "How can I apply for jobs on Jobvista?",
    "Has anyone gotten a job from this site?",
    "Are there any fees for using Jobvista?"
];

const faqAnswers = [
    "Jobvista is a job portal platform that connects job seekers with employers. It allows users to search for job listings, and apply for positions across various industries.",
    "To apply for jobs on Jobvista, you can create an account, search for job listings that match your skills and preferences, and submit your application directly through the platform.",
    "Yes, many users have successfully found jobs through Jobvista. We have numerous success stories from individuals who have landed their dream roles with the help of our platform.",
    "No, our platform is completely free for job seekers and recruiters. There are no fees associated with using Jobvista to search for jobs, apply for positions, or post job listings."
];

export default Newsletter;
