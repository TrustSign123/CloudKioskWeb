import { useState } from "react";
import KioskState from "./context/kiosk/KioskState";
import { Route, Routes } from "react-router-dom";
import Home from "./componets/Home";
import CreateUser from "./componets/CreateUser";
import Navbar from "./componets/Navbar";

function App() {
  return (
    <>
      <KioskState>
        <>
          <Navbar />
          <Routes>
            {" "}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<CreateUser />} />
          </Routes>
        </>
      </KioskState>
    </>
  );
}

export default App;
