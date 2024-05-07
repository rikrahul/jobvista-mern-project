import {
  createBrowserRouter
} from "react-router-dom";
import App from "../App";
import { Home } from "../Pages/Home";
import About from "../Pages/About";
import CreaateJob from "../Pages/CreaateJob";
import Myjobs from "../Pages/Myjobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Homepage from "../home_main/Homepage";
import Singup from "../home_main/Singup";
import Login from "../home_main/Login";
import JobsDetails from "../Pages/JobsDetails";
import Userhome from "../userPages/Userhome";
import Userjobdetails from "../userPages/Userjobdetails";
import JobApply from "../userPages/JobApply";
import MyApplications from "../userPages/MyApplications";
import JobApplicants from "../Pages/JobApplicants";
import ApplicantDetails from "../Pages/ApplicantDetails";
import UpdateApplication from "../userPages/UpdateApplication";
import RecruiterHome from "../recruiterPages/RecruiterHome";
import RmyJobs from "../recruiterPages/RmyJobs";
import RUpdateJob from "../recruiterPages/RUpdateJob";
import RCreateJob from "../recruiterPages/RCreateJob";
import RJobApplicants from "../recruiterPages/RJobApplicants";
import RJobsDetails from "../recruiterPages/RJobsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/user-home",
        element: <Userhome />
      },
      {
        path: "/recruiter-home",
        element: <RecruiterHome />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/post-job",
        element: <CreaateJob />
      },
      {
        path: "/my-job",
        element: <Myjobs />
      },
      {
        path: "/job-applicants",
        element: <JobApplicants/>
      },
      {
        path: "/dashboard",
        element: <About/>
      },
      {
        path: "/salary",
        element: <SalaryPage />
      },
      {
        path: "edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
      },
      {
        path: "/job/:id",
        element: <JobsDetails />
      },
      {
        path: "/Ujob/:id",
        element: <Userjobdetails />
      }

    ],
  },
  {
    path: "/sign-up",
    element: <Singup />
  },
  {
    path: "/job-applications/:id",
    element: <JobApply/>
  },
  {
    path: "/my-applications",
    element: <MyApplications />
  },
  {
    path: "/application-details/:id",
    element: <ApplicantDetails/>
  },
  {
    path: "edit-application/:id",
    element: <UpdateApplication/>,
    loader: ({ params }) => fetch(`http://localhost:3000/all-jobApplication/${params.id}`)
  },
  {
    path: "rmy-jobs",
    element: <RmyJobs/>
  },
  {
    path: "redit-job/:id",
    element: <RUpdateJob />,
    loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
  },
  {
    path: "/rpost-job",
    element: <RCreateJob />
  },
  {
    path: "/rjob-applicants",
    element: <RJobApplicants/>
  },
  {
    path: "/rjob/:id",
    element: <RJobsDetails />
  }
  // {
  //   path: "/Ujob/:id",
  //   element: <Userjobdetails />
  // }

]);

export default router;