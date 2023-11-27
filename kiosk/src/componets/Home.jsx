import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center mt-20">
        <div className="text-center">
          <h3 className="text-2xl font-thin mb-4">Cloud Kiosk</h3>
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-400 text-6xl font-bold">
            Build interactive kiosk <br/> that run anywhere
          </h3>
        </div>
      </main>
      <div className="flex gap-4">
        {" "}
        <Link to={"/login"}>
          <button className="bg-blue-600 py-2 px-5 rounded">login</button>
        </Link>
        <Link to={"/create"}>
          <button className="bg-blue-600 py-2 px-5 rounded">create</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
