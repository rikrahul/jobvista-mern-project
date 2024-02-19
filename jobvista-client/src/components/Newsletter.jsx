import React from 'react'
import { FaEnvelope, FaEnvelopeOpenText, FaRocket } from "react-icons/fa6"

const Newsletter = () => {
    return (
        <div>
            <div>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaEnvelopeOpenText />
                Email For Jobs
                </h3>
                <p className='text-primary/75 text-base mb-4'>Leave us your email address and we'll send you all of the new jobs</p>

                <div className='w-full space-y-4'>
                    <input type="email" name='emal' id='email' placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline-none' />
                    <input type="submit" value={"Subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
                </div>

            </div>

            {/*2nd part */}
            <div className='mt-20'>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaRocket />
                Get Notification Faster
                </h3>
                <p className='text-primary/75 text-base mb-4'>Submit your Resume</p>

                <div className='w-full space-y-4'>
                    <input type="submit" value={"Upload your Resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'/>
                </div>

            </div>
        </div>
    )
}

export default Newsletter