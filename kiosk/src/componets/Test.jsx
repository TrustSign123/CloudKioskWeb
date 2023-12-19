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
  const [selectedElement, setSelectedElement] = useState(null);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("bg-gray-300");
  const [mode, setMode] = useState("element");
  const [elements, setElements] = useState([
    {
      id: String,
      data: "",
      positionX: 800,
      positionY: 350,
      size: 0,
      color: "bg-gray-300",
    },
  ]);
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

  const handleMouseDown = (e, id) => {
    setIsDragging(true);
    const initialX = e.clientX - (elementPositions[id]?.x || 800);
    const initialY = e.clientY - (elementPositions[id]?.y || 350);

    const handleMouseMove = (e) => {
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;

      setElementPositions((prevPositions) => ({
        ...prevPositions,
        [id]: { x: newX, y: newY },
      }));
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

  const handleGetElements = (data) => {
    const newElement = {
      id: useId(),
      data: data,
      positionX: 800,
      positionY: 350,
      size: size,
      color: color,
    };
    setElements((prevElements) => ({
      ...prevElements,
      data: prevElements.data
        ? [...prevElements.data, newElement]
        : [newElement],
    }));
  };

  const handleSetId = (id, data) => {
    setSelectedId(id);
    setSelectedElement(data);
    toggleEditDrawer();
  };

  const handleColorChange = (selectedOption) => {
    const updatedElements = elements.data.map((element) => {
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
  ];

  return (
    <>
      <Tooltip id={"id"} place="top" className="z-50" />
      <Drawer
        open={isOpen}
        onClose={isOpen}
        direction="left"
        zIndex="10"
        duration="300"
        enableOverlay={false}
        size="350px"
        className="ml-20 p-2 shadow-sm"
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
              </div>
            </>
          )}
          {mode === "uploads" && (
            <>
              <div className="flex justify-center ">
                <butoon className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-[35%] rounded cursor-pointer">
                  Upload files
                </butoon>
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

        <main className="flex justify-center items-center fixed top-20 left-60 bg-white w-[80%] h-[80%] ">
          {elements.data && elements.data.length > 0 ? (
            elements.data.map((canva, index) => (
              <div
                key={canva.id}
                className="hover:border-2 border-blue-600 text-black cursor-pointer"
                ref={dragRef}
                style={{
                  position: "fixed",
                  left: `${elementPositions[canva.id]?.x || canva.positionX}px`,
                  top: `${elementPositions[canva.id]?.y || canva.positionY}px`,
                }}
                onMouseDown={(e) => handleMouseDown(e, canva.id)}
              >
                <p
                  className=""
                  onClick={() => {
                    handleSetId(canva.id, canva.data);
                  }}
                  data-tooltip-id={"id"}
                  data-tooltip-content={`X:${
                    elementPositions[canva.id]?.x || 0
                  }, Y:${elementPositions[canva.id]?.y || 0}`}
                >
                  {canva.data}
                </p>
              </div>
            ))
          ) : (
            <>no data found</>
          )}
        </main>
      </div>
    </>
  );
}

export default Test;
