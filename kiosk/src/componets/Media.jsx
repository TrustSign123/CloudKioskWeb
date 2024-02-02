import React, { useState, useContext, useEffect } from "react";
import KioskContext from "../context/kiosk/kioskContext";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  showMenu,
} from "react-contextmenu";
import NavbarMain from "./NavbarMain";

function Media() {
  const {
    media,
    kiosks,
    playlists,
    fetchMedia,
    fetchKiosk,
    addKioskContent,
    deleteKioskContent,
    publishKioskContent,
    fetchPlaylist,
    createPlaylist,
    deletePlaylist,
    fileSize,
    loading,
    uploadStatus,
  } = useContext(KioskContext);
  const [publishOpen, setPublishOpen] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [playlistContentOpen, setPlatlistContentOpen] = useState(false);
  const [playlistContent, setPlaylistContent] = useState([]);
  const [selectedKiosk, setSelectedKiosk] = useState(null);
  const [playlistName, setPlaylistName] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState([]);
  const [kioskCode, setKioskCode] = useState(null);
  const [mediaUrl, setMediaUrl] = useState([]);
  const [mediaType, setMediaType] = useState([]);

  const convertBytes = (contentFileSize) => {
    if (contentFileSize === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = parseInt(Math.floor(Math.log(contentFileSize) / Math.log(k)));

    return (
      Math.round(100 * (contentFileSize / Math.pow(k, i))) / 100 +
      " " +
      sizes[i]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addKioskContent(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
    } else {
    }
  };

  const handlePublishOpen = (index) => {
    setMediaUrl([media[index].mediaContent]);
    setMediaType([media[index].mediaContentFileType]);
    setPublishOpen(!publishOpen);
  };

  const handlePlaylistPublishOpen = (index) => {
    const selectedPlaylist = playlists[index].playlistContent;

    // Extracting the playlistContent and playlistContentFileType arrays
    const playlistContentArray = selectedPlaylist.map(
      (item) => item.playlistContent
    );
    const playlistContentFileTypeArray = selectedPlaylist.map(
      (item) => item.playlistContentFileType
    );

    setMediaUrl(playlistContentArray);
    setMediaType(playlistContentFileTypeArray);
    setPublishOpen(!publishOpen);
  };

  const handlePlaylistOpen = () => {
    setPlaylistOpen(!playlistOpen);
    setSelectedMedia([]);
    setSelectedMediaType([]);
  };

  const handlePlaylistContentOpen = (content) => {
    setPlatlistContentOpen(!playlistContentOpen);
    setPlaylistContent(content);
  };

  const handleRadioChange = (index) => {
    setKioskCode(kiosks[index].kioskCode);
    setSelectedKiosk(index === selectedKiosk ? null : index);
  };

  const handlePublishMedia = () => {
    publishKioskContent(kioskCode, mediaUrl, mediaType);
  };

  const handleDeleteMedia = (index) => {
    deleteKioskContent(media[index]._id);
  };

  const handleImageClick = (index) => {
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
  const handleSelectAll = () => {
    // If all images are already selected, clear the selection; otherwise, select all
    setSelectedMedia((prevSelected) =>
      prevSelected.length === media.length
        ? []
        : media.map((mediaItem) => mediaItem.mediaContent)
    );

    setSelectedMediaType((prevSelected) =>
      prevSelected.length === media.length
        ? []
        : media.map((mediaItem) => mediaItem.mediaContentFileType)
    );
  };

  const handleCreatePlaylist = () => {
    createPlaylist(playlistName, selectedMedia, selectedMediaType);
    setPlaylistOpen(false);
    setPlaylistName(null);
    setSelectedMedia([]);
    // setSelectedMediaType([]);
  };

  const handleDeletePlaylist = (id) => {
    deletePlaylist(id);
  };

  // console.log(mediaUrl, mediaType);

  useEffect(() => {
    fetchMedia();
    fetchKiosk();
    fetchPlaylist();
  }, []);
  return (
    <>
      {publishOpen && (
        <>
          <div className="fixed flex justify-center items-start w-full h-[100vh] backdrop-blur-[1px] text-black bg-black/30 p-4">
            <div className="bg-white md:w-50 h-[500px] shadow-sm rounded mt-3">
              <div className="flex justify-between items-center p-4">
                <h3>Select screens to start publishing your content</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-2 px-5 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-full bg-gray-50 "
                    placeholder="Search Screens"
                    required
                  />
                </div>
              </div>
              <div className="bg-gray-100 h-full p-2 overflow-scroll">
                {kiosks.map((kiosk, index) => (
                  <div
                    key={kiosk._id}
                    className={`flex justify-between items-center gap-4 bg-white w-full rounded h-[70px] mb-3 p-4 ${
                      index === selectedKiosk ? "border-2 border-blue-500" : ""
                    }`}
                  >
                    {" "}
                    <h3 className="font-semibold">{kiosk.kioskName}</h3>
                    <input
                      type="radio"
                      className="w-5 h-5 p-0 cursor-pointer"
                      checked={index === selectedKiosk}
                      onChange={() => handleRadioChange(index)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center w-full h-20 bg-white rounded-b p-4">
                <button
                  className="border rounded py-2.5 px-4 hover:bg-gray-100"
                  onClick={() => handlePublishOpen(0)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white rounded py-2.5 px-4 hover:bg-blue-700"
                  onClick={handlePublishMedia}
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-15 h-5 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    "Publish"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {playlistOpen && (
        <>
          <div className="fixed flex justify-center items-start w-full h-[100vh] backdrop-blur-[1px] text-black bg-black/30 p-4">
            <div className="bg-white md:w-2/4 sm:w-full  md:h-[500px] sm:h-[450px] shadow-sm rounded mt-3">
              <div className="flex justify-center items-center p-4">
                <h3 className="font-semibold text-xl">New Playlist</h3>
              </div>
              <div className="bg-gray-100 h-full p-2 overflow-scroll">
                <div className="flex justify-center border-b pb-2">
                  <input
                    type="text"
                    className="bg-gray-50 border text-gray-900 text-lg h-10 rounded-md px-2 w-50"
                    placeholder="Playlist name"
                    onChange={(e) => setPlaylistName(e.target.value)}
                    required
                  />
                </div>
                <button
                  onClick={handleSelectAll}
                  className="m-2 w-8 h-8 rounded-full bg-blue-500 text-white"
                >
                  All
                </button>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2 py-4">
                  {media.map((media, index) => (
                    <div
                      key={media._id}
                      className={`cursor-pointer ${
                        selectedMedia.includes(media.mediaContent)
                          ? "border-4 border-blue-500 rounded"
                          : ""
                      }`}
                      onClick={() => handleImageClick(index)}
                    >
                      {media.mediaContentFileType.startsWith("image") ? (
                        <img
                          src={media.mediaContent}
                          className="w-full h-[200px] rounded"
                        />
                      ) : (
                        <video
                          src={media.mediaContent}
                          className="w-full h-[200px] rounded"
                        />
                      )}
                      {selectedMedia.includes(media.mediaContent) && (
                        <div className="absolute top-0 right-0 text-green-500">
                          &#10004;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center w-full h-20 bg-white rounded-b p-4">
                <button
                  className="border rounded py-2.5 px-4 hover:bg-gray-100"
                  onClick={handlePlaylistOpen}
                >
                  Cancel
                </button>
                <h3>{selectedMedia.length} items selected</h3>

                <button
                  onClick={handleCreatePlaylist}
                  className="bg-blue-600 text-white rounded py-2.5 px-4 hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {playlistContentOpen && (
        <>
          <div className="fixed flex justify-center md:items-center sm:items-start w-full h-[100vh] backdrop-blur-[1px] text-black bg-black/30 p-4">
            <div className="bg-white md:w-2/4 sm:w-full h-[500px]  shadow-sm rounded">
              <div className="flex justify-center items-center p-4">
                <h3 className="font-bold text-xl">Playlist</h3>
              </div>
              <div className="grid md:grid-cols-4 sm:grid-cols-3  gap-2 p-4 h-[350px] overflow-scroll">
                {playlistContent.map((content, index) => (
                  <div
                    className={` bg-white w-full rounded  
                    }`}
                  >
                    {["image/jpeg", "image/png", "image/gif"].includes(
                      content.playlistContentFileType
                    ) && (
                      <img
                        src={content.playlistContent}
                        className="w-full h-[100px]"
                      />
                    )}
                    {content.playlistContentFileType === "video/mp4" && (
                      <video
                        src={content.playlistContent}
                        className="w-full h-[100px]"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center w-full h-20 bg-white rounded-b p-4">
                <button
                  className="border rounded py-2.5 px-4 hover:bg-gray-100"
                  onClick={() => handlePlaylistContentOpen([])}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white rounded py-2.5 px-4 hover:bg-blue-700">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <NavbarMain />
      <div className="flex flex-col gap-4 bg-white text-black p-5 h-[100vh] mt-4">
        <div className="flex md:flex-row sm:flex-col justify-between items-center gap-4 border-b-2 p-3 ">
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
                  <path d="M14 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12zM2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z"></path>
                  <path d="M5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM14 3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"></path>
                  <path d="M5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
                </svg>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-3xl">{fileSize}</h3>
                <h3>Storgae used</h3>
              </div>
            </div>
            <div className="flex justify-around items-center w-[300px] h-20 shadow-md rounded">
              <div className="bg-blue-200 rounded-full p-3">
                <i className="fas fa-photo-video fa-lg" />
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-3xl">{media.length || 0}</h3>
                <h3>Total media</h3>
              </div>
            </div>
            <div className="flex justify-around items-center w-[300px] h-20 shadow-md rounded">
              <div className="bg-blue-200 rounded-full p-3">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M25 9V7C25 6.46957 24.7893 5.96086 24.4142 5.58579C24.0391 5.21071 23.5304 5 23 5H11V3C11 2.46957 10.7893 1.96086 10.4142 1.58579C10.0391 1.21071 9.53043 1 9 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V24.7333"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5 27V11C5 10.4696 5.21071 9.96086 5.58579 9.58579C5.96086 9.21071 6.46957 9 7 9H27C27.5304 9 28.0391 9.21071 28.4142 9.58579C28.7893 9.96086 29 10.4696 29 11V13"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M29 13H11C9.89543 13 9 13.8954 9 15V29C9 30.1046 9.89543 31 11 31H29C30.1046 31 31 30.1046 31 29V15C31 13.8954 30.1046 13 29 13Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16.6507 26.88C16.4767 26.9667 16.2834 27.0076 16.0891 26.9987C15.8949 26.9898 15.7062 26.9314 15.5408 26.8291C15.3755 26.7268 15.239 26.584 15.1443 26.4141C15.0497 26.2443 15 26.0531 15 25.8586V18.1413C15 17.9468 15.0497 17.7556 15.1443 17.5858C15.239 17.4159 15.3755 17.2731 15.5408 17.1708C15.7062 17.0685 15.8949 17.0101 16.0891 17.0012C16.2834 16.9923 16.4767 17.0332 16.6507 17.12L24.3693 20.98C24.5589 21.0746 24.7183 21.2201 24.8297 21.4003C24.9412 21.5804 25.0002 21.7881 25.0002 22C25.0002 22.2118 24.9412 22.4195 24.8297 22.5996C24.7183 22.7798 24.5589 22.9253 24.3693 23.02L16.6507 26.88Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-3xl">
                  {playlists.length || 0}
                </h3>
                <h3>Total playlits</h3>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handlePlaylistOpen}
              className="text-black border hover:bg-gray-100 rounded-md py-2.5 px-4"
            >
              New Playlist
            </button>{" "}
            <label
              htmlFor="media-uploads"
              className="text-white bg-blue-600 hover:bg-blue-700 rounded py-2.5 px-4 cursor-pointer"
            >
              New file
            </label>
            <input
              id="media-uploads"
              type="file"
              accept="image/*,video/mp4"
              onChange={handleFileChange}
              enctype="multipart/form-data"
              className="hidden"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-2 py-4">
          {playlists.map((playlist, index) => (
            <div
              key={playlist._id}
              className="w-[300px] bg-blue-300 shadow-sm rounded-lg cursor-pointer p-1"
            >
              <div className="grid grid-cols-2 gap-2">
                {playlist.playlistContent.slice(0, 3).map((imageSrc, index) => (
                  <>
                    {["image/jpeg", "image/png", "image/gif"].includes(
                      imageSrc.playlistContentFileType
                    ) && (
                      <img
                        src={imageSrc.playlistContent}
                        className="w-full h-[100px] rounded"
                      />
                    )}
                    {imageSrc.playlistContentFileType === "video/mp4" && (
                      <video
                        src={imageSrc.playlistContent}
                        className="w-full h-[100px] rounded"
                      />
                    )}
                  </>
                ))}
                <div className="flex justify-center items-center w-full h-[100px] rounded bg-gray-500 text-white text-xl font-semibold">
                  {playlist.playlistContent.length - 3}
                </div>
              </div>

              <div className="flex justify-between p-2">
                <div>
                  <h3
                    className="font-semibold overflow-hidden line-clamp-1"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {playlist.playlistName}
                  </h3>
                  <h3 className="text-gray-700 text-sm">
                    {playlist.playlistContent.length} Items
                  </h3>
                </div>
                <ContextMenuTrigger mouseButton={0} id={playlist._id}>
                  <i className="fa-solid fa-ellipsis" />
                </ContextMenuTrigger>
              </div>
              <ContextMenu
                id={playlist._id}
                className="flex flex-col gap-1 bg-white shadow rounded py-2 duration-150"
              >
                <MenuItem
                  onClick={() =>
                    handlePlaylistContentOpen(playlist.playlistContent)
                  }
                  className="hover:bg-gray-100 py-1.5 px-3"
                >
                  Open <span className="text-transparent">the playlist</span>
                </MenuItem>
                <MenuItem
                  className="hover:bg-gray-100 py-1.5 px-3"
                  onClick={() => handlePlaylistPublishOpen(index)}
                >
                  Publish
                </MenuItem>
                <MenuItem
                  className="hover:bg-gray-100 py-1.5 px-3"
                  onClick={() => handleDeletePlaylist(playlist._id)}
                >
                  Remove
                </MenuItem>
              </ContextMenu>
            </div>
          ))}
          {media.length === 0 ? (
            <p>{!uploadStatus && <>Media is empty</>}</p>
          ) : (
            media.map((media, index) => (
              <div
                key={media._id}
                className="w-[300px] bg-white shadow-sm rounded-lg cursor-pointer"
              >
                {media.mediaContentFileType.startsWith("image/") ? (
                  <img
                    src={media.mediaContent}
                    className="w-full h-[200px] rounded-t-lg object-cover"
                  />
                ) : media.mediaContentFileType.startsWith("video/") ? (
                  <video
                    width="100%"
                    height="200"
                    className="w-full h-[200px] rounded-t-lg"
                  >
                    <source
                      src={media.mediaContent}
                      type={media.mediaContentFileType}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // You can handle other types (e.g., documents) or fallback logic here
                  <p>Unsupported media type</p>
                )}
                <div className="flex justify-between p-2">
                  <div className="overflow-hidden">
                    <h3
                      className="font-semibold  line-clamp-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {media.mediaContentFileName}
                    </h3>
                    <h3 className="text-gray-400 text-sm">
                      {media.mediaContentFileType} •{" "}
                      {convertBytes(media.mediaContentFileSize)}
                    </h3>
                  </div>
                  <ContextMenuTrigger mouseButton={0} id={media._id}>
                    <i className="fa-solid fa-ellipsis" />
                  </ContextMenuTrigger>
                </div>
                <ContextMenu
                  id={media._id}
                  className="flex flex-col gap-1 bg-white shadow rounded py-2 duration-150"
                >
                  <MenuItem
                    className="hover:bg-gray-100 py-1.5 px-3"
                    onClick={() => handlePublishOpen(index)}
                  >
                    Publish
                  </MenuItem>
                  <MenuItem className="hover:bg-gray-100 py-1.5 px-3">
                    Move to playlist
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-gray-100 py-1.5 px-3"
                    onClick={() => handleDeleteMedia(index)}
                  >
                    Remove
                  </MenuItem>
                </ContextMenu>
              </div>
            ))
          )}

          {uploadStatus && (
            <div className="flex justify-center items-center w-[300px] h-[200px] bg-white shadow-sm rounded-lg cursor-pointer">
              <svg
                aria-hidden="true"
                className="inline w-20 h-20 animate-spin text-gray-300 fill-blue-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Media;
