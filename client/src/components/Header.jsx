//flowbite for ui components for tailwind css
import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownDivider } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { toggleTheme } from "../redux/theme/themeSlice.js";
const Header = () => {
  const dispatch=useDispatch();
  const {theme}=useSelector((state)=>state.theme);
  const [searchTerm,setSearchTerm]=useState('')
  const{currentUser}=useSelector((state)=>state.user);
  const path = useLocation().pathname;
  const navigate=useNavigate()
console.log(searchTerm);
  const location=useLocation()
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromUrl=urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  const handleSignout=async()=>{
    try {
      const res=await fetch('/api/user/signout',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
      })
      const data=await res.json()
      if(!res.ok){
        // toast.error(data.message)
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      // toast.error(error.message)
      console.log(error.message);
    }
  }
  //we can use hashcode colours by importing it in tailwindconfig.js and using it in here
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="">
      <Navbar className="border-b-2 dark:bg-gray-900">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-customA via-customB via-customC to-customD rounded-lg text-white">
            Sai Teja's
          </span>
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            id="input-gray"
            placeholder="Search..."
            required
            color="gray"
            onChange={(e)=>setSearchTerm(e.target.value)}
            rightIcon={AiOutlineSearch}
            value={searchTerm}
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
              <span className="block text-sm font-medium text-white-300">@{currentUser.username}</span> 
              <span className="block truncate text-sm text-gray-900 font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} to="/dashboard?tab=profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item as={Link} to="/dashboard?tab=dash">
              Dashboard
            </Dropdown.Item>
           
            <Dropdown.Divider/>
            <Dropdown.Item as="button" onClick={handleSignout}>
              Logout
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
          <Navbar.Link active={path === "/search"} as={'div'}>
            <Link to="/search">Blogs</Link>
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
