
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
const Dashboard = () => {
  const location=useLocation();
  // console.log(location);
  const[tab,setTab]=useState('');
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);  //?tab=profile
    const tabFromUrl=urlParams.get('tab')   //profile
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    // console.log(tabFromUrl);
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
       {tab==='profile' && <DashProfile/>}
    </div>
  )
}

export default Dashboard
