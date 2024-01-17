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
import NavbarMain from "./NavbarMain";

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
    deletePublishContent,
    loading,
  } = useContext(KioskContext);

  const [kioskName, setKioskName] = useState("");
  const [kioskId, setKioskId] = useState("");
  const [contents, setContents] = useState([]);
  const [groupOpen, setGroupOpen] = useState(false);
  const [moveToGroupOpen, setMoveToGroupOpen] = useState(false);
  const [editGroupOpen, setEditGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editOption, setEditOption] = useState("dashboard");

  useEffect(() => {
    profile();
    fetchKiosk();
    fetchGroups();
  }, []);

  const handleGroupOpen = () => {
    setGroupOpen(!groupOpen);
  };

  const handleEditGroupOpen = (index) => {
    setEditGroupOpen(!editGroupOpen);
    setGroupId(groups[index]._id);
    setGroupName(groups[index].groupName);
  };

  const handleDeletePublishContent = (id) => {
    deletePublishContent(id);
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
    setContents(kiosks[index].kioskContent);
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

  // console.log(orientation);

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
      {editOpen && (
        <div className="fixed top-[53px] flex w-full h-[93vh] bg-gray-100 overflow-scroll">
          <nav className="fixed flex flex-col justify-start items-start gap-4 list-none bg-white w-[250px] h-full py-4 px-9">
            <li
              onClick={() => setEditOption("dashboard")}
              className="flex justify-start items-center gap-2 w-full font-semibold hover:bg-blue-600 hover:text-white py-1.5 px-12 rounded cursor-pointer"
            >
              <i className="fa-solid fa-gauge-simple-high fa-lg" />{" "}
              <h3>Dashboard</h3>
            </li>
            <li
              onClick={() => setEditOption("library")}
              className="flex justify-start items-center gap-2 font-semibold hover:bg-blue-600 hover:text-white py-1.5 px-12 rounded cursor-pointer"
            >
              <i className="fa-solid fa-photo-film fa-lg" /> <h3>Library</h3>
            </li>
            <li
              onClick={() => setEditOption("schedule")}
              className="flex justify-start items-center gap-2 font-semibold hover:bg-blue-600 hover:text-white py-1.5 px-12 rounded cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check fa-lg" />
              <h3>Schedule</h3>
            </li>
            <li
              onClick={() => setEditOption("settings")}
              className="flex justify-start items-center gap-2 font-semibold hover:bg-blue-600 hover:text-white py-1.5 px-12 rounded cursor-pointer"
            >
              <i className="fa-solid fa-gear fa-lg" /> <h3>Settings</h3>
            </li>
          </nav>
          <nav className="flex flex-col justify-start items-start gap-4 list-none bg-white w-[250px] h-full py-4 px-9">
            <li className="flex justify-start items-center gap-2 w-full font-semibold hover:bg-blue-600 hover:text-white py-1.5 px-12 rounded cursor-pointer">
              <i className="fa-solid fa-gauge-simple-high fa-lg" />{" "}
              <h3>Dashboard</h3>
            </li>
          </nav>
          <main className="w-full h-full p-4">
            {editOption === "dashboard" && (
              <>
                <div className="flex items-center w-full h-20 font-sans  bg-white rounded shadow-md p- mb-4">
                  <div className="flex flex-col gap-1 border-r border-gray-300 px-4">
                    <h3 className="text-sm">STATUS</h3>
                    <h3 className="font-bold text-lg text-yellow-600">
                      ONLINE
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 border-r border-gray-300 px-4">
                    <h3 className="text-sm">GROUP</h3>
                    <h3 className="font-bold text-lg">NONE</h3>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-r border-gray-300 px-4">
                    <h3 className="text-sm">MEDIA</h3>
                    <h3 className="font-bold text-lg">
                      {contents.length || "0"}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 px-4">
                    <h3 className="text-sm">DEVICE</h3>
                    <h3 className="font-bold text-lg">ANDROID</h3>
                  </div>
                </div>
              </>
            )}
            {editOption === "library" && (
              <>
                <div className="">
                  {" "}
                  <div className="flex flex-col justify-start items-center gap-4  ">
                    {contents.map((content, index) => (
                      <div
                        key={content._id}
                        className="flex justify-between items-center bg-white w-full h-[80px] py-2 px-3 shadow-sm rounded"
                      >
                        <img
                          src={content.KioskContent}
                          className="w-20 h-[50px] rounded"
                        />

                        <button
                          onClick={() =>
                            handleDeletePublishContent(content._id)
                          }
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {editOption === "schedule" && (
              <>
                <div className="">Schedule</div>
              </>
            )}
            {editOption === "settings" && (
              <>
                <div className="">Settings</div>
              </>
            )}
          </main>
        </div>
      )}
      <NavbarMain />

      <div className=" bg-white">
        <main className=" h-auto pt-14 ">
          <div className="flex justify-between items-center gap-2 bg-white w-full h-20 px-5 pb-14 pt-20">
            <div className="flex gap-4">
              <div className="flex justify-around items-center w-[300px] h-20 shadow-md rounded">
                <div className="bg-blue-200 rounded-full p-3">
                  {" "}
                  <svg
                    width="26"
                    height="26"
                    fill="currentColor"
                    className=""
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"></path>
                  </svg>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-3xl">
                    {kiosks.length || 0}
                  </h3>
                  <h3>Total screens</h3>
                </div>
              </div>
              <div className="flex justify-around items-center w-[300px] h-20 shadow-md rounded">
                <div className="grid grid-cols-2 gap-1 bg-blue-200 rounded-full p-3">
                  {" "}
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    className=""
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"></path>
                  </svg>
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    className=""
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"></path>
                  </svg>
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    className=""
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"></path>
                  </svg>
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    className=""
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"></path>
                  </svg>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-3xl">
                    {groups.length || 0}
                  </h3>
                  <h3>Total groups</h3>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ">
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
          </div>
          <div
            className="flex flex-col justifystart items-center gap-2 bg-gray-100 p-4"
            style={{ height: "100vh" }}
          >
            {" "}
            {kiosks.map((kiosk, index) => (
              <div
                key={kiosk._id}
                className="flex flex-row justify-between items-center text-black bg-white rounded p-6 w-full h-20 cursor-pointer"
              >
                <div className="flex flex-row justify-between items-center gap-4 w-50">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-200 rounded-full py-1.5 px-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "rgb(107, 70, 193)" }}
                        class="h-7"
                      >
                        <path
                          d="M22.25 2.875H1.75C1.19772 2.875 0.75 3.32272 0.75 3.875V16.875C0.75 17.4273 1.19772 17.875 1.75 17.875H22.25C22.8023 17.875 23.25 17.4273 23.25 16.875V3.875C23.25 3.32272 22.8023 2.875 22.25 2.875Z"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M7.5 21.625H16.5"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M12 17.875V21.625"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold">{kiosk.kioskName}</h3>
                  </div>

                  <h3 className="text-sm text-gray-400">{kiosk.kioskCode}</h3>
                  <h3 className="text-sm text-gray-400">
                    Laxmi Nagar, Delhi, India
                  </h3>
                  <h3 className="text-sm text-gray-400">Active just now</h3>
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
        </main>
      </div>
    </>
  );
}

export default Dashboard;

{
  /* <div className="p-4 md:p-5 text-center">
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
              </div> */
}
