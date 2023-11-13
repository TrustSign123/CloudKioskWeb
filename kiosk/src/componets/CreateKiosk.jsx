import React, { useState, useContext, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";

function CreateKiosk() {
  const { createKiosk, loading } = useContext(KioskContext);
  const [newKioskName, setNewKisokName] = useState("");
  const [newKioskCode, setNewKisokCode] = useState("");

  function handleSaveClick(e) {
    e.preventDefault();
    createKiosk(newKioskName, newKioskCode);
  }
  return (
    <>
      <Tooltip id="create-tip" place="right" />
      <div className="flex flex-col justify-between items-start gap-5 dark:text-white p-5">
        <div className="flex flex-row items-center gap-5 text-xl">
          <Link to={"/dash"}>
            {" "}
            <i className="fa-solid fa-xmark hover:bg-gray-700 px-1 rounded-full cursor-pointer" />
          </Link>
          <h3> Create a kiosk </h3>
        </div>
        <form onSubmit={handleSaveClick}>
          <div className="mb-4 flex flex-row items-center gap-3">
            <h3 className="text-4xl">Let's start with a name for your kiosk</h3>
            <span
              className="scale-75 text-xs border-2 rounded-full py-1 px-2"
              data-tooltip-id="create-tip"
              data-tooltip-content="A Cloud Kiosk project is a Cloud project. "
            >
              <i className="fa-solid fa-question" />
            </span>
          </div>
          <input
            className="w-full bg-transparent text-2xl border-b py-2 mb-4"
            type="text"
            value={newKioskName}
            onChange={(e) => setNewKisokName(e.target.value)}
            placeholder={newKioskName || "Enter your kiosk name"}
            required={true}
          />
          <input
            className="w-full bg-transparent text-2xl border-b py-2 mb-5"
            type="text"
            value={newKioskCode}
            onChange={(e) => setNewKisokCode(e.target.value)}
            placeholder={newKioskCode || "Enter your kiosk code"}
            required={true}
          />
          <button
            type="submit"
            className="flex justify-center items-center text-white text-sm bg-blue-600 hover:bg-blue-700 py-2.5 px-5 rounded"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateKiosk;
