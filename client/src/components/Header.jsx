//flowbite for ui components for tailwind css
import { Navbar, TextInput, Button } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";

const Header = () => {
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
        <Button className="w-11 h-9 lg:hidden" color="gray" pill >
          <LuSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="w-11 h-9 hidden sm:inline" color="gray" pill //button will be visible only in small screens >624 which means it is not visible in mobiles
          >
            <FaMoon />
          </Button>
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToPink" outline>Sign In</Button>
          </Link>
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
