import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { GoPlus } from "react-icons/go";
import { LuMoon, LuSun } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

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
    <Navbar className="sticky top-0 z-50 border-b-2 dark:border-gray-700 bg-green-50 dark:bg-green-900 bg-opacity-70 backdrop-blur-md shadow-lg">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-green-800 dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-lg text-white shadow-md">
          Agri
        </span>
        Credit
      </Link>

      <div className="flex gap-5 items-center md:order-3">
        {/* Create post icon */}
        {currentUser?.isAdmin && (
          <Link to="/create-post">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-700 cursor-pointer transition-transform transform hover:scale-105 hover:bg-green-100 dark:hover:bg-green-600 shadow-md">
              <GoPlus
                style={{ fontSize: "2rem", fontWeight: "bold" }}
                className="text-green-800 dark:text-gray-200"
              />
            </div>
          </Link>
        )}

        {/* Theme: dark or light */}
        <div
          className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-green-100 dark:bg-green-700 cursor-pointer transition-transform transform hover:scale-105 hover:bg-green-100 dark:hover:bg-green-600 shadow-md"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <LuSun className="text-3xl text-gray-800 dark:text-yellow-400" />
          ) : (
            <LuMoon className="text-3xl text-gray-800 dark:text-blue-400" />
          )}
        </div>

        {/* Dropdown Navbar */}
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

            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              gradientDuoTone="greenToBlue"
              outline
              className="shadow-md hover:shadow-lg hover:bg-gradient-to-r from-green-500 to-blue-500 hover:text-white transition-all duration-300 dark:border-gray-600 dark:text-white dark:hover:bg-gradient-to-r dark:hover:from-green-600 dark:hover:to-blue-600"
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
        <Navbar.Link
          as={Link}
          to="/agrihelp"
          active={path === "/agrihelp"}
          className="dark:text-white"
        >
          AgriHelp
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
