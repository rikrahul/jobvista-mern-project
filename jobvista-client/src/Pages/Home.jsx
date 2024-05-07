import { useEffect, useState } from "react";
import Banner from "../components/Banner"
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [locationQuery, setLocationQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs").then(res => res.json()).then(data => {
      // console.log(data)
      setJobs(data);
      setIsLoading(false);
    })
  }, [])

  //console.log(jobs)
  //handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  //  filter jobs by title
  const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)

  // ------------Radio based filtering------------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  // ------------Button based filtering------------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }

  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  // function for the previous Page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }


// main function
const filteredData = (jobs, selected, query, locationQuery) => {
  let filteredJobs = jobs;

  // Filtering input items
  if (query) {
    filteredJobs = filteredJobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  // Category filtering
  if (selected) {
    const selectedDate = new Date(selected);
    filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) =>
      jobLocation.toLowerCase() === selected.toLowerCase() ||
      parseInt(maxPrice) <= parseInt(selected) ||
      experienceLevel.toLowerCase() === selected.toLowerCase() ||
      salaryType.toLowerCase() === selected.toLowerCase() ||
      employmentType.toLowerCase() === selected.toLowerCase() ||
      new Date(postingDate) >= selectedDate
    );
  }

  // Location filtering
  if (locationQuery) {
    filteredJobs = filteredJobs.filter((job) => job.jobLocation.toLowerCase().indexOf(locationQuery.toLowerCase()) !== -1);
  }

  // Sort by posting date in descending order (latest first)
  filteredJobs.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));

  // Slice the data based on current page
  const { startIndex, endIndex } = calculatePageRange();
  filteredJobs = filteredJobs.slice(startIndex, endIndex);
  return filteredJobs.map((data, i) => <Card key={i} data={data} />);
};


  const result = filteredData(jobs, selectedCategory, query, locationQuery);

  const handleLocationChange = (location) => {
    setLocationQuery(location);
  };

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} handleLocationChange={handleLocationChange} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">

        {/* Left Side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {
            isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ? (<Jobs result={result} />) : <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No Data found!</p>
            </>
          }

          {/* Pagination here */}
          {
            result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button onClick={prevPage} disabled={currentPage === 1} className="hover:underline">Previous</button>
                <span className="mx-2"></span>
                <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className="hover:underline">Next</button>
              </div>
            ) : ""
          }


        </div>

        {/* Right side */}
        <div className="bg-white p-4 rounded"><Newsletter /></div>
      </div>

    </div>
  )
}
export default Home