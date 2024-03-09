import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const JobsDetails = () => {
  const [job,setJobs] = useState([])
  const {id} = useParams();
  useEffect(()=>{
    fetch(`http://localhost:3000/all-jobs/${id}`).then(res => res.json()).then(data => setJobs)
  },[])
  return (
    <div>JobsDetails : {id}</div>
  )
}

export default JobsDetails