import React, { useState, useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style/view.css";
import { Carousel } from "react-responsive-carousel";
import KioskContext from "../context/kiosk/kioskContext";
import ProgressBar from "../componets/ProgressBar";

function ViewKiosk(props) {
  const { getKioskContent, kioskCode } = props;
  const {
    addKioskContent,
    editKioskContent,
    deleteKioskContent,
    loading,
    uploadStatus,
  } = useContext(KioskContext);
  const [openModal, setOpenModal] = useState(false);
  const [kioskContent, setKioskContent] = useState(null);
  const [contentPreview, setContentPreview] = useState(null);
  const [contentFileName, setContentFileName] = useState("none");
  const [contentFileSize, setContentFileSize] = useState(0);
  const [contentFileType, setContentFileType] = useState("none");
  const [kioskContentId, setKioskContentId] = useState("");
  const [kioskEdit, setKioskEdit] = useState(false);
  const [kioskIndex, setKioskIndex] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setKioskContent(file);
      setContentFileName(file.name);
      setContentFileSize(file.size);
      setContentFileType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setContentPreview(reader.result);
        setButtonDisable(false);
      };
      reader.readAsDataURL(file);
    } else {
      setKioskContent(null);
      setContentPreview(null);
      setButtonDisable(false);
    }
  };

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

  const handdleOpen = () => {
    setOpenModal(true);
  };
  const handdleClose = () => {
    setOpenModal(false);
    setKioskEdit(false);
    setKioskContent(null);
    setContentPreview(null);
    setContentFileName("none");
    setContentFileSize(0);
    setContentFileType("none");
    setButtonDisable(true);
  };

  const handleAddKioskContent = () => {
    addKioskContent(kioskContent, kioskCode);
    setOpenModal(false);
    setKioskEdit(false);
    setKioskContent(null);
    setContentPreview(null);
    setContentFileName("none");
    setContentFileSize(0);
    setContentFileType("none");
    setButtonDisable(true);
  };

  const handleEditClick = (index) => {
    setKioskContentId(getKioskContent[index]._id);
    setKioskContent(getKioskContent[index].KioskContent);
    setContentFileName(getKioskContent[index].KioskContentFileName);
    setContentFileSize(getKioskContent[index].KioskContentFileSize);
    setContentFileType(getKioskContent[index].KioskContentFileType);
    setOpenModal(true);
    setKioskEdit(true);
    setKioskIndex(index);
  };

  const handleEditContent = () => {
    editKioskContent(kioskContent, kioskContentId);
    setKioskContent(null);
    setContentPreview(null);
    setKioskContentId("");
    setContentFileName("none");
    setContentFileSize(0);
    setContentFileType("none");
    setOpenModal(false);
    setKioskEdit(false);
    setButtonDisable(true);
  };

  const handleDeleteContent = (index) => {
    deleteKioskContent(getKioskContent[index]._id);
    setKioskIndex(0);
    setOpenModal(false);
  };

  const handleRemoveContent = () => {
    setKioskContent(contentPreview);
    setContentFileName("none");
    setContentFileSize(0);
    setContentFileType("none");
  };

  const isImage = (fileType) =>
    ["image/jpeg", "image/png", "image/gif"].includes(fileType);

  return (
    <>
      {uploadStatus.status && <ProgressBar progress={uploadStatus.progress} />}
      <div className="flex items-start gap-2 py-4">
        <div className="view-layout bg-slate-100 dark:bg-gray-800 p-5 rounded overflow-scroll">
          <label
            onClick={handdleOpen}
            className="flex justify-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700 py-8 rounded cursor-pointer"
          >
            <i className="fa-solid fa-plus" />
          </label>

          {getKioskContent.map((content, index) => (
            <div
              className="hover:outline outline-blue-600 dark:outline-white rounded-lg cursor-pointer"
              key={content._id}
              onClick={() => handleEditClick(index)}
            >
              {isImage(content.KioskContentFileType) ? (
                <img
                  className="w-full h-20 rounded"
                  src={content.KioskContent}
                />
              ) : (
                <video
                  className="w-full h-20 rounded"
                  style={{ objectFit: "cover" }}
                >
                  <source src={content.KioskContent} type="video/mp4" />
                  Your browser doest not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center w-50 ml-20">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={2000}
            // axis={"vertical"}
            width={"80%"}
          >
            {getKioskContent.map((content) => (
              <div key={content._id}>
                {isImage(content.KioskContentFileType) ? (
                  <img src={content.KioskContent} style={{ height: "350px" }} />
                ) : (
                  <video
                    height={"350px"}
                    style={{ objectFit: "cover" }}
                    autoPlay
                  >
                    <source src={content.KioskContent} type="video/mp4" />
                    Your browser doest not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </Carousel>
          <div className="bg-slate-800 w-20 h-60 -z-40"></div>
        </div>
      </div>
      {openModal && (
        <div
          id="popup-modal"
          tabindex="-1"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full">
            <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <div className="flex justify-center items-center rounded-lg mb-4 ">
                  <div className="file-dics bg-slate-200 dark:bg-slate-900 flex flex-col justify-around text-left gap-3 p-3 rounded mr-4">
                    <h3 className="border-b pb-2"> File details</h3>
                    <h3>File name: {contentFileName}</h3>
                    <h3>File size: {convertBytes(contentFileSize)}</h3>
                    <h3>File type: {contentFileType}</h3>
                  </div>

                  {!kioskEdit && (
                    <>
                      {" "}
                      <label
                        htmlFor="input-img"
                        className="grag-area flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden">
                          {buttonDisable && (
                            <>
                              {" "}
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG or GIF (MAX. 1920x1080px)
                              </p>
                            </>
                          )}

                          {contentFileType === "image/jpeg" ||
                          contentFileType === "image/png" ||
                          contentFileType === "image/gif" ? (
                            <img src={contentPreview} />
                          ) : (
                            <video
                              width={"350"}
                              height={"200"}
                              style={{ objectFit: "cover" }}
                              autoPlay
                            >
                              <source src={contentPreview} type="video/mp4" />
                              Your browser doest not support the video tag.
                            </video>
                          )}
                        </div>
                      </label>
                      <input
                        id="input-img"
                        type="file"
                        accept="image/*,video/mp4"
                        onChange={handleFileChange}
                        enctype="multipart/form-data"
                        className="hidden"
                      />
                    </>
                  )}
                  {kioskEdit && (
                    <>
                      {" "}
                      <label
                        htmlFor="input-img"
                        className="grag-area flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden">
                          {!buttonDisable && (
                            <>
                              {" "}
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG or GIF (MAX. 1920x1080px)
                              </p>
                            </>
                          )}

                          {contentFileType === "image/jpeg" ||
                          contentFileType === "image/png" ||
                          contentFileType === "image/gif" ? (
                            <img src={kioskContent} />
                          ) : (
                            <video
                              width={"100%"}
                              height={"200"}
                              style={{ objectFit: "cover" }}
                              controls
                              autoPlay
                            >
                              <source src={kioskContent} type="video/mp4" />
                              Your browser doest not support the video tag.
                            </video>
                          )}
                        </div>
                      </label>
                      <input
                        id="input-img"
                        type="file"
                        accept="image/jpeg,video/mp4"
                        onChange={handleFileChange}
                        enctype="multipart/form-data"
                        className="hidden"
                      />
                    </>
                  )}
                </div>

                {/* Buttons */}
                {!kioskEdit && (
                  <>
                    {" "}
                    <button
                      onClick={handleAddKioskContent}
                      data-modal-hide="popup-modal"
                      type="button"
                      disabled={buttonDisable}
                      className="mb-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Add
                    </button>
                  </>
                )}
                {kioskEdit && (
                  <>
                    {" "}
                    <button
                      onClick={handleEditContent}
                      data-modal-hide="popup-modal"
                      type="button"
                      disabled={buttonDisable}
                      className="  bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleRemoveContent}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="  bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleDeleteContent(kioskIndex)}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="  bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Delete
                    </button>
                  </>
                )}

                <button
                  onClick={handdleClose}
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
    </>
  );
}

export default ViewKiosk;
