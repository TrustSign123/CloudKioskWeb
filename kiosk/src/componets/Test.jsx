import React, { useState, useRef, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "react-tooltip/dist/react-tooltip.css";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "react-tooltip";
import Select from "react-select";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  showMenu,
} from "react-contextmenu";
import TabComponent from "./TabComponent";

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [id, setId] = useState(null);
  const [canvaData, setData] = useState(null);
  const [position, setPosition] = useState({ positionX: 768, positionY: 286 });
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [mode, setMode] = useState("element");
  const [elements, setElements] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editableText, setEditableText] = useState("");

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

  const SizeOptions = [
    { value: "50px", label: "50px" },
    { value: "100px", label: "100px" },
    { value: "150px", label: "150px" },
    { value: "200px", label: "200px" },
    { value: "250px", label: "250px" },
    { value: "1230px", label: "Full Screen" },
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

    const newElement = {
      id: newId,
      data: data,
      positionX: position.positionX,
      positionY: position.positionY,
    };

    setElements((prevElements) => [...prevElements, newElement]);

    // Reset state values
    setId(null);
    setData("");
    setPosition({ positionX: 768, positionY: 286 });
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
    setSelected(false);
  };

  const handleDuplicateElement = (data, x, y) => {
    const newId = useId();
    setId(newId);
    setData(data);

    const newElement = {
      id: newId,
      data: data,
      positionX: x + 50,
      positionY: y + 50,
    };

    setElements((prevElements) => [...prevElements, newElement]);

    // Reset state values
    setId(null);
    setData("");
  };

  const handleChangeIndex = (direction) => {
    if (selectedId && elements.length > 1) {
      const currentIndex = elements.findIndex(
        (element) => element.id === selectedId
      );

      if (direction === "down" && currentIndex > 0) {
        // Swap current element with the one above
        const newElements = [...elements];
        [newElements[currentIndex], newElements[currentIndex - 1]] = [
          newElements[currentIndex - 1],
          newElements[currentIndex],
        ];
        setElements(newElements);
      } else if (direction === "up" && currentIndex < elements.length - 1) {
        // Swap current element with the one below
        const newElements = [...elements];
        [newElements[currentIndex], newElements[currentIndex + 1]] = [
          newElements[currentIndex + 1],
          newElements[currentIndex],
        ];
        setElements(newElements);
      }
    }
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

  const handleSizeChange = (selectedOption) => {
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

  const handleTextChange = () => {
    const updatedElements = elements.map((element) => {
      if (element.id === selectedId) {
        return {
          ...element,
          data: {
            ...element.data,
            props: {
              ...element.data.props,
              children: editableText,
            },
          },
        };
      }
      // console.log(editableText);
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
      style={{ background: "gray", width: "300px", height: "5px" }}
    ></canvas>,
  ];

  const textCanvas = [
    <p
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setEditableText(e.target.innerText)}
      onChange={handleTextChange}
      style={{ color: "black" }}
    >
      Add a text
    </p>,
    <p
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setEditableText(e.target.innerText)}
      onChange={handleTextChange}
      className="font-bold"
      style={{ color: "black" }}
    >
      Add a bold text
    </p>,
  ];

  const framesCanvas = [
    <canvas
      className="cursor-pointer"
      style={{ width: "150px", height: "150px", border: "2px solid black" }}
    ></canvas>,
  ];

  // console.log(elements[0].data.props.children);
  // console.log(elements[0].type); tag type like p,div,img
  // console.log(elements);

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
        className="ml-20 p-2 shadow-sm overflow-scroll"
      >
        <div className="text-black">
          <button onClick={toggleDrawerClose}>close</button>
          {mode === "text" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="flex flex-col justify-center items-center text-6xl w-full bg-gray-100 hover:bg-gray-200 rounded cursor-pointer py-1.5 px-2"
                  onClick={() => handleGetElements(textCanvas[0])}
                >
                  A <br /> <span className="text-sm">Normal</span>
                </div>
                <div
                  className="flex flex-col justify-center items-center text-6xl w-full bg-gray-100 hover:bg-gray-200 rounded cursor-pointer py-1.5 px-2"
                  onClick={() => handleGetElements(textCanvas[1])}
                >
                  A <br /> <span className="text-sm">Bold</span>
                </div>
              </div>
            </>
          )}
          {mode === "element" && (
            <>
              <div className="grid grid-cols-2 items-center gap-4 ">
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
                  className="w-full h-[5px] bg-gray-300 shadow-sm  cursor-pointer"
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
          {mode === "photo" && (
            <>
              {" "}
              <TabComponent />{" "}
            </>
          )}
          {mode === "frames" && (
            <>
              {" "}
              <div className="grid grid-cols-2 items-center gap-4 ">
                <canvas
                  onClick={() => handleGetElements(framesCanvas[0])}
                  className="w-[150px] h-[150px]  cursor-pointer border-2 border-black"
                ></canvas>
              </div>
            </>
          )}
          {mode === "templates" && <>templates</>}
        </div>
      </Drawer>

      <div className="flex justify-center items-center bg-gray-300 w-full h-[100vh]">
        <nav className="fixed left-0 bg-slate-800 w-20 h-full overflow-hidden">
          <ul className="flex flex-col justify-center items-center gap-4 text-white">
            <li
              className="text-center cursor-pointer hover:bg-white hover:text-black w-full py-1.5 px-3 "
              onClick={() => handleModeChange("text")}
            >
              <i className="fa-solid fa-font fa-lg" />
              <br />
              <spna className="text-xs">Text</spna>
            </li>
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
              options={SizeOptions}
              defaultValue={SizeOptions.find((option) => option.value === size)}
              onChange={handleSizeChange}
              className="z-50 "
            />
          </ul>
        </nav>

        <main className="bg-white w-[80%] h-[80%] overflow-hidden">
          {elements && elements.length > 0 ? (
            elements.map((canva, index) => (
              <ContextMenuTrigger id={canva.id}>
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
                    className=" hover:border-2 border-blue-600 text-black cursor-pointer p-2"
                    onClick={() => {
                      handleSetId(canva.id, index);
                      setSelected(true);
                    }}
                    data-tooltip-id={"id"}
                    data-tooltip-content={`X:${canva.positionX || 0}, Y:${
                      canva.positionY || 0
                    } `}
                  >
                    {canva.data}
                  </div>
                  <ContextMenu
                    id={canva.id}
                    className="flex flex-col gap-2 bg-black text-white rounded-md shadow cursor-default py-1"
                  >
                    <MenuItem className="flex items-center gap-2 hover:bg-blue-500 w-[180px] px-3">
                      <i className="fa-solid fa-paint-roller" /> Copy style
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleDuplicateElement(
                          canva.data,
                          canva.positionX,
                          canva.positionY
                        )
                      }
                      className="flex items-center gap-2 hover:bg-blue-500 w-[180px] px-3"
                    >
                      <i className="fa-solid fa-clone" /> Duplicate
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleChangeIndex("up")}
                      className="flex items-center gap-2 hover:bg-blue-500 w-[180px] px-3"
                    >
                      <i className="fa-solid fa-arrow-up-from-bracket" /> Bring
                      forward
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleChangeIndex("down")}
                      className="flex items-center gap-2 hover:bg-blue-500 w-[180px] px-3"
                    >
                      <i className="fa-solid fa-arrow-up-from-bracket rotate-180" />{" "}
                      Send backward
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDeleteElement(canva.id)}
                      className="flex items-center gap-2 hover:bg-blue-500 w-[180px]  px-3"
                    >
                      <i className="fa-solid fa-trash" /> Delete
                    </MenuItem>
                  </ContextMenu>
                </div>
              </ContextMenuTrigger>
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
