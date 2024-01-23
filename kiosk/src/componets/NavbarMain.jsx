import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";
import { FeedbackFish } from "@feedback-fish/react";

function NavbarMain() {
  const { logout, userProfile } = useContext(KioskContext);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {" "}
      <nav className="bg-white px-4 py-3.5  fixed left-0 right-0 top-0 z-40">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <a className="flex items-center justify-between mr-4">
              <img
                src={"https://flowbite.s3.amazonaws.com/logo.svg"}
                className="mr-3 h-8"
              />
            </a>
            <ul className="flex justify-start items-center gap-4 text-black font-semibold">
              <Link to={"/screens"}>Screens</Link>
              <Link to={"/studio"}>Studio</Link>
              <Link to={"/media"}>Media</Link>
              {/* <Link to={"/over"}>Dashboard</Link> */}
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            <FeedbackFish projectId={userProfile._id}>
              <button className=" tracking-widest text-black font-semibold hover:underline duration-150">
                Send feedback
              </button>
            </FeedbackFish>
            <button
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
              onClick={handleProfileOpen}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                alt="user photo"
              />
            </button>

            <div
              className={`${
                profileOpen ? "visible" : "hidden"
              } absolute right-2 top-8 z-50 my-4 w-56 text-base list-none  divide-y divide-gray-100 shadow bg-gray-50  rounded-xl`}
              id="dropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 ">
                  {userProfile.name}
                </span>
                <span className="block text-sm text-gray-900 truncate ">
                  {userProfile.email}
                </span>
              </div>
              <ul className="py-1 text-gray-700 " aria-labelledby="dropdown">
                <li>
                  <Link
                    to={"/profile"}
                    className="block py-2 px-4 text-sm hover:bg-gray-100 "
                  >
                    My profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/settings"}
                    className="block py-2 px-4 text-sm hover:bg-gray-100 "
                  >
                    Account settings
                  </Link>
                </li>
              </ul>
              <ul className="py-1 text-gray-700 " aria-labelledby="dropdown">
                <li>
                  <Link
                    to={"/sub"}
                    className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 "
                  >
                    <span className="flex items-center">
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-5 h-5 text-primary-600 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        ></path>
                      </svg>
                      Subsciption
                    </span>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      ></path>
                    </svg>
                  </Link>
                </li>
              </ul>
              <ul
                className="py-1 text-gray-700  cursor-pointer"
                aria-labelledby="dropdown"
              >
                <li onClick={handleLogOut}>
                  <a className="block py-2 px-4 text-sm hover:bg-gray-100 rounded-b-lg">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarMain;
