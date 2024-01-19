import React from "react";
import NavbarMain from "./NavbarMain";
import { Link } from "react-router-dom";

function Studio() {
  return (
    <>
      <NavbarMain />
      <div className="flex justify-center items-center gap-2 border-b-2 bg-white w-full h-20 px-5 pb-14 pt-20 mt-5">
        {/* <Link to={"/test"}>
        <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2.5 px-4">
          Create in Studio
        </button>
        </Link> */}
        <h3 className="text-black text-4xl font-bold ">Coming soon</h3>
      </div>
    </>
  );
}

export default Studio;
