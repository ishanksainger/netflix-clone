import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);
  
    if (profileLoading || authLoading) {
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      );
    }
    return (
      <>
          <Outlet/>
      </>
    )
}

export default Dashboard