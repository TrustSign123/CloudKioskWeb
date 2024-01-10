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
          <div className="fixed flex justify-center items-start w-full h-[100vh] backdrop-blur-[1px] bg-black/30 p-4">
            <div className="bg-white w-50 h-[500px] shadow-sm rounded ">
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
          <div className="fixed flex justify-center items-start w-full h-[100vh] backdrop-blur-[1px] bg-black/30 p-4">
            <div className="bg-white w-50 h-[500px] shadow-sm rounded ">
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
                <div className="grid grid-cols-3 gap-2 py-4">
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
                      <img
                        src={media.mediaContent}
                        className="w-full h-[200px] rounded"
                        alt={`Media ${index}`}
                      />
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
          <div className="fixed flex justify-center items-start w-full h-[100vh] backdrop-blur-[1px] bg-black/30 p-4">
            <div className="bg-white w-50 h-[500px] shadow-sm rounded ">
              <div className="flex justify-center items-center p-4">
                <h3 className="font-bold text-xl">Playlist</h3>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4 h-[350px] overflow-scroll">
                {playlistContent.map((content, index) => (
                  <div
                    className={` bg-white w-full rounded  
                    }`}
                  >
                    <img
                      src={content.playlistContent}
                      className="w-full h-[100px]"
                    />
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
      <div className="flex flex-col gap-4 p-5 h-[100vh]">
        <div className="flex justify-end border-b-2 p-3">
          <div className="flex justify-end items-center gap-2">
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
        <div className="grid grid-cols-4 gap-2 py-4">
          {playlists.map((playlist, index) => (
            <div
              key={playlist._id}
              className="w-[300px] bg-blue-300 shadow-sm rounded-lg cursor-pointer p-1"
            >
              <div className="grid grid-cols-2 gap-2">
                {playlist.playlistContent.slice(0, 3).map((imageSrc, index) => (
                  <img
                    key={index}
                    src={imageSrc.playlistContent}
                    className="w-full h-[100px] rounded"
                  />
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
                <img
                  src={media.mediaContent}
                  className="w-full h-[200px] rounded-t-lg"
                />
                <div className="flex justify-between p-2">
                  <div>
                    <h3
                      className="font-semibold overflow-hidden line-clamp-1"
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
