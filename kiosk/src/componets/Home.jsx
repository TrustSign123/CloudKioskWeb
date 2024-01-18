import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";
import "../banners/banner";
import { Banner } from "../banners/banner";
import { Projects } from "../banners/footer";
const words = ["Digital", "Hotel", "Restaurant", "Healthcare", "Retail"];

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="img-bg">
      <Projects />
      </div>
    </>
  );
}

export default Home;
