import { useState } from "react";
import KioskState from "./context/kiosk/KioskState";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./componets/Home";
import CreateUser from "./componets/CreateUser";
import LoginUser from "./componets/LoginUser";
import Screens from "./componets/Screens";
import CreateKiosk from "./componets/CreateKiosk";
import Overview from "./componets/Overview";
import Subscription from "./componets/Subscription";
import ViewKiosk from "./componets/ViewKiosk";
import Admin from "./componets/Admin";
import MyProfile from "./componets/MyProfile";
import AccountSettings from "./componets/AccountSettings";
import Test from "./componets/Test";
import Media from "./componets/Media";

function App() {
  return (
    <>
      <KioskState>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<CreateUser />} />
            <Route exact path="/profile" element={<MyProfile />} />
            <Route exact path="/settings" element={<AccountSettings />} />
            <Route exact path="/sub" element={<Subscription />} />
            <Route exact path="/login" element={<LoginUser />} />
            <Route exact path="/screens" element={<Screens />} />
            <Route exact path="/over" element={<Overview />} />
            <Route exact path="/media" element={<Media/>} />
            <Route exact path="/create-kiosk" element={<CreateKiosk />} />
            <Route exact path="/view" element={<ViewKiosk />} />
            <Route exact path="/admin" element={<Admin />} />

            <Route exact path="/test" element={<Test />} />
          </Routes>
        </>
      </KioskState>
    </>
  );
}

export default App;
