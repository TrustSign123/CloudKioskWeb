import React from "react";

function Notification() {
  const [notiHide, setNotiHide] = React.useState(false);
  return (
    <>
      {!notiHide && (
        <div
          className="fixed top-0 flex justify-center items-center w-full h-20 bg-blue-50 z-50"
          onClick={() => setNotiHide(true)}
        >
          <h3 className="text-black text-xl ">
            🌟 Welcome to TrustSign CMS Beta Version - 1.1.0 🌟
          </h3>
        </div>
      )}
    </>
  );
}

export default Notification;
