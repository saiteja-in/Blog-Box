import React, { useState, useEffect } from "react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    // console.log(tabFromURL);
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark "
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} as="div">Sign Out</Sidebar.Item>
          <Sidebar.Item icon={HiChartPie} as="div">Dashboard</Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards} label="Pro" labelColor="dark" as="div">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item icon={HiInbox} label="3" as="div">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item icon={HiShoppingBag} as="div">Products</Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight} as="div">Sign In</Sidebar.Item>
          <Sidebar.Item icon={HiTable} as="div">Sign Up</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
