import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";

function Home() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center mt-5">
        <div className="text-center">
          <h3 className="text-2xl font-thin mb-4">Cloud Kiosk</h3>
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-400 text-6xl font-bold mb-5">
            Build interactive kiosk <br /> that run anywhere
          </h3>
          <Link to={"/login"}>
            <button className="text-white text-xl bg-blue-600 py-1.5 px-4 rounded-full mb-5  active:scale-75 duration-150">
              Get Started
            </button>
          </Link>
          <h3 className="text-gray-400">
            Empower Your Space: Cloud Kiosk Solutions for Modern Interactivity.
          </h3>
        </div>
      </main>
    </>
  );
}

export default Home;
