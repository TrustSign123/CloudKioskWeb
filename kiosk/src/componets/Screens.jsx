import React, { useState, useContext, useEffect } from "react";
import kioskIcon from "./asstes/kiosk.png";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";
import "react-tooltip/dist/react-tooltip.css";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  showMenu,
} from "react-contextmenu";
import NavbarMain from "./NavbarMain";

const formatDate = (dateString) => {
  const originalDate = new Date(dateString);
  const formattedDate = originalDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};

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
    media,
    scheduleKioskContent,
    deleteScheduleKioskContent,
    loading,
  } = useContext(KioskContext);

  const [kioskName, setKioskName] = useState("");
  const [orientation, setOrientation] = useState("0");
  const [interval, setInterval] = useState(30);
  const [kioskId, setKioskId] = useState("");
  const [kioskCode, setKioskCode] = useState(null);
  const [contents, setContents] = useState([]);
  const [kioskSchedule, setKioskSchedule] = useState([]);
  const [groupOpen, setGroupOpen] = useState(false);
  const [moveToGroupOpen, setMoveToGroupOpen] = useState(false);
  const [editGroupOpen, setEditGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editOption, setEditOption] = useState("dashboard");
  const [schedule, setSchedule] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mediaOpen, setMediaOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState([]);
  const [addItems, setAddItems] = useState([]);

  useEffect(() => {
    profile();
    fetchKiosk();
    fetchGroups();
  }, []);

  const handleGroupOpen = () => {
    setGroupOpen(!groupOpen);
  };

  const handleMediaOpen = () => {
    setMediaOpen(!mediaOpen);
  };

  const handleScheduleOpen = () => {
    setSchedule(!schedule);
    setAddItems([]);
    setSelectedMedia([]);
    setSelectedMediaType([]);
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
    setKioskCode(kiosks[index].kioskCode);
    setKioskName(kiosks[index].kioskName);
    setContents(kiosks[index].kioskContent);
    setKioskSchedule(kiosks[index].kioskSchedule);
    setOrientation(kiosks[index].settings[0].orientation);
    setInterval(kiosks[index].settings[0].interval);
    setEditOpen(true);
  };

  const handleEditKiosk = () => {
    editKiosk(kioskName, orientation, interval, kioskCode, kioskId);
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

  // console.log(kioskSchedule);

  function handleDeleteClick(index) {
    deleteKiosk(kiosks[index]._id);
  }

  const handleDecrease = () => {
    if (interval - 5 >= 0) {
      setInterval(interval - 5);
    }
  };

  const handleIncrease = () => {
    if (interval + 5 <= 60) {
      setInterval(interval + 5);
    }
  };

  const handleSelectMedia = (index) => {
    const mediaContent = media[index]?.mediaContent;
    const mediaContentType = media[index]?.mediaContentFileType;

    // Check if the image is already selected
    const isSelected = selectedMedia.includes(mediaContent);

    // If selected, remove from the array; otherwise, add to the array
    setSelectedMedia((prevSelected) =>
      isSelected
        ? prevSelected.filter(
            (selectedMediaContent) => selectedMediaContent !== mediaContent
          )
        : [...prevSelected, mediaContent]
    );

    setSelectedMediaType((prevSelected) => [...prevSelected, mediaContentType]);
  };

  const handleAddItems = () => {
    setAddItems(selectedMedia);
    handleMediaOpen();
  };

  const handlePublishScheduleContent = () => {
    scheduleKioskContent(
      kioskCode,
      selectedMedia,
      selectedMediaType,
      formatDate(startDate),
      formatDate(endDate)
    );

    handleScheduleOpen();
  };

  const handleDeleteSchedule = (id) => {
    deleteScheduleKioskContent(id);
  };

  // console.log(addItems);

  const onDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      {groupOpen && (
        <>
          <div className="fixed flex justify-center items-center w-full h-[100vh] backdrop-blur-[1px] text-black bg-black/30 p-4">
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
          <div className="fixed flex justify-center items-center w-full h-[100vh] backdrop-blur-[1px] text-black bg-black/30 p-4">
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
          <div className="fixed flex justify-center items-center w-full h-[100vh] backdrop-blur-[1px] text-black bg-black/30 p-4">
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
        <div className="fixed top-[53px] flex w-full h-[93vh] text-black bg-gray-100 overflow-scroll">
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
                <div className="flex items-center w-full h-20 font-sans  bg-white rounded shadow-md mb-4">
                  <div className="flex flex-col gap-1 border-r border-gray-300 px-4">
                    <div className=" text-xs uppercase text-gray-700 tracking-widest">
                      Status
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-yellow-600">
                      ONLINE
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 border-r border-gray-300 px-4">
                    <h3 className="text-xs uppercase text-gray-700 tracking-widest">
                      GROUP
                    </h3>
                    <h3 className="uppercase tracking-widest font-bold">
                      NONE
                    </h3>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-r border-gray-300 px-4">
                    <h3 className="text-xs uppercase text-gray-700 tracking-widest">
                      MEDIA
                    </h3>
                    <h3 className="uppercase tracking-widest font-bold">
                      {contents.length || "0"}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 px-4">
                    <h3 className="text-xs uppercase text-gray-700 tracking-widest">
                      DEVICE
                    </h3>
                    <div className="uppercase tracking-widest font-bold">
                      Android
                    </div>
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
                        {["image/jpeg", "image/png", "image/gif"].includes(
                          content.KioskContentFileType
                        ) && (
                          <img
                            src={content.KioskContent}
                            className="w-20 h-[50px] rounded"
                          />
                        )}
                        {content.KioskContentFileType === "video/mp4" && (
                          <video
                            src={content.KioskContent}
                            className="w-20 h-[50px] rounded"
                          />
                        )}

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
                {schedule && (
                  <>
                    {mediaOpen && (
                      <>
                        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-[99] backdrop-blur-[1px] text-black bg-black/30 p-4">
                          <div className="bg-white w-[80%] h-[80%] rounded">
                            <nav className="p-4">
                              <ul className="flex flex-row gap-4">
                                <li className="hover:border-b-2 border-blue-600 py-1.5 px-2 cursor-pointer">
                                  Media
                                </li>
                                <li className="hover:border-b-2 border-blue-600 py-1.5 px-2 cursor-pointer">
                                  Apps
                                </li>
                              </ul>
                            </nav>
                            <main className="grid grid-cols-5 gap-2 p-4 w-full h-[80%] bg-gray-50 overflow-scroll">
                              {media.length === 0 ? (
                                <p>{!uploadStatus && <>Media is empty</>}</p>
                              ) : (
                                media.map((media, index) => (
                                  <div
                                    key={media._id}
                                    className={`w-[200px] bg-white shadow-sm rounded-lg cursor-pointer ${
                                      selectedMedia.includes(media.mediaContent)
                                        ? "border-4 border-blue-500 rounded"
                                        : ""
                                    }`}
                                    onClick={() => handleSelectMedia(index)}
                                  >
                                    {media.mediaContentFileType.startsWith(
                                      "image/"
                                    ) ? (
                                      <img
                                        src={media.mediaContent}
                                        className="w-full h-[200px] rounded-t-lg"
                                      />
                                    ) : media.mediaContentFileType.startsWith(
                                        "video/"
                                      ) ? (
                                      <video
                                        controls
                                        width="100%"
                                        height="200"
                                        className="w-full h-[200px] rounded-t-lg"
                                      >
                                        <source
                                          src={media.mediaContent}
                                          type={media.mediaContentFileType}
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      // You can handle other types (e.g., documents) or fallback logic here
                                      <p>Unsupported media type</p>
                                    )}
                                    {selectedMedia.includes(
                                      media.mediaContent
                                    ) && (
                                      <div className="absolute top-0 right-0 text-green-500">
                                        &#10004;
                                      </div>
                                    )}
                                    <div className="flex justify-between p-2">
                                      <div className="overflow-hidden">
                                        <h3
                                          className="font-semibold  line-clamp-1"
                                          style={{ fontSize: "0.8rem" }}
                                        >
                                          {media.mediaContentFileName}
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </main>
                            <div className="flex justify-between items-center w-full h-20 bg-white rounded-b p-4">
                              <button
                                onClick={handleMediaOpen}
                                className="border hover:bg-gray-100 py-2.5 px-3 rounded"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleAddItems}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-3 rounded"
                              >
                                Add {selectedMedia.length || 0} Items
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="fixed w-[81%] h-[85%] flex flex-col gap-2 bg-white z-50 rounded-sm shadow-sm overflow-scroll">
                      <div className="p-2">
                        <button
                          onClick={handleScheduleOpen}
                          className="text-white bg-blue-600 hover:bg-blue-700 rounded-sm py-1.5 px-4"
                        >
                          Back
                        </button>
                      </div>
                      <div className="">
                        <div className="w-full h-[300px] bg-white shadow-sm p-2">
                          <div className="flex flex-col justify-between  p-2">
                            <div className="flex justify-between items-center p-2">
                              <h3 className="font-semibold text-xl">Content</h3>
                              <button
                                onClick={handleMediaOpen}
                                className="text-white bg-blue-600 hover:bg-blue-700 rounded py-1.5 px-3"
                              >
                                Add Content
                              </button>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-2 w-full h-[220px] bg-gray-50 rounded overflow-scroll">
                              {addItems.length === 0 ? (
                                <h3 className="font-semibold text-gray-600">
                                  You haven’t chosen any content yet
                                </h3>
                              ) : (
                                addItems.map((items, index) => (
                                  <div key={index}>
                                    <img
                                      key={index}
                                      src={items}
                                      className="w-20 h-20"
                                      alt={`Media ${index}`}
                                    />
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-[300px] bg-white p-2">
                          <div className="flex flex-col justify-between  p-2">
                            <div className="flex justify-between items-center p-2">
                              <h3 className="font-semibold text-xl">
                                Schedule
                              </h3>
                            </div>
                            <div className="flex flex-col justify-start items-start gap-2 w-full h-[220px] bg-white">
                              <div className="w-full">
                                <div className="flex justify-between w-[320px] p-2">
                                  <h3>Start Date</h3>
                                  <h3>End Date</h3>
                                </div>
                                <RangeDatePicker
                                  startDate={startDate}
                                  endDate={endDate}
                                  onChange={(startDate, endDate) =>
                                    onDateChange(startDate, endDate)
                                  }
                                  minDate={new Date(1900, 0, 1)}
                                  maxDate={new Date(2100, 0, 1)}
                                  dateFormat="DD/MM/YYYY"
                                  monthFormat="MMMM - YYYY"
                                  startDatePlaceholder="-- / -- / ----"
                                  endDatePlaceholder="-- / -- / ----"
                                  disabled={false}
                                  className="w-[500px] text-gray-500 text-2xl"
                                  startWeekDay="monday"
                                  highlightToday={true}
                                />
                              </div>
                            </div>

                            <button
                              onClick={handlePublishScheduleContent}
                              className="fixed right-10 bottom-10 bg-blue-600 hover:bg-blue-700 text-white rounded-sm py-2.5 px-3"
                            >
                              Publish
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {kioskSchedule.length === 0 ? (
                  <>
                    <div className="flex flex-col justify-center items-center gap-4 h-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="352"
                        height="227"
                        fill="none"
                        viewBox="0 0 352 227"
                        className="w-full opacity-40"
                      >
                        <path
                          stroke="#00D8D6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3.23"
                          d="M211.83 91.81s-2.14 1.16-5.9 2.85"
                        ></path>
                        <path
                          stroke="#00D8D6"
                          stroke-dasharray="13.5 13.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3.23"
                          d="M193.39 99.62c-6.376 2.237-12.898 4.034-19.52 5.38-20.68 4.11-66.57-2.84-65.89-21.38.65-17.88 21-15.41 27.35-34.32 3.84-11.47-6-23-21.67-31.49"
                        ></path>
                        <path
                          stroke="#00D8D6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3.23"
                          d="M107.6 14.76c-1.96-.887-3.98-1.723-6.06-2.51"
                        ></path>
                        <path
                          fill="url(#prefix__paint0_linear)"
                          d="M225 227c70.068 0 126.87-8.283 126.87-18.5S295.068 190 225 190c-70.068 0-126.87 8.283-126.87 18.5S154.932 227 225 227z"
                        ></path>
                        <g opacity="0.7">
                          <path
                            fill="#B7A3F3"
                            d="M295.1 86.59v93.54c-.003 2.434-.971 4.767-2.692 6.488s-4.054 2.69-6.488 2.692h-17.43l10.67 10.94c.233.254.388.571.446.911.058.34.016.69-.12 1.006-.137.317-.362.588-.648.78-.287.192-.623.298-.968.303-.309.003-.612-.076-.88-.23l-24.39-13.71h-75.13l-26.39 14.52c-.274.147-.579.226-.89.23-.361-.001-.713-.11-1.013-.311-.299-.201-.532-.486-.67-.82-.138-.333-.174-.7-.104-1.054.07-.354.243-.679.497-.935l11.63-11.63h-16.81c-1.747.002-3.458-.498-4.93-1.44l-10.94 16.65c-.692.948-1.721 1.594-2.875 1.805-1.154.211-2.345-.029-3.327-.67-.983-.642-1.682-1.635-1.953-2.777-.271-1.141-.094-2.343.495-3.358l14.34-21.82v-17.78c-3.98-5.987-6.114-13.011-6.138-20.2-.023-7.19 2.066-14.227 6.008-20.24l.13-.19v-32.7c0-1.206.238-2.4.7-3.515.462-1.115 1.139-2.127 1.992-2.98.854-.852 1.867-1.528 2.982-1.989 1.115-.46 2.31-.697 3.516-.696h142.2c2.435 0 4.77.967 6.491 2.689 1.722 1.721 2.689 4.056 2.689 6.491z"
                            opacity="0.25"
                          ></path>
                        </g>
                        <path
                          fill="#fff"
                          d="M301.51 95.02H150.49v99.95h151.02V95.02z"
                        ></path>
                        <path
                          fill="url(#prefix__paint1_linear)"
                          d="M302 93H149v23h153V93z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M185.07 92.43l-7.34 30.54-7.34-.54 7.34-30.54 7.34.54zM216.02 94.57l-7.33 30.54-7.36-.54 7.34-30.54 7.35.54zM248.07 93.43l-7.34 30.54-7.34-.54 7.34-30.54 7.34.54zM279.02 95.57l-7.33 30.54-7.36-.54 7.34-30.54 7.35.54z"
                        ></path>
                        <path
                          fill="url(#prefix__paint2_linear)"
                          d="M240.48 149c.023.916-.194 1.822-.631 2.628s-1.078 1.482-1.859 1.962l-19.87 11.32c-.607.356-1.297.546-2 .55-.854-.003-1.686-.272-2.38-.77-.679-.501-1.228-1.158-1.602-1.914-.374-.757-.562-1.592-.548-2.436v-22.56c-.017-.845.169-1.681.541-2.44.372-.758.921-1.416 1.599-1.92.63-.465 1.383-.734 2.165-.775.783-.041 1.56.148 2.235.545L238 144.38c.783.484 1.425 1.166 1.861 1.977.435.811.649 1.723.619 2.643z"
                        ></path>
                        <path
                          fill="url(#prefix__paint3_linear)"
                          d="M151.74 192.52L301 92.94 300.49 194l-148.75-1.48z"
                        ></path>
                        <path
                          fill="#7048E8"
                          d="M296.87 88.35H154.66c-2.436 0-4.772.967-6.495 2.688-1.723 1.722-2.692 4.056-2.695 6.492v93.54c0 2.437.968 4.775 2.692 6.498 1.723 1.724 4.061 2.692 6.498 2.692h16.82l-11.63 11.63c-.254.256-.427.581-.497.935-.07.354-.034.721.104 1.054.138.334.371.619.67.82.3.201.652.31 1.013.311.308-.002.61-.081.88-.23l26.4-14.52h75.12L287.93 214c.268.153.572.232.88.23.355.001.702-.103.998-.299.296-.196.527-.475.665-.802.138-.327.176-.687.11-1.036-.067-.348-.235-.669-.483-.923l-10.67-10.94h17.43c2.436-.003 4.771-.972 6.492-2.695 1.721-1.723 2.688-4.059 2.688-6.495V97.53c-.003-2.432-.969-4.764-2.688-6.485-1.719-1.72-4.05-2.69-6.482-2.695zm1 102.72c0 .265-.105.52-.293.707-.187.188-.442.293-.707.293H154.66c-.158.001-.314-.04-.45-.12-.155-.082-.286-.205-.379-.354-.093-.149-.145-.32-.151-.496V97.53c0-.265.105-.52.293-.707.187-.188.442-.293.707-.293h142.19c.08-.01.16-.01.24 0 .207.056.39.176.523.343.133.168.209.373.217.587l.02 93.61z"
                        ></path>
                        <path
                          fill="#fff"
                          stroke="#00D8D6"
                          stroke-miterlimit="10"
                          stroke-width="7.8"
                          d="M194.433 160.966c9.584-14.585 5.53-34.178-9.055-43.762-14.585-9.584-34.178-5.531-43.762 9.055-9.584 14.585-5.53 34.178 9.055 43.762 14.585 9.584 34.178 5.53 43.762-9.055z"
                        ></path>
                        <path
                          stroke="#00D8D6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="7.8"
                          d="M149.91 171.17L127.02 206"
                        ></path>
                        <path
                          fill="#99F3F1"
                          d="M195.78 147.19c-.664 5.758-3.109 11.164-6.995 15.465-3.886 4.3-9.018 7.28-14.679 8.522-5.661 1.243-11.569.686-16.898-1.592-5.33-2.278-9.814-6.164-12.828-11.115 0 0 45.71-30.12 46.39-30.64 4.021 5.605 5.807 12.508 5.01 19.36z"
                          opacity="0.3"
                        ></path>
                        <path
                          fill="#00D8D6"
                          d="M165.57 148.56c-.45-.669-.678-1.464-.65-2.27-.077-1.282.139-2.564.63-3.75.522-1.113 1.173-2.16 1.94-3.12.505-.656.957-1.351 1.35-2.08.3-.591.444-1.248.42-1.91.008-.308-.05-.614-.169-.899-.119-.284-.296-.54-.521-.751-.501-.42-1.148-.625-1.8-.57-.635.02-1.258.174-1.83.45-.7.35-1.369.758-2 1.22l-1 .6c-.628.529-1.389.875-2.2 1-.353-.003-.699-.096-1.006-.271-.306-.175-.562-.426-.744-.729-.508-.727-.777-1.593-.77-2.48-.053-.561.03-1.127.242-1.65.213-.522.548-.985.978-1.35 1.202-1.087 2.587-1.954 4.09-2.56 1.48-.614 3.059-.953 4.66-1 1.63-.07 3.253.256 4.73.95 1.346.633 2.494 1.622 3.32 2.86.824 1.255 1.272 2.719 1.29 4.22.042 1.109-.142 2.215-.54 3.25-.352.922-.84 1.785-1.45 2.56-.58.713-1.33 1.573-2.25 2.58-.721.703-1.39 1.459-2 2.26-.432.575-.727 1.243-.86 1.95-.051.618-.316 1.198-.75 1.64-.391.382-.913.601-1.46.61-.316.02-.633-.039-.921-.171-.288-.133-.539-.335-.729-.589zM164.8 160c-.373-.337-.672-.747-.878-1.204-.207-.458-.316-.954-.322-1.456-.03-.495.043-.991.215-1.456.172-.464.44-.888.785-1.244.355-.367.781-.658 1.252-.855.471-.198.977-.298 1.488-.295.518-.031 1.036.042 1.526.214.489.171.939.439 1.324.786.373.337.672.747.878 1.205.207.457.316.953.322 1.455.031.495-.043.991-.215 1.456-.172.465-.439.888-.785 1.244-.748.715-1.737 1.124-2.772 1.146-1.034.023-2.04-.344-2.818-1.026v.03z"
                        ></path>
                        <path
                          fill="#00D8D6"
                          d="M82.8 0H4.5C2.015 0 0 2.015 0 4.5v58.82c0 2.485 2.015 4.5 4.5 4.5h78.3c2.485 0 4.5-2.015 4.5-4.5V4.5c0-2.485-2.015-4.5-4.5-4.5z"
                          opacity="0.25"
                        ></path>
                        <path
                          fill="#E6FBFB"
                          d="M90.17 7.18h-78.3c-2.485 0-4.5 2.015-4.5 4.5V70.5c0 2.486 2.015 4.5 4.5 4.5h78.3c2.485 0 4.5-2.014 4.5-4.5V11.68c0-2.485-2.015-4.5-4.5-4.5z"
                        ></path>
                        <path
                          fill="url(#prefix__paint4_linear)"
                          d="M94.68 11.68v3H7.37v-3c.003-1.192.478-2.336 1.321-3.179s1.986-1.318 3.18-1.32h78.31c1.192.002 2.335.477 3.178 1.32.844.843 1.319 1.987 1.321 3.18z"
                        ></path>
                        <path
                          fill="#00D8D6"
                          d="M13.15 12.35c.707 0 1.28-.573 1.28-1.28 0-.707-.573-1.28-1.28-1.28-.707 0-1.28.573-1.28 1.28 0 .707.573 1.28 1.28 1.28zM17.12 12.35c.707 0 1.28-.573 1.28-1.28 0-.707-.573-1.28-1.28-1.28-.707 0-1.28.573-1.28 1.28 0 .707.573 1.28 1.28 1.28zM21.09 12.35c.707 0 1.28-.573 1.28-1.28 0-.707-.573-1.28-1.28-1.28-.707 0-1.28.573-1.28 1.28 0 .707.573 1.28 1.28 1.28z"
                        ></path>
                        <path
                          fill="#99F3F1"
                          d="M37.98 21.42H18.35c-2.546 0-4.61 2.064-4.61 4.61v13.64c0 2.546 2.064 4.61 4.61 4.61h19.63c2.546 0 4.61-2.064 4.61-4.61V26.03c0-2.546-2.064-4.61-4.61-4.61zM40.72 49.15H15.61c-1.033 0-1.87.837-1.87 1.87v4.13c0 1.033.837 1.87 1.87 1.87h25.11c1.033 0 1.87-.837 1.87-1.87v-4.13c0-1.033-.837-1.87-1.87-1.87zM41.3 59.64H15.03c-.712 0-1.29.578-1.29 1.29v1.17c0 .713.578 1.29 1.29 1.29H41.3c.712 0 1.29-.577 1.29-1.29v-1.17c0-.712-.578-1.29-1.29-1.29zM41.3 65.63H15.03c-.712 0-1.29.577-1.29 1.29v1.17c0 .712.578 1.29 1.29 1.29H41.3c.712 0 1.29-.578 1.29-1.29v-1.17c0-.713-.578-1.29-1.29-1.29zM86.15 22.54h-33.9c-1.193 0-2.16.967-2.16 2.16v3.55c0 1.193.967 2.16 2.16 2.16h33.9c1.193 0 2.16-.967 2.16-2.16V24.7c0-1.193-.967-2.16-2.16-2.16zM86.82 33.41H51.58c-.823 0-1.49.667-1.49 1.49v.77c0 .823.667 1.49 1.49 1.49h35.24c.823 0 1.49-.667 1.49-1.49v-.77c0-.823-.667-1.49-1.49-1.49zM86.82 39.78H51.58c-.823 0-1.49.667-1.49 1.49v.77c0 .823.667 1.49 1.49 1.49h35.24c.823 0 1.49-.667 1.49-1.49v-.77c0-.823-.667-1.49-1.49-1.49zM86.82 46.15H51.58c-.823 0-1.49.667-1.49 1.49v.77c0 .823.667 1.49 1.49 1.49h35.24c.823 0 1.49-.667 1.49-1.49v-.77c0-.823-.667-1.49-1.49-1.49zM86.82 58.89H51.58c-.823 0-1.49.667-1.49 1.49v.77c0 .823.667 1.49 1.49 1.49h35.24c.823 0 1.49-.667 1.49-1.49v-.77c0-.823-.667-1.49-1.49-1.49zM86.82 65.26H51.58c-.823 0-1.49.667-1.49 1.49v.77c0 .823.667 1.49 1.49 1.49h35.24c.823 0 1.49-.667 1.49-1.49v-.77c0-.823-.667-1.49-1.49-1.49z"
                          opacity="0.65"
                        ></path>
                        <defs>
                          <linearGradient
                            id="prefix__paint0_linear"
                            x1="291.3"
                            x2="158.7"
                            y1="272.53"
                            y2="144.47"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              stop-color="#B7A3F3"
                              stop-opacity="0.5"
                            ></stop>
                            <stop
                              offset="1"
                              stop-color="#F1EDFD"
                              stop-opacity="0.5"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="prefix__paint1_linear"
                            x1="302"
                            x2="149"
                            y1="104.5"
                            y2="104.5"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#B7A3F3"></stop>
                            <stop offset="1" stop-color="#F1EDFD"></stop>
                          </linearGradient>
                          <linearGradient
                            id="prefix__paint2_linear"
                            x1="210.737"
                            x2="239.618"
                            y1="149.52"
                            y2="149.52"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#B7A3F3"></stop>
                            <stop offset="1" stop-color="#5028C6"></stop>
                          </linearGradient>
                          <linearGradient
                            id="prefix__paint3_linear"
                            x1="226.37"
                            x2="226.37"
                            y1="194"
                            y2="92.95"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              stop-color="#5028C6"
                              stop-opacity="0.2"
                            ></stop>
                            <stop
                              offset="1"
                              stop-color="#3B23A3"
                              stop-opacity="0.1"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="prefix__paint4_linear"
                            x1="7.37"
                            x2="94.68"
                            y1="10.93"
                            y2="10.93"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#E6FBFB"></stop>
                            <stop offset="1" stop-color="#00D8D6"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <h2 className="text-2xl font-semibold mt-6 opacity-40">
                        You have no schedule content at the moment
                      </h2>
                      <p className="mb-6 opacity-40">
                        Adding a content in media to start displaying content on
                        your screens.
                      </p>
                      <div
                        className="inline-block h-12 py-3 px-4 font-semibold select-none whitespace-nowrap rounded leading-none focus:shadow-lg focus:outline-none text-white bg-purple-600 hover:bg-purple-700 "
                        role="button"
                      >
                        <div
                          onClick={handleScheduleOpen}
                          className="flex-cols flex h-full items-center justify-center"
                        >
                          Schedule a content
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    {kioskSchedule.map((schedule, index) => (
                      <div
                        key={schedule._id}
                        className="flex justify-between bg-white w-full shadow-sm rounded py-2 px-3"
                      >
                        <img
                          src={schedule.kioskContent[0].KioskContent}
                          className="w-20 h-[50px] rounded"
                        />

                        <div className="flex justify-center items-center gap-4 text-blue-600 font-semibold">
                          <h3>{schedule.startDate}</h3>
                          <h3>To</h3>
                          <h3>{schedule.endDate}</h3>
                        </div>
                        <button
                          onClick={() => handleDeleteSchedule(schedule._id)}
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                    ))}
                    <div
                      className="inline-block h-12 py-3 px-4 font-semibold select-none whitespace-nowrap rounded leading-none focus:shadow-lg focus:outline-none text-white bg-purple-600 hover:bg-purple-700 "
                      role="button"
                    >
                      <div
                        onClick={handleScheduleOpen}
                        className="flex-cols flex h-full items-center justify-center"
                      >
                        Schedule a content
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {editOption === "settings" && (
              <>
                <div className="flex justify-end items-center p-2">
                  {" "}
                  <button
                    onClick={handleEditKiosk}
                    className="flex justify-center items-center bg-blue-600 hover:bg-blue-700  text-white rounded py-2.5 px-3"
                  >
                    Save changes
                  </button>
                </div>
                <div className="flex flex-row justify-center items-center gap-2 h-full ">
                  <div className="flex flex-col gap-4 w-50 h-full bg-white rounded shadow-sm p-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-500 text-sm uppercase tracking-widest">
                        SCREEN NAME
                      </label>
                      <input
                        type="text"
                        className="border-1 border-blue-600 h-10 w-full bg-transparent px-2 align-middle outline-none"
                        value={kioskName}
                        onChange={(e) => setKioskName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-500 text-sm uppercase tracking-widest">
                        SCREEN LOCATION
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="border-1 border-blue-600 h-10 w-full bg-transparent px-2 align-middle outline-none"
                        value="Laxmi Nagar, Delhi, India"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-500 text-sm uppercase tracking-widest">
                        ORIENTATION
                      </label>
                      <div className="flex flex-1 space-x-1.5">
                        <div
                          onClick={() => setOrientation("0")}
                          className={`${
                            orientation === "0" ? "opacity-100" : "opacity-25"
                          } hover:opacity-100 cursor-pointer transition-opacity duration-150 flex flex-1 items-center justify-center border border-gray-900 rounded p-1`}
                        >
                          <span className="text-lg sm:text-2xl font-extrabold">
                            0
                          </span>
                          <span className="text-xl">°</span>
                        </div>
                        <div
                          onClick={() => setOrientation("90")}
                          className={`${
                            orientation === "90" ? "opacity-100" : "opacity-25"
                          } hover:opacity-100 cursor-pointer transition-opacity duration-150 flex flex-1 items-center justify-center border border-gray-900 rounded p-1`}
                        >
                          <span className="text-lg sm:text-2xl font-extrabold">
                            90
                          </span>
                          <span className="text-xl">°</span>
                        </div>
                        <div
                          onClick={() => setOrientation("180")}
                          className={`${
                            orientation === "180" ? "opacity-100" : "opacity-25"
                          } hover:opacity-100 cursor-pointer transition-opacity duration-150 flex flex-1 items-center justify-center border border-gray-900 rounded p-1`}
                        >
                          <span className="text-lg sm:text-2xl font-extrabold">
                            180
                          </span>
                          <span className="text-xl">°</span>
                        </div>
                        <div
                          onClick={() => setOrientation("270")}
                          className={`${
                            orientation === "270" ? "opacity-100" : "opacity-25"
                          } hover:opacity-100 cursor-pointer transition-opacity duration-150 flex flex-1 items-center justify-center border border-gray-900 rounded p-1`}
                        >
                          <span className="text-lg sm:text-2xl font-extrabold">
                            270
                          </span>
                          <span className="text-xl">°</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-50 h-full bg-white rounded shadow-sm p-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-500 text-sm uppercase tracking-widest">
                        INTERVAL (SECONDS)
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDecrease}
                          className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 py-1.5 px-3 rounded text-white font-bold text-xl"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="border-1 border-blue-600 h-10 w-full bg-transparent text-center align-middle outline-none"
                          value={interval}
                          disabled
                        />
                        <button
                          onClick={handleIncrease}
                          className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 py-1.5 px-3 rounded text-white font-bold text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      )}
      <NavbarMain />

      <div className="text-black bg-white">
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
                        className="h-7"
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
                      {group.groupScreens.length || 0} Screen
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
