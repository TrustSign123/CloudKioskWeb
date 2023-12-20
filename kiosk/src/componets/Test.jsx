import React, { useState, useRef, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "react-tooltip/dist/react-tooltip.css";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "react-tooltip";
import Select from "react-select";

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);
  const [canvaData, setData] = useState(null);
  const [position, setPosition] = useState({ positionX: 768, positionY: 286 });
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [mode, setMode] = useState("element");
  const [elements, setElements] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const useId = () => uuidv4();

  const [isDragging, setIsDragging] = useState(false);
  const [elementPositions, setElementPositions] = useState({});

  const options = [
    { value: "gray-300", label: "Gray" },
    { value: "black", label: "Black" },
    { value: "yellow-300", label: "Yellow" },
  ];
  const dragRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      const promises = Array.from(selectedFiles).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((fileContents) => {
          setFiles((prevFiles) => [...prevFiles, fileContents]);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
          setFiles([]);
        });
    } else {
      setFiles([]);
    }
  };

  const handleMouseDown = (e, id) => {
    setIsDragging(true);
    const initialX = e.clientX - (elementPositions[id]?.x || 768);
    const initialY = e.clientY - (elementPositions[id]?.y || 286);

    const handleMouseMove = (e) => {
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;

      setElementPositions((prevPositions) => ({
        ...prevPositions,
        [id]: { x: newX, y: newY },
      }));

      setElements((prevElements) =>
        prevElements.map((element) =>
          element.id === id
            ? {
                ...element,
                positionX: newX,
                positionY: newY,
              }
            : element
        )
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const toggleDrawer = () => {
    setIsOpen(true);
  };

  const toggleEditDrawer = () => {
    setEditOpen((prevState) => !prevState);
  };

  const toggleDrawerClose = () => {
    setIsOpen(false);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    toggleDrawer();
  };

  // console.log(elements);

  const handleGetElements = (data) => {
    const newId = useId();
    setId(newId);
    setData(data);
    setPosition({ positionX: 768, positionY: 286 });
    setSize(0);
    setColor("bg-gray-300");

    const newElement = {
      id: newId,
      data: data,
      positionX: position.positionX,
      positionY: position.positionY,
      size: size,
      color: color,
    };

    setElements((prevElements) => [...prevElements, newElement]);

    // Reset state values
    setId(null);
    setData("");
    setPosition({ positionX: 768, positionY: 286 });
    setSize(0);
    setColor("");
  };

  const handleSetId = (id, data) => {
    setSelectedId(id);
    setSelectedElement(data);
    toggleEditDrawer();
  };

  const handleColorChange = (selectedOption) => {
    const updatedElements = elements.map((element) => {
      if (element.id === selectedId) {
        return { ...element, color: selectedOption.value };
      }
      return element;
    });

    setElements(updatedElements);
  };

  const elementCanvas = [
    <canvas className="w-[150px] h-[150px] bg-gray-300 shadow-sm cursor-pointer"></canvas>,
    <canvas className="w-[150px] h-[150px] bg-gray-300 shadow-sm rounded cursor-pointer"></canvas>,
    <canvas className="w-[150px] h-[150px] bg-gray-300 shadow-sm rounded-full cursor-pointer"></canvas>,
    <canvas className="w-full h-[150px] bg-gray-300 shadow-sm  cursor-pointer"></canvas>,
  ];

  // console.log(files)

  return (
    <>
      <Tooltip id={"id"} place="top" className="z-50" clickable />
      <Drawer
        open={isOpen}
        onClose={isOpen}
        direction="left"
        zIndex="10"
        duration="300"
        enableOverlay={false}
        size="350px"
        className="ml-20 p-2 shadow-sm overflow-hidden"
      >
        <div className="text-black">
          <button onClick={toggleDrawerClose}>close</button>
          {mode === "element" && (
            <>
              <div className="grid grid-cols-2 gap-4 ">
                <canvas
                  onClick={() => handleGetElements(elementCanvas[0])}
                  className="w-[150px] h-[150px] bg-gray-300 shadow-sm cursor-pointer"
                ></canvas>

                <canvas
                  onClick={() => handleGetElements(elementCanvas[1])}
                  className="w-[150px] h-[150px] bg-gray-300 shadow-sm rounded cursor-pointer"
                ></canvas>
                <canvas
                  onClick={() => handleGetElements(elementCanvas[2])}
                  className="w-[150px] h-[150px] bg-gray-300 shadow-sm rounded-full cursor-pointer"
                ></canvas>

                <canvas
                  onClick={() => handleGetElements(elementCanvas[3])}
                  className="w-full h-[150px] bg-gray-300 shadow-sm  cursor-pointer"
                ></canvas>
              </div>
            </>
          )}
          {mode === "uploads" && (
            <>
              <div className="flex justify-center ">
                <label
                  for="input-file"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-[35%] rounded cursor-pointer"
                >
                  Upload files
                </label>
                <input
                  id="input-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  enctype="multipart/form-data"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {files.map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt={`Image ${index + 1}`}
                    className="w-full cursor-pointer"
                    onClick={() =>
                      handleGetElements(
                        <img
                          src={file}
                          className="w-[150px] h-[150px]"
                          draggable="false"
                        />
                      )
                    }
                  />
                ))}
              </div>
            </>
          )}
          {mode === "photo" && <>photo</>}
          {mode === "frames" && <>frames</>}
          {mode === "templates" && <>templates</>}
        </div>
      </Drawer>

      {/* edit drawer */}

      <Drawer
        open={editOpen}
        onClose={toggleEditDrawer}
        direction="right"
        size="300px"
        className=" text-black p-3"
      >
        <div className="flex flex-col justify-start items-center gap-4">
          {/* {selectedId} */}
          <p className="">{selectedElement}</p>
          <Select
            options={options}
            defaultValue={options.find((option) => option.value === color)}
            onChange={handleColorChange}
            className="w-full"
          />
        </div>
      </Drawer>

      <div className="bg-gray-300 w-full h-[100vh]">
        <nav className="bg-slate-800 w-20 h-full overflow-hidden">
          <ul className="flex flex-col justify-center items-center gap-4 ">
            <li
              className="text-center cursor-pointer hover:bg-white hover:text-black py-1.5 px-3 "
              onClick={() => handleModeChange("element")}
            >
              <i className="fa-solid fa-shapes fa-lg" />
              <br />
              <spna className="text-xs">Elements</spna>
            </li>
            <li
              className="text-center cursor-pointer hover:bg-white hover:text-black py-1.5 px-4 "
              onClick={() => handleModeChange("uploads")}
            >
              <i className="fa-solid fa-cloud-arrow-up fa-lg" />
              <br />
              <spna className="text-xs">Uploads</spna>
            </li>
            <li
              className="text-center cursor-pointer hover:bg-white hover:text-black py-1.5 px-4 "
              onClick={() => handleModeChange("photo")}
            >
              <i className="fa-solid fa-image fa-lg" />
              <br />
              <spna className="text-xs">Photo</spna>
            </li>
            <li
              className="text-center cursor-pointer hover:bg-white hover:text-black py-1.5 px-4 "
              onClick={() => handleModeChange("frames")}
            >
              <i className="fa-solid fa-crop-simple fa-lg" />
              <br />
              <spna className="text-xs">Frames</spna>
            </li>
            <li
              className="text-center cursor-pointer hover:bg-white hover:text-black py-1.5 px-3 "
              onClick={() => handleModeChange("templates")}
            >
              <i className="fa-solid fa-object-group fa-lg" />
              <br />
              <spna className="text-xs">Templates</spna>
            </li>
          </ul>
        </nav>

        <nav className="fixed  top-0 left-20 bg-white text-black w-[95%] h-15 p-3">
          <ul className="flex justify-center items-center gap-2"></ul>
        </nav>

        <main className="flex justify-center items-center fixed top-20 left-60 bg-white w-[80%] h-[80%] overflow-hidden">
          {elements && elements.length > 0 ? (
            elements.map((canva, index) => (
              <div
                key={canva.id}
                className=" "
                ref={dragRef}
                style={{
                  position: "fixed",
                  left: `${canva.positionX}px`,
                  top: `${canva.positionY}px`,
                }}
                onMouseDown={(e) => handleMouseDown(e, canva.id)}
              >
                <div
                  className="hover:border-2 border-blue-600 text-black cursor-pointer"
                  onClick={() => {
                    handleSetId(canva.id, canva.data);
                  }}
                  data-tooltip-id={"id"}
                  data-tooltip-content={`X:${canva.positionX || 0}, Y:${
                    canva.positionY || 0
                  } `}
                >
                  {canva.data}
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </main>
      </div>
    </>
  );
}

export default Test;
