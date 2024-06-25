import React, { useState,useEffect } from 'react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
const DashSidebar = () => {
  const location = useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const tabFromURL=urlParams.get('tab');
    console.log(tabFromURL);
    if(tabFromURL){
      setTab(tabFromURL)
    }
  },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item href="#" active={tab==="profile"} icon={HiUser} label={"User"} labelColor="dark">
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item href="#" icon={HiArrowSmRight}  >
            Sign Out
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
