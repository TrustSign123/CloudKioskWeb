import React from "react";
import { Link } from "react-router-dom";

function CreateKiosk() {
  return (
    <>
      <div className="flex flex-col justify-between items-start gap-5 dark:text-white p-5">
        <div className="flex flex-row items-center gap-5 text-xl">
          <Link to={"/dash"}>
            {" "}
            <i className="fa-solid fa-xmark hover:bg-gray-700 px-1 rounded-full cursor-pointer" />
          </Link>
          <h3> Create a kiosk </h3>
        </div>
        <form>
          <div className="mb-4 flex flex-row items-center gap-3">
            <h3 className="text-4xl">Let's start with a name for your kiosk</h3>
            <span className="text-xs border-2 rounded-full py-1 px-2">
              <i className="fa-solid fa-question" />
            </span>
          </div>
          <input
            className="w-full bg-transparent text-2xl border-b py-2 mb-4"
            type="text"
            placeholder="Enter your kiosk name"
          />
          <input
            className="w-full bg-transparent text-2xl border-b py-2 mb-5"
            type="text"
            placeholder="Enter your kiosk code"
          />
          <button className="flex justify-center items-center text-white text-sm bg-blue-600 hover:bg-blue-700 py-2.5 px-5 rounded">
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateKiosk;
