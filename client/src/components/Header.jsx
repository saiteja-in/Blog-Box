//flowbite for ui components for tailwind css
import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownDivider } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
const Header = () => {
  const dispatch=useDispatch();
  const {theme}=useSelector((state)=>state.theme);
  const{currentUser}=useSelector((state)=>state.user);
  const path = useLocation().pathname;
  //we can use hashcode colours by importing it in tailwindconfig.js and using it in here
  return (
    <div className="sticky top-0">
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-customA via-customB via-customC to-customD rounded-lg text-white">
            Sai Teja's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            id="input-gray"
            placeholder="Search..."
            required
            color="gray"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"//only visible in larger screens >1024
          />
        </form>

        <Button className=" lg:hidden" color="gray" pill >
          <LuSearch />
        </Button>
        <div className="flex gap-2 md:order-2">

        <Button className=" hidden mt-1 sm:inline" color="gray" pill
          onClick={()=>dispatch(toggleTheme())}
          >
            {theme!=='light' ? <MdOutlineLightMode/> : <FaMoon/>}
          </Button>

          {currentUser ?(
          <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />} >
            <Dropdown.Header>
              <span className="block text-sm font-medium text-gray-700">@{currentUser.username}</span> 
              <span className="block truncate text-sm text-gray-900 font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/dashboard?tab=profile">Profile</Link>
            </Dropdown.Item>
           
            <Dropdown.Divider/>
            <Dropdown.Item>
              <Link to="/logout">Logout</Link>
            </Dropdown.Item>
          </Dropdown>) :
          (<Link to="/sign-in">
            <Button gradientDuoTone="purpleToPink" outline>Sign In</Button>
          </Link>)
          }

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
            <Link to="/about" >
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to="/projects" >
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
