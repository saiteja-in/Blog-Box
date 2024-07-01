import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice.js";
import {useSelector} from 'react-redux'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiInboxIn,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
const DashSidebar = () => {
  const {currentUser}=useSelector((state)=>state.user)
  // console.log(currentUser)
  
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    // console.log(tabFromURL);
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        // toast.error(data.message)
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      // toast.error(error.message)
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div className="mb-2">
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor="dark "
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>
          </div>
          {currentUser.isAdmin && (
          <>
            <div className="mb-4">
              <Link to="/dashboard?tab=dash">
                <Sidebar.Item active={tab === "dash"} icon={HiChartPie} as="div">
                  Dashboard
                </Sidebar.Item>
              </Link>
            </div>
            <div className="mb-4">
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item active={tab === "posts"} icon={HiInboxIn} as="div">
                  Posts
                </Sidebar.Item>
              </Link>
            </div>
          </>
         )}
          <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiViewBoards}
            label="Pro"
            labelColor="dark"
            as="div"
          >
            Kanban
          </Sidebar.Item>
          <Sidebar.Item icon={HiInbox} label="3" as="div">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item icon={HiShoppingBag} as="div">
            Products
          </Sidebar.Item>
          {/* <Sidebar.Item icon={HiArrowSmRight} as="div">Sign In</Sidebar.Item> */}
          <Sidebar.Item icon={HiTable} as="div">
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;

