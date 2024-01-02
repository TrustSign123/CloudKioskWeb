import React, { useState, useContext, useEffect } from "react";
import KioskContext from "../context/kiosk/kioskContext";

function Media() {
  const { media, fetchMedia, addKioskContent, loading } =
    useContext(KioskContext);

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

  useEffect(() => {
    fetchMedia();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end border-b-2 p-3">
          <label
            htmlFor="media-uploads"
            className="text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded py-2 px-4 cursor-pointer"
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
        <div className="grid grid-cols-4 gap-2 ">
          {media.map((media, index) => (
            <div
              key={media._id}
              className="w-[300px] bg-white shadow-sm rounded-lg cursor-pointer"
            >
              <img
                src={media.mediaContent}
                className="w-full h-[200px] rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="font-semibold">{media.mediaContentFileName}</h3>
                <h3 className="text-gray-400 text-sm">
                  {media.mediaContentFileType} •{" "}
                  {convertBytes(media.mediaContentFileSize)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Media;
