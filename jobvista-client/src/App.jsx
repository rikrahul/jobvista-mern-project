
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './home_main/Homepage'

function App() {
  const location = useLocation();
  const navbarVisiblePaths = [
    '/home',
    '/post-job',
    '/my-job',
    '/job-applicants',
    '/dashboard',
    '/edit-job', // Add edit-job/:id route
    '/job'       // Add /job/:id route
  ];
  const isNavbarVisible = navbarVisiblePaths.some(path => location.pathname.startsWith(path));

  return (
    <div>
      {isNavbarVisible && <Navbar />}
      <Outlet />
    </div>
    // <> 
    // <Navbar/>
    // <Outlet/>
    // </>
  )
}

export default App
