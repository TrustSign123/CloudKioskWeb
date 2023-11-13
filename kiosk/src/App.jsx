import { useState } from "react";
import KioskState from "./context/kiosk/KioskState";
import { Route, Routes } from "react-router-dom";
import Home from "./componets/Home";
import CreateUser from "./componets/CreateUser";
import Navbar from "./componets/Navbar";
import LoginUser from "./componets/LoginUser";
import Dashboard from "./componets/Dashboard";
import CreateKiosk from "./componets/CreateKiosk";
import Overview from "./componets/Overview";
import Subscription from "./componets/Subscription";

function App() {
  return (
    <>
      <KioskState>
        <>
          <Routes>
            {" "}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<CreateUser />} />
            <Route exact path="/sub" element={<Subscription />} />
            <Route exact path="/login" element={<LoginUser />} />
            <Route exact path="/dash" element={<Dashboard />} />
            <Route exact path="/over" element={<Overview />} />
            <Route exact path="/create-kiosk" element={<CreateKiosk />} />
          </Routes>
        </>
      </KioskState>
    </>
  );
}

export default App;
