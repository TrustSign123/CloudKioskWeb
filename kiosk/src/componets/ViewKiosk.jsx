import React, { useState, useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style/view.css";
import { Carousel } from "react-responsive-carousel";
import KioskContext from "../context/kiosk/kioskContext";
import LoadingScreen from "../componets/LoadingScreen";

function ViewKiosk(props) {
  const { getKioskContent, kioskCode } = props;
  const {
    addKioskContent,
    editKioskContent,
    deleteKioskContent,
    loading,
    uploadStatus,
  } = useContext(KioskContext);

  return (
    <>
      <div className="flex items-start gap-2 py-4">
        <div className="view-layout bg-slate-100  p-5 rounded overflow-scroll">
          {getKioskContent.map((content, index) => (
            <div
              className="hover:outline outline-blue-600 dark:outline-white rounded-lg cursor-pointer"
              key={content._id}
            >
              <img src={content.KioskContent} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewKiosk;
