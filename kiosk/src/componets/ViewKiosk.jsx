import React, { useState, useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style/view.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";

function ViewKiosk(props) {
  const { getKioskContent, kioskCode } = props;
  const { addKioskContent, editKioskContent, deleteKioskContent, loading } =
    useContext(KioskContext);
  const [openModal, setOpenModal] = useState(false);
  const [kioskContent, setKioskContent] = useState("");
  const [kioskContentId, setKioskContentId] = useState("");
  const [kioskEdit, setKioskEdit] = useState(false);
  const [kioskIndex, setKioskIndex] = useState(0);
  const [contentPreview, setContentPreview] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContentPreview(reader.result);
        setButtonDisable(false);
      };
      reader.readAsDataURL(file);
    } else {
      setContentPreview(null);
      setButtonDisable(false);
    }
  };

  const handdleOpen = () => {
    setOpenModal(true);
  };
  const handdleClose = () => {
    setOpenModal(false);
    setKioskEdit(false);
    setKioskContent("");
    setContentPreview(null);
    setButtonDisable(true);
  };

  const handleAddKioskContent = () => {
    addKioskContent(kioskContent, kioskCode);
    setOpenModal(false);
    setKioskEdit(false);
    setKioskContent("");
    setButtonDisable(true);
  };

  const handleEditClick = (index) => {
    setKioskContentId(getKioskContent[index]._id);
    setKioskContent(getKioskContent[index].KioskContent);
    setOpenModal(true);
    setKioskEdit(true);
    setKioskIndex(index);
  };

  const handleEditContent = () => {
    editKioskContent(kioskContent, kioskContentId);
    setKioskContent("");
    setKioskContentId("");
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
    setContentPreview(null);
    setKioskContent(contentPreview);
  };

  return (
    <>
      <div className="flex justify-around items-start py-4">
        <div className="view-layout bg-slate-100 dark:bg-gray-800 w-50 p-5 rounded overflow-scroll">
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
              <img className="w-30 h-20 rounded" src={content.KioskContent} />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center w-50  ml-2">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={2000}
          >
            {" "}
            {getKioskContent.map((content) => (
              <>
                <img
                  key={content._id}
                  src={content.KioskContent}
                  style={{ height: "335px" }}
                />
              </>
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
                  {!kioskEdit && (
                    <>
                      {" "}
                      <label
                        htmlFor="input-img"
                        className="grag-area flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden">
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
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                          <img src={contentPreview} />
                        </div>
                      </label>
                      <input
                        id="input-img"
                        type="file"
                        accept="image/*"
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
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                          <img src={kioskContent || contentPreview} />
                        </div>
                      </label>
                      <input
                        id="input-img"
                        type="file"
                        accept="image/*"
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
                      className="mb-2 text-white bg-slate-800 hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
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
                      className=" text-white bg-slate-800 hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleRemoveContent}
                      data-modal-hide="popup-modal"
                      type="button"
                      className=" text-white bg-slate-800 hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleDeleteContent(kioskIndex)}
                      data-modal-hide="popup-modal"
                      type="button"
                      className=" text-white bg-slate-800 hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
                    >
                      Delete
                    </button>
                  </>
                )}

                <button
                  onClick={handdleClose}
                  data-modal-hide="popup-modal"
                  type="button"
                  className=" text-white bg-slate-800 hover:bg-slate-600 font-medium rounded text-sm inline-flex items-center px-4 py-2.5 text-center me-2"
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
