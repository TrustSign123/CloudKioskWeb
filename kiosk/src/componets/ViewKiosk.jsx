import React, { useState, useContext, useEffect } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";

function ViewKiosk() {
  const { loading } = useContext(KioskContext);
  const [openModal, setOpenModal] = useState(false);
  const [droppedImage, setDroppedImage] = useState(null);

  const handdleOpen = () => {
    setOpenModal(true);
  };
  const handdleClose = () => {
    setOpenModal(false);
  };

  const handleDrop = (data) => {
    // Assuming only one file is dropped
    const file = data.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDroppedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="flex justify-around items-start py-4">
        <div className="flex justify-start items-center gap-2 bg-slate-100 dark:bg-gray-800 w-50 h-10 p-5 rounded">
          <label
            onClick={handdleOpen}
            className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700 py-2 px-3 rounded cursor-pointer"
          >
            <i className="fa-solid fa-plus" />
          </label>
          <input id="input-img" type="file" className="hidden" />
          <img
            className="w-10 h-10 rounded"
            src="https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/shutterstock_709239358.jpg?itok=kj4KbaWb"
          />
          <img
            className="w-10 h-10 rounded"
            src="https://cityfurnish.com/blog/wp-content/uploads/2023/09/happy-diwali-greeting-card-with-burning-oil-lamp-festival-background-min.jpg"
            />
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
            <img
              className="w-full border-solid border-8 rounded border-slate-800 "
              src="https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/shutterstock_709239358.jpg?itok=kj4KbaWb"
            />
            <img
              className="w-full border-solid border-8 rounded border-slate-800 "
              src="https://cityfurnish.com/blog/wp-content/uploads/2023/09/happy-diwali-greeting-card-with-burning-oil-lamp-festival-background-min.jpg"
              style={{ height: "335px" }}
            />
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
                <Droppable types={["file"]} onDrop={handleDrop}>
                  <div className="flex justify-center items-center border-dashed border-2 border-sky-500 h-60 rounded mb-4">
                    <label htmlFor="input-img" className="m-0 text-sky-500">
                      Drag your files here or click in this area.
                    </label>
                    {droppedImage && (
                      <img
                        src={droppedImage}
                        className="w-full h-full rounded"
                        alt="Dropped"
                      />
                    )}
                  </div>
                </Droppable>

                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="mb-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                >
                  Add
                </button>
                <button
                  onClick={handdleClose}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-gary-100 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
