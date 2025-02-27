import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import darkmode from "../photos/darkmode.png";
import lightmode from "../photos/lightmode.png";
import { MdOutlineLightMode } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { toggleTheme } from "../redux/theme/themeSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname; //gets the param from the url(/signup , /about)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
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
        // console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="">
      <Navbar className="border-b-2 bg-white dark:bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          {/* <span className="px-2 py-1 bg-gradient-to-r from-customA via-customB via-customC to-customD rounded-lg text-white">
            Sai Teja's
          </span> */}

          {theme == "light" ? (
            <img
              className="w-full pt-1 mx-auto" // Decrease padding in y
              src={lightmode}
              alt=""
              style={{ maxWidth: "110px" }} // Set maximum width to 300px
            />
          ) : (
            <img
              className="w-full pt-1 mx-auto" // Decrease padding in y
              src={darkmode}
              alt=""
              style={{ maxWidth: "110px" }} // Set maximum width to 300px
            />
          )}
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            id="input-gray"
            placeholder="Search..."
            required
            color="gray"
            onChange={(e) => setSearchTerm(e.target.value)}
            rightIcon={AiOutlineSearch}
            value={searchTerm}
            className="hidden lg:inline" // only visible in larger screens >1024
          />
        </form>
        <Button className="lg:hidden" color="gray" pill>
          <LuSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button
            className="hidden mt-1 sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme !== "light" ? <MdOutlineLightMode /> : <FaMoon />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
              className="relative z-50" // Ensure a high z-index
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium text-white-300">
                  @{currentUser.username}
                </span>
                <span className="block truncate text-sm text-gray-900 font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/dashboard?tab=profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/dashboard?tab=dash">
                Dashboard
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" onClick={handleSignout}>
                Logout
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToPink" outline>
                Sign In
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/search"} as={"div"}>
            <Link to="/search">Blogs</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
