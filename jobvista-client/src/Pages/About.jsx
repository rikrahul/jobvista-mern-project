import React, { useState } from 'react';
import Users from '../components/Users';
import Analytics from '../components/Analytics';
import Backup from '../components/Backup';

const About = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Users');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case 'Users':
        return <Users />;
      case 'Analytics':
        return <Analytics/>;
      case 'Backup':
        return <Backup/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue/90 h-screen p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4 bg-blue-500 px-5 py-3 text-white">Admin Dashboard</h2>
        <ul className=''>
          <li className={`cursor-pointer text-white p-2 my-1 border-2 rounded-md ${selectedMenuItem === 'Users' && 'bg-blue'}`} onClick={() => handleMenuItemClick('Users')}>Users</li>
          <li className={`cursor-pointer text-white p-2 my-1 border-2 rounded-md ${selectedMenuItem === 'Analytics' && 'bg-blue'}`} onClick={() => handleMenuItemClick('Analytics')}>Analytics</li>
          <li className={`cursor-pointer text-white p-2 my-1 border-2 rounded-md ${selectedMenuItem === 'Backup' && 'bg-blue'}`} onClick={() => handleMenuItemClick('Backup')}>Backup</li>
          {/*<li className={`cursor-pointer p-2 border-2 ${selectedMenuItem === 'Home' && 'bg-blue-100'}`} onClick={() => handleMenuItemClick('Home')}>Home</li> */}
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default About;
