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
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/", element: <Home/>},
        {
          path: "/post-job",
          element: <CreaateJob/>
        },
        {
          path: "/my-job",
          element: <Myjobs/>
        },
        {
          path: "/salary",
          element: <SalaryPage/>
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
        }

      ],
    },
  ]);

  export default router;