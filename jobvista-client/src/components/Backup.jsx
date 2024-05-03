import React from 'react';

const Backup = () => {
  const handleBackup = () => {
    window.location.href = 'http://localhost:3000/backup';
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl text-center font-bold mb-5">Backup Data</h1>
      <div className="flex items-center justify-center mb-5">
        <img src="/images/backup.png" alt="Backup icon" width={500} height={500}/>
      </div>
      <p className="text-lg text-center">Click the button below to backup data of jobs, users, and job applicants.</p>
      <div className="flex justify-center">
        <button onClick={handleBackup} className="bg-blue-500 mt-5 hover:bg-blue/90 bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Backup Data
        </button>
      </div>
    </div>
  );
};

export default Backup;
