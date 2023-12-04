import React, { useState, useContext, useEffect } from "react";
import kioskIcon from "./asstes/kiosk.png";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";
import ViewKios from "./ViewKiosk";
import Overview from "./Overview";
import { Carousel } from "react-responsive-carousel";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  showMenu,
} from "react-contextmenu";

function Dashboard() {
  const {
    logout,
    profile,
    userProfile,
    kiosks,
    fileSize,
    fetchKiosk,
    editKiosk,
    deleteKiosk,
    ungroupDevice,
    loading,
  } = useContext(KioskContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [kioskName, setKioskName] = useState("");
  const [kioskId, setKioskId] = useState("");
  const [kioskCode, setKioskCode] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [axis, setAxis] = useState("verticle");
  const [transitionTime, setTransitionTime] = useState(1000);
  const [interval, setInterval] = useState(3000);
  const [kioskContent, setKioskContent] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [overOpen, setOverOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  useEffect(() => {
    profile();
    fetchKiosk();
  }, [userProfile]);

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
  };
  const handleViewOpen = (index) => {
    setKioskCode(kiosks[index].kioskCode);
    setKioskContent(kiosks[index].kioskContent);
    setViewOpen(true);
  };
  const handleViewClose = () => {
    setViewOpen(false);
  };
  const handleOverOpen = () => {
    setOverOpen(!overOpen);
    setViewOpen(false);
  };
  const handleEditOpen = (index) => {
    setKioskId(kiosks[index]._id);
    setKioskName(kiosks[index].kioskName);
    setEditOpen(true);
  };
  const handleGroupOpen = (index) => {
    setKioskCode(kiosks[index].kioskCode);
    setGroupData(kiosks[index].groupDevices);
    setGroupOpen(true);
  };

  const handleUngroupDevice = (id) => {
    ungroupDevice(kioskCode, id);
  };

  const handleGroupClose = () => {
    setKioskCode("");
    setGroupData([]);
    setGroupOpen(false);
  };

  const handleEditKiosk = () => {
    editKiosk(kioskName, kioskId);
    setKioskName("");
    setEditOpen(false);
    setKioskId("");
  };
  const handleEditClose = () => {
    setKioskName("");
    setEditOpen(false);
    setKioskId("");
  };

  const handleMonuseClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    showMenu({
      position: [x, y],
      id: kioskId,
    });
    setKioskId("");
  };

  const handleLogOut = () => {
    logout();
  };

  function handleDeleteClick(index) {
    deleteKiosk(kiosks[index]._id);
  }

  return (
    <>
      <Tooltip id="group" />
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <nav className="border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  ></path>
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <a className="flex items-center justify-between mr-4">
                <img
                  src={"https://flowbite.s3.amazonaws.com/logo.svg"}
                  className="mr-3 h-8"
                />
              </a>
              <form action="#" method="GET" className="hidden md:block md:pl-2">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative md:w-64">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center lg:order-2">
              <button
                type="button"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle search</span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </button>

              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
                } absolute right-2 top-8 z-50 my-4 w-56 text-base list-none  divide-y divide-gray-100 shadow bg-gray-50 dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}
                id="dropdown"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {userProfile.name}
                  </span>
                  <span className="block text-sm text-gray-900 truncate dark:text-white">
                    {userProfile.email}
                  </span>
                </div>
                <ul
                  className="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      My profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Account settings
                    </a>
                  </li>
                </ul>
                <ul
                  className="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <span className="flex items-center">
                        <svg
                          aria-hidden="true"
                          className="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
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
                    </a>
                  </li>
                </ul>
                <ul
                  className="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li onClick={handleLogOut}>
                    <a className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full  border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full  dark:bg-gray-800">
            <form action="#" method="GET" className="md:hidden mb-2">
              <label htmlFor="sidebar-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="sidebar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
            <ul className="space-y-2">
              <li onClick={handleOverOpen} className="cursor-pointer">
                <a className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Overview</span>
                </a>
              </li>

              <li>
                <a className="cursor-pointer flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={kioskIcon} />
                  <span className="ml-3">Kiosks</span>
                </a>
              </li>
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    ></path>
                  </svg>
                  <span className="ml-3">Docs</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                  <span className="ml-3">Components</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  <span className="ml-3">Help</span>
                </a>
              </li>
              <li>
                <Link
                  to={"/admin"}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <i className="fa-solid fa-screwdriver-wrench" />
                  <span className="ml-3">Admin</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <main className="p-6 md:ml-64 h-auto pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {" "}
            <Link to={"/create-kiosk"}>
              <div className="flex flex-col justify-center items-center gap-4 border-2 border-dashed border-gray-300 hover:bg-gray-100 rounded-lg dark:border-gray-700 dark:hover:border-gray-700 hover:dark:bg-gray-700 dark:text-white h-32 md:h-64 cursor-pointer">
                <i className="fa-solid fa-plus fa-xl" />
                <h3>Add Kiosk</h3>
              </div>
            </Link>
            {kiosks.map((kiosk, index) => (
              <div
                key={kiosk._id}
                className="flex flex-col justify-between items-start shadow-md bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white rounded-lg border-gray-300 p-6 h-32 md:h-64 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl">{kiosk.kioskName}</h3>

                  <h3 className="text-sm text-gray-400">{kiosk.kioskCode}</h3>
                </div>
                <div className="flex justify-between  w-full">
                  <ContextMenuTrigger mouseButton={0} id={kiosk._id}>
                    <div onClick={handleMonuseClick} className="well">
                      <i className="fa-solid fa-ellipsis fa-xl" />
                    </div>
                  </ContextMenuTrigger>
                  <h3
                    data-tooltip-id="group"
                    data-tooltip-content={`${kiosk.groupDevices.length} device connected`}
                    className="text-sm text-gray-400"
                  >
                    {kiosk.groupDevices.length}
                  </h3>
                </div>

                <ContextMenu
                  id={kiosk._id}
                  className="border-1 border-gray-200 rounded px-1 py-2.5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 "
                >
                  <MenuItem
                    onClick={() => handleViewOpen(index)}
                    data={{ foo: "bar" }}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200 dark:hover:bg-gray-600 py-1.5 px-2"
                  >
                    <i className="fa-solid fa-eye"></i> <h3>View</h3>
                  </MenuItem>
                  <MenuItem
                    data={{ foo: "bar" }}
                    onClick={() => handleEditOpen(index)}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200 dark:hover:bg-gray-600 py-1.5 px-2"
                  >
                    <i className="fa-solid fa-gear" /> <h3>Setting</h3>
                  </MenuItem>
                  <MenuItem
                    data={{ foo: "bar" }}
                    onClick={() => handleGroupOpen(index)}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200 dark:hover:bg-gray-600 py-1.5 px-2"
                  >
                    <i className="fa-solid fa-link" /> <h3>Group</h3>
                  </MenuItem>
                  <MenuItem
                    data={{ foo: "bar" }}
                    onClick={() => handleDeleteClick(index)}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-rose-500 py-1.5 px-2"
                  >
                    <i className="fa-solid fa-trash"></i> <h3>Delete</h3>
                  </MenuItem>
                </ContextMenu>
              </div>
            ))}
          </div>

          {viewOpen && (
            <>
              <div className="w-full absolute top-20 bg-slate-50 dark:bg-slate-900 ">
                <button
                  className="flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-slate-700 px-3 py-1 rounded"
                  onClick={handleViewClose}
                >
                  <i className="fa-solid fa-arrow-left" /> back
                </button>
                <ViewKios
                  getKioskContent={kioskContent}
                  kioskCode={kioskCode}
                />
              </div>
            </>
          )}
          {overOpen && (
            <>
              <div
                className="absolute top-20 bg-slate-50 dark:bg-slate-900 p-4 w-full"
                style={{ height: "100vh" }}
              >
                <button
                  className="flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-slate-700 px-3 py-1 rounded"
                  onClick={handleOverOpen}
                >
                  <i className="fa-solid fa-arrow-left" /> back
                </button>
                <Overview
                  userStorage={fileSize}
                  userCluster={kiosks.length}
                  storage={userProfile.userSubscription[0].storage}
                  cluster={userProfile.userSubscription[0].cluster}
                />
              </div>
            </>
          )}
          {editOpen && (
            <div
              id="popup-modal"
              tabindex="-1"
              className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative p-4 w-full">
                <div className=" relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
                  <div className="p-4 md:p-5 text-center">
                    <div className="flex flex-col justify-center items-center gap-3 rounded-lg ">
                      {" "}
                      <input
                        className="text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 w-50 p-1 px-2 rounded"
                        type="text"
                        placeholder={kioskName}
                        value={kioskName}
                        onChange={(e) => setKioskName(e.target.value)}
                      />
                      <div className=" flex flex-row justify-center items-start gap-8 w-50 mb-4">
                        <div className="w-full">
                          <label
                            for="axis"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Axis
                          </label>
                          <select
                            id="axis"
                            onChange={(e) => setAxis(e.target.value)}
                            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected value={"horizontal"}>
                              Horizontal
                            </option>
                            <option value={"vertical"}>Vertical</option>
                          </select>

                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Transition Time
                          </label>
                          <select
                            onChange={(e) => setTransitionTime(e.target.value)}
                            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected value={1000}>
                              Normal
                            </option>
                            <option value={2000}>Slow</option>
                            <option value={500}>Fast</option>
                          </select>

                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Interval
                          </label>
                          <select
                            onChange={(e) => setInterval(e.target.value)}
                            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected value={3000}>
                              Normal
                            </option>
                            <option value={2000}>Slow</option>
                            <option value={3000}>Fast</option>
                          </select>
                        </div>
                        <Carousel
                          showArrows={false}
                          showThumbs={false}
                          showIndicators={false}
                          showStatus={false}
                          autoPlay={true}
                          infiniteLoop={true}
                          interval={interval}
                          axis={axis}
                          width={"350px"}
                          transitionTime={transitionTime}
                        >
                          <img
                            src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fHww"
                            style={{ height: "550px" }}
                          />
                          <img
                            src="https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/68/84/8c.jpg"
                            style={{ height: "550px" }}
                          />
                        </Carousel>
                      </div>
                    </div>

                    <button
                      onClick={handleEditKiosk}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="mb-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Save{" "}
                    </button>

                    <button
                      onClick={handleEditClose}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="  bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {groupOpen && (
            <div
              id="popup-modal"
              tabindex="-1"
              className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative p-4 w-full">
                <div className=" relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
                  <div className="p-4 md:p-5 text-center">
                    <div className="grag-area flex flex-col justify-start items-start gap-3 rounded-lg overflow-scroll">
                      {groupData.map((group, index) => (
                        <div
                          key={group._id}
                          className="flex justify-center items-center gap-5"
                        >
                          <h3>Device ID: {group.androidId}</h3>
                          <button
                            className="bg-rose-700 hover:bg-rose-800 text-sm py-1 px-2 rounded"
                            onClick={() => handleUngroupDevice(group._id)}
                          >
                            Ungroup
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleGroupClose}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="  bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Dashboard;
