import React from 'react'
import InputField from '../components/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
    <h4 className='text-lg font-medium mb-2'>Work Experience</h4>

    <div>
        <label className='sidebar-label-container'>
            <input type="radio" name="test" id="test" value="" onChange={handleChange} />
            <span className='checkmark'></span>No Experience
        </label>

        <InputField handleChange={handleChange} value="less than 1yr" title="less than 1yr" name="test"/>
        <InputField handleChange={handleChange} value="1yr-2yr" title="1yr-2yr" name="test"/>
        <InputField handleChange={handleChange} value="2yr-5yr" title="2yr-5yr" name="test"/>
        <InputField handleChange={handleChange} value="more than 5yr" title="more than 5yr" name="test"/>

    </div>
</div>
  )
}

export default WorkExperience