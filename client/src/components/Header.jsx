import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { LuMoon, LuSun } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { GoPlus } from "react-icons/go";
// import WbSunnyRoundedIcon from '@mui/icons-material'
export default function Header() {
  const path = useLocation().pathname;
  // const location = useLocation()
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  // const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //     const urlParams = new URLSearchParams(location.search);
  //     const searchTermFromUrl = urlParams.get('searchTerm');
  //     if (searchTermFromUrl) {
  //         setSearchTerm(searchTermFromUrl)
  //     }

  // }, [location.search])

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar className="sticky top-0 z-50 border-b-2 dark:border-gray-700">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Agri
        </span>
        Credit
      </Link>
      <div className="flex gap-5 items-center md:order-3">
        {/* Create post icon*/}
        {currentUser?.isAdmin && (
          <Link to={"/create-post"}>
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm hover:shadow-lg"
              onClick={() => {
                /* Handle the click action */
              }}
            >
              <GoPlus
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
                className="text-gray-800 dark:text-gray-200 transition-colors duration-300"
              />
            </div>
          </Link>
        )}
        {/* Theme:dark or light */}
        <div
          className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-white dark:bg-gray-700 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm hover:shadow-lg"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <LuSun className="text-3xl text-gray-800 dark:text-yellow-400 transition-transform duration-300" />
          ) : (
            <LuMoon className="text-3xl text-gray-800 dark:text-blue-400 transition-transform duration-300" />
          )}
        </div>
        {/* DropDown Navbar */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            {/* <Dropdown.Header>
                                <span className="block text-sm">@{currentUser.username}</span>
                                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                            </Dropdown.Header> */}
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              gradientDuoTone="purpleToBlue"
              outline
              className="shadow-md hover:shadow-lg hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition-all duration-300 dark:border-gray-600 dark:text-white dark:hover:bg-gradient-to-r dark:hover:from-purple-700 dark:hover:to-blue-700"
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/"
          active={path === "/"}
          className="dark:text-white"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/about"
          active={path === "/about"}
          className="dark:text-white"
        >
          About
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/dashboard"
          active={path === "/dashboard"}
          className="dark:text-white"
        >
          Dashboard
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
