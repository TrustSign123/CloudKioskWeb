import React, { useState, useRef, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "react-tooltip/dist/react-tooltip.css";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "react-tooltip";
import Select from "react-select";

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [canvaData, setData] = useState(null);
  const [position, setPosition] = useState({ positionX: 768, positionY: 286 });
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [mode, setMode] = useState("element");
  const [elements, setElements] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const useId = () => uuidv4();

  const [isDragging, setIsDragging] = useState(false);
  const [elementPositions, setElementPositions] = useState({});

  const options = [
    { value: "gray", label: "Gray" },
    { value: "black", label: "Black" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
  ];

  const wSizeOptions = [
    { value: "50px", label: "50px" },
    { value: "100px", label: "100px" },
    { value: "150px", label: "150px" },
    { value: "200px", label: "200px" },
    { value: "250px", label: "250px" },
    { value: "1230px", label: "Full Screen" },
  ];

  const hSizeOptions = [
    { value: "50px", label: "50px" },
    { value: "100px", label: "100px" },
    { value: "150px", label: "150px" },
    { value: "200px", label: "200px" },
    { value: "250px", label: "250px" },
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

  const handleSetId = (id, index) => {
    setSelectedId(id);
    setColor(elements[index].data.props.style.background);
  };

  const handleDeleteElement = (id) => {
    const newElements = elements.filter((el) => {
      return el.id !== id;
    });
    setElements(newElements);

    setSelectedId(null);
  };

  const handleColorChange = (selectedOption) => {
    const updatedElements = elements.map((element) => {
      if (element.id === selectedId) {
        return {
          ...element,
          data: {
            ...element.data,
            props: {
              ...element.data.props,
              style: {
                ...element.data.props.style,
                background: selectedOption.value,
              },
            },
          },
        };
      }
      return element;
    });

    setColor(selectedOption.value);
    setElements(updatedElements);
  };

  const handleWSizeChange = (selectedOption) => {
    const updatedElements = elements.map((element) => {
      if (element.id === selectedId) {
        return {
          ...element,
          data: {
            ...element.data,
            props: {
              ...element.data.props,
              style: {
                ...element.data.props.style,
                width: selectedOption.value,
              },
            },
          },
        };
      }
      return element;
    });

    setElements(updatedElements);
  };
  const handleHSizeChange = (selectedOption) => {
    const updatedElements = elements.map((element) => {
      if (element.id === selectedId) {
        return {
          ...element,
          data: {
            ...element.data,
            props: {
              ...element.data.props,
              style: {
                ...element.data.props.style,
                height: selectedOption.value,
              },
            },
          },
        };
      }
      return element;
    });

    setElements(updatedElements);
  };

  const elementCanvas = [
    <canvas
      className=" shadow-sm cursor-pointer"
      style={{ background: "gray", width: "150px", height: "150px" }}
    ></canvas>,
    <canvas
      className=" shadow-sm rounded cursor-pointer"
      style={{ background: "gray", width: "150px", height: "150px" }}
    ></canvas>,
    <canvas
      className=" shadow-sm rounded-full cursor-pointer"
      style={{ background: "gray", width: "150px", height: "150px" }}
    ></canvas>,
    <canvas
      className=" shadow-sm  cursor-pointer"
      style={{ background: "gray", width: "100%", height: "150px" }}
    ></canvas>,
  ];

  // console.log(elements[0].data.props.style.background);
  // console.log(elements[0]);

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
                    className="w-full h-40 cursor-pointer"
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

      <div className="flex justify-center items-center bg-gray-300 w-full h-[100vh]">
        <nav className="fixed left-0 bg-slate-800 w-20 h-full overflow-hidden">
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

        {/* edit nav */}
        <nav className="fixed top-0 left-20 bg-white text-black w-[95%] h-15 p-3 z-50">
          <ul className="flex justify-start items-center gap-4 z-50">
            <Select
              options={options}
              defaultValue={options.find((option) => option.value === color)}
              onChange={handleColorChange}
              className="z-50 "
            />

            <p>{color}</p>
            <Select
              options={wSizeOptions}
              defaultValue={wSizeOptions.find(
                (option) => option.value === size
              )}
              onChange={handleWSizeChange}
              className="z-50 "
            />
            <Select
              options={hSizeOptions}
              defaultValue={hSizeOptions.find(
                (option) => option.value === size
              )}
              onChange={handleHSizeChange}
              className="z-50 "
            />
            <button
              onClick={() => {
                if (selectedId !== null) {
                  handleDeleteElement(selectedId);
                }
              }}
              className={`hover:bg-gray-100 py-1.5 px-2 rounded ${
                selectedId === null ? "bg-gray-300 cursor-not-allowed" : ""
              }`}
              disabled={selectedId === null}
            >
              <i
                className={`fa-solid fa-trash fa-xl ${
                  selectedId === null ? "text-gray-500" : "text-rose-600"
                }`}
              />
            </button>
          </ul>
        </nav>

        <main className=" bg-white w-[80%] h-[80%] overflow-hidden">
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
                  className=" hover:border-2 border-blue-600 text-black cursor-pointer"
                  onClick={() => {
                    handleSetId(canva.id, index);
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
