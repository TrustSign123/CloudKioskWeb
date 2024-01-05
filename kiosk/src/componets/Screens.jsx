import React, { useState, useContext, useEffect } from "react";
import kioskIcon from "./asstes/kiosk.png";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";
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
    groups,
    fetchKiosk,
    editKiosk,
    deleteKiosk,
    fetchGroups,
    createGroup,
    editGroup,
    deleteGroup,
    loading,
  } = useContext(KioskContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [kioskName, setKioskName] = useState("");
  const [kioskId, setKioskId] = useState("");
  const [groupOpen, setGroupOpen] = useState(false);
  const [moveToGroupOpen, setMoveToGroupOpen] = useState(false);
  const [editGroupOpen, setEditGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    profile();
    fetchKiosk();
    fetchGroups();
  }, []);

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
  };

  const handleGroupOpen = () => {
    setGroupOpen(!groupOpen);
  };

  const handleEditGroupOpen = (index) => {
    setEditGroupOpen(!editGroupOpen);
    setGroupId(groups[index]._id);
    setGroupName(groups[index].groupName);
  };

  const handleMoveToGroupOpen = () => {
    setMoveToGroupOpen(!moveToGroupOpen);
  };

  const handleCreateGroup = () => {
    createGroup(groupName);
    setGroupOpen(false);
    setGroupName(null);
  };

  const handleGroupRename = () => {
    editGroup(groupName, groupId);
    setEditGroupOpen(false);
  };

  const handleDeleteGroup = (index) => {
    deleteGroup(groups[index]._id);
  };

  const handleEditOpen = (index) => {
    setKioskId(kiosks[index]._id);
    setKioskName(kiosks[index].kioskName);
    setEditOpen(true);
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
      {groupOpen && (
        <>
          <div className="fixed flex justify-center items-center w-full h-[100vh] backdrop-blur-[1px] bg-black/30 p-4">
            <div className="flex flex-col justify-between  bg-white w-[400px] h-[250px] shadow-sm rounded p-4">
              <div className="flex  justify-center items-center">
                <h3 className="font-semibold text-2xl">New Group</h3>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-500 ">
                  GROUP NAME
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border text-gray-900 text-lg h-10 rounded-md px-2 w-full"
                  placeholder="Enter name"
                  onChange={(e) => setGroupName(e.target.value)}
                ></input>
              </div>

              <div className="flex justify-between items-center w-full h-10 bg-white">
                <button
                  className="border rounded py-2.5 px-4 hover:bg-gray-100"
                  onClick={handleGroupOpen}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white rounded py-2.5 px-4 hover:bg-blue-700"
                  onClick={handleCreateGroup}
                >
                  Create group
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {editGroupOpen && (
        <>
          <div className="fixed flex justify-center items-center w-full h-[100vh] backdrop-blur-[1px] bg-black/30 p-4">
            <div className="flex flex-col justify-between  bg-white w-[400px] h-[250px] shadow-sm rounded p-4">
              <div className="flex  justify-center items-center">
                <h3 className="font-semibold text-2xl">Rename group</h3>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-500 ">
                  GROUP NAME
                </label>
                <input
                  type="text"
                  value={groupName}
                  className="bg-gray-50 border text-gray-900 text-lg h-10 rounded-md px-2 w-full"
                  placeholder="Enter name"
                  onChange={(e) => setGroupName(e.target.value)}
                ></input>
              </div>

              <div className="flex justify-between items-center w-full h-10 bg-white">
                <button
                  className="border rounded py-2.5 px-4 hover:bg-gray-100"
                  onClick={() => handleEditGroupOpen(0)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white rounded py-2.5 px-4 hover:bg-blue-700"
                  onClick={handleGroupRename}
                >
                  Rename group
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {moveToGroupOpen && (
        <>
          <div className="fixed flex justify-center items-center w-full h-[100vh] backdrop-blur-[1px] bg-black/30 p-4">
            <div className="flex flex-col justify-between  bg-white w-[400px] h-[250px] shadow-sm rounded p-4">
              <div className="flex  justify-center items-center">
                <h3 className="font-semibold text-2xl">Move to Group</h3>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-500 ">
                  GROUP
                </label>
                <select className="bg-gray-50 border text-gray-900 text-lg h-10 rounded-md px-2 w-full">
                  <option value="" disabled selected>
                  Select group...
                  </option>

                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.groupName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center w-full h-10 bg-white">
                <button
                  className="border rounded py-2.5 px-4 hover:bg-gray-100"
                  onClick={handleMoveToGroupOpen}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white rounded py-2.5 px-4 hover:bg-blue-700">
                  Move
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className=" bg-gray-100 ">
        <nav className="bg-white border-b border-gray-200  px-4 py-2.5  fixed left-0 right-0 top-0 z-50 ">
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
                <Link to={"/test"}>Studio</Link>
                <Link to={"/media"}>Media</Link>
                {/* <Link to={"/over"}>Dashboard</Link> */}
              </ul>
            </div>

            <div className="flex items-center lg:order-2">
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

        {/* <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }  border-r border-gray-200 sm:translate-x-0 `}
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full ">
            <ul className="space-y-2">
              <li onClick={handleOverOpen} className="cursor-pointer">
                <a className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
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
                <a className="cursor-pointer flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group">
                  <i className="fa-solid fa-cloud-arrow-up fa-lg text-gray-500 transition duration-75  group-hover:text-gray-900 "></i>
                  <span className="ml-3">Kiosks</span>
                </a>
              </li>
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 ">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
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
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
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
                <Link
                  to={"/test"}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 "
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 "
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
                </Link>
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
        </aside> */}

        <main className=" h-auto pt-20 ">
          <div className="flex justify-end items-center gap-2 bg-white w-full h-20 p-5">
            <button
              className="text-black border hover:bg-gray-100 rounded-md py-2.5 px-4"
              onClick={handleGroupOpen}
            >
              New Group
            </button>
            <Link to={"/create-kiosk"}>
              <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2.5 px-4">
                Create Screen
              </button>
            </Link>
          </div>
          <div
            className="flex flex-col justifystart items-center gap-2 p-4"
            style={{ height: "100vh" }}
          >
            {" "}
            {kiosks.map((kiosk, index) => (
              <div
                key={kiosk._id}
                className="flex flex-row justify-between items-center text-black bg-white rounded p-6 w-full h-20 cursor-pointer"
              >
                <div className="flex flex-row items-center gap-96 w-full">
                  <h3 className="font-semibold">{kiosk.kioskName}</h3>

                  <h3 className="text-sm text-gray-400">{kiosk.kioskCode}</h3>
                </div>

                <div className="flex flex-row items-center ">
                  <ContextMenuTrigger mouseButton={0} id={kiosk._id}>
                    <div onClick={handleMonuseClick} className="well">
                      <i className="fa-solid fa-ellipsis" />
                    </div>
                  </ContextMenuTrigger>
                </div>

                <ContextMenu
                  id={kiosk._id}
                  className="border-1 border-gray-200 rounded px-1 py-2.5 bg-gray-50  "
                >
                  <MenuItem
                    onClick={() => handleEditOpen(index)}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200  py-1.5 px-2"
                  >
                    <i className="fa-solid fa-gear" /> <h3>Edit</h3>
                  </MenuItem>
                  <MenuItem
                    onClick={handleMoveToGroupOpen}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200  py-1.5 px-2"
                  >
                    <i className="fa-solid fa-link" /> <h3>Move to Group</h3>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDeleteClick(index)}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200 py-1.5 px-2"
                  >
                    <i className="fa-solid fa-trash"></i> <h3>Remove</h3>
                  </MenuItem>
                </ContextMenu>
              </div>
            ))}
            {groups.map((group, index) => (
              <div
                key={group._id}
                className="flex flex-row justify-between items-center text-black w-full cursor-pointer"
              >
                <div className="flex flex-row items-center gap-96 w-full">
                  <h3 className="font-semibold">
                    {group.groupName}{" "}
                    <span className="text-sm font-light">
                      {group.groupScreens.length} Screen
                    </span>
                  </h3>
                </div>

                <div className="flex flex-row items-center ">
                  <ContextMenuTrigger mouseButton={0} id={group._id}>
                    <div onClick={handleMonuseClick} className="well">
                      <i className="fa-solid fa-ellipsis" />
                    </div>
                  </ContextMenuTrigger>
                </div>

                <ContextMenu
                  id={group._id}
                  className="border-1 border-gray-200 rounded px-1 py-2.5 bg-gray-50  "
                >
                  <MenuItem
                    onClick={() => handleEditGroupOpen(index)}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200  py-1.5 px-2"
                  >
                    <i className="fa-solid fa-gear" /> <h3>Rename</h3>
                  </MenuItem>

                  <MenuItem
                    onClick={() => handleDeleteGroup(index)}
                    className="flex justify-start items-center gap-2 rounded mb-2 w-40 hover:bg-gray-200 py-1.5 px-2"
                  >
                    <i className="fa-solid fa-trash"></i> <h3>Remove</h3>
                  </MenuItem>
                </ContextMenu>
              </div>
            ))}
          </div>

          {editOpen && (
            <div
              id="popup-modal"
              tabindex="-1"
              className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full "
            >
              <div className="relative p-4 w-full ">
                <div className=" relative bg-gray-100 rounded-lg shadow h-[90vh]">
                  <div className="p-4 md:p-5 text-center">
                    <div className="flex flex-col justify-center items-center gap-3 rounded-lg ">
                      {" "}
                      <input
                        className="text-sm bg-slate-200 hover:bg-slate-300 w-50 p-1 px-2 rounded"
                        type="text"
                        placeholder={kioskName}
                        value={kioskName}
                        onChange={(e) => setKioskName(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={handleEditKiosk}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="mb-2 bg-slate-200 hover:bg-slate-300  font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Save{" "}
                    </button>

                    <button
                      onClick={handleEditClose}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="  bg-slate-200 hover:bg-slate-300  font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
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
