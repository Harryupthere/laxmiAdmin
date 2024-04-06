import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import { BiMoneyWithdraw, BiLogOut } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {  BiCoinStack } from "react-icons/bi";
import { LuPhoneCall } from "react-icons/lu";
import Cookies from 'js-cookie'; // Import js-cookie library

import { useState } from "react";
import { Link, Outlet,useNavigate } from "react-router-dom";
function SideDrawer() {
  const navigate = useNavigate();

  const [open, SetOpen] = useState(true);
  const [toggle, setToggle] = useState(false);

  const [selected, setSelected] = useState("");
  const handleChangeds = (event) => {
    setSelected(event.target.value);
  };

  const logOut=async(e)=>{
    e.preventDefault();
    Cookies.remove('loginStatus'); // Remove the 'loginStatus' cookie
navigate("/")
  }

  return (
    <div className="flex justify-start items-start flex-col  lg:flex-row w-screen h-full    overflow-hidden">
      <nav
        className={`h-full fixed  z-50 ${
          open === false ? "w-48 bg-black/50" : "w-14 bg-black/50"
        }  duration-300  lg:flex justify-start items-start flex-col    hidden`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer  w-full"
          onClick={() => SetOpen(!open)}
        >
          <div>
            {open === false ? (
              <CloseIcon className="text-white  " />
            ) : (
              <MenuIcon className="text-white  " />
            )}
          </div>
        </div>
        <div className="h-[105vh]  relative  ">
          <Link to="/dashboard/home">
            <div className="flex justify-start items-center p-4  w-full nevs ">
              <HomeIcon className="text-white  cursor-pointer" />
              <h1
                onClick={() => SetOpen(!open)}
                className={`text-white  ml-4 w-full font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Dashboard
              </h1>
            </div>
          </Link>

          <Link to="/dashboard/users">
            <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
              <FaUser className="text-xl" />
              <h1
                onClick={() => SetOpen(!open)}
                className={`text-white  ml-4 w-full font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Users
              </h1>
            </div>
          </Link>

          <Link to="/dashboard/stake-panel">
            <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
              <BiCoinStack className="text-2xl text-white" />
              <h1
                onClick={() => SetOpen(!open)}
                className={`text-white  ml-4 w-full font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Stake Panel
              </h1>
            </div>
          </Link>

          <Link to="/dashboard/ico-panel">
            <div className="flex justify-start items-center p-4 text-white w-full nevs">
              <FaCoins className="text-white text-2xl" />
              
              <h1
                onClick={() => SetOpen(!open)}
                className={`text-white ml-4 w-full font-semibold duration-1000 ${
                  open === false ? "flex" : "hidden"
                }`}
              >
                ICO Panel
              </h1>
            </div>
          </Link>

          <Link to="/dashboard/astro-panel">
            <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
              <LuPhoneCall className="text-2xl" />
              <h1
                onClick={() => SetOpen(!open)}
                className={`text-white  ml-4 w-full font-semibold duration-1000  ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Astro Panel
              </h1>
            </div>
          </Link>

          {/* <Link to="/dashboard/admin-functions">
            <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
              <FaBell className="text-2xl" />
              <h1
                onClick={() => SetOpen(!open)}
                className={`text-white  ml-4 w-full font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Push Notification
              </h1>
            </div>
          </Link> */}

          {/* <Link to="/dashboard/coin-listing">
            <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
              <BiCoin className="text-2xl" />
              <h1
                onClick={() => SetOpen(!open)}
                className={`text-white  ml-4 w-full font-semibold duration-1000 ${
                  open === false ? "flex " : "hidden"
                }`}
              >
                Coin Listing
              </h1>
            </div>
          </Link> */}

          
            <div className="absolute top-[80vh] w-full nevs">
              <div className="flex justify-start  items-center p-4 text-white   ">
                <BiLogOut className="text-2xl" />
                <h1
                  onClick={(e) => logOut(e)}
                  className={`text-white  ml-4 w-full font-semibold duration-1000 ${
                    open === false ? "flex " : "hidden"
                  }`}
                >
                  LogOut
                </h1>
              </div>
            </div>
         
        </div>
      </nav>

      <div className="min-h-fit bg-black/50   duration-300 w-screen flex justify-start items-start flex-col  mr-16 lg:hidden">
        <div
          className="flex justify-between items-center p-2 px-4 w-full"
          onClick={() => setToggle(!toggle)}
        >
          <div>
            <MenuIcon className="text-white  " />
          </div>
          <div>{/* <img className="h-12"  src={logo} alt="img" /> */}</div>
          <div>.</div>
        </div>
      </div>

      {toggle && (
        <div className="lg:hidden">
          <div className="fixed inset-y-0 right-0 z-50 w-full bg-black px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="gap-x-6 flex justify-between">
              <a
                href="/"
                className="-m-1.5 p-1.5 text-white flex justify-center items-center "
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <span className="sr-only">Your Company</span>

                <div className="text-white  text-[22px] font-bold mx-2">
                  {/* <img className="h-12"  src={logo} alt="img" /> */}
                </div>
              </a>
              <button
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <span className="sr-only">Close menu</span>
                <span className="w-fit">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-5 py-6">
                  <Link to="/dashboard/home" onClick={() => setToggle(!toggle)}>
                    <div className="flex justify-start items-center p-4  w-full nevs ">
                      <HomeIcon className="text-white  cursor-pointer" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Dashboard
                      </h1>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/users"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <FaUser className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Users
                      </h1>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/stake-panel"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <BiCoinStack className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Stake Panel
                      </h1>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/ico-panel"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <FaCoins className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        ICO Panel
                      </h1>
                    </div>
                  </Link>

                  <Link
                    to="/dashboard/astro-panel"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <BiMoneyWithdraw className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Previous Unstake History
                      </h1>
                    </div>
                  </Link>

                  {/* <Link
                    to="/dashboard/admin-functions"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <FaBell className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Push Notification
                      </h1>
                    </div>
                  </Link> */}

                  {/* <Link
                    to="/dashboard/coin-listing"
                    onClick={() => setToggle(!toggle)}
                  >
                    <div className="flex justify-start  items-center p-4 text-white   w-full nevs">
                      <BiCoin className="text-2xl" />
                      <h1 className="text-white  mx-4 font-semibold duration-1000">
                        Coin Listing
                      </h1>
                    </div>
                  </Link> */}

                  <Link to="/logout" onClick={() => setToggle(!toggle)}>
                    <div className="absolute bottom-10 w-full nevs">
                      <div className="flex justify-start  items-center p-4 text-white   ">
                        <BiLogOut className="text-2xl" />
                        <h1 className="text-white  mx-4 font-semibold duration-1000">
                          LogOut
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default SideDrawer;
