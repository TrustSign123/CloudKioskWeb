import React, { useState, useContext, useRef } from "react";
import KioskContext from "../context/kiosk/kioskContext";

function CreateKiosk() {
  const { createKiosk, loading } = useContext(KioskContext);

  const pinInputRefs = useRef(
    Array(8)
      .fill(null)
      .map(() => React.createRef())
  );

  const [pinInputs, setPinInputs] = useState(Array(8).fill(""));

  function handlePinInputChange(index, value) {
    const newPinInputs = [...pinInputs];
    newPinInputs[index] = value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Allow numbers and capitalize alphabet characters
    setPinInputs(newPinInputs);

    // Move to the next input if the current one is filled and a character is entered
    if (value && index < pinInputs.length - 1) {
      pinInputRefs.current[index + 1].focus();
    }
  }

  function handleSaveClick(e) {
    e.preventDefault();
    const pin = pinInputs.join("");
    createKiosk(pin);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 text-black bg-white p-5 h-[100vh]">
        <form onSubmit={handleSaveClick}>
          <div className="mb-4 flex flex-row items-center gap-3">
            <h3 className="text-4xl">Let's pair your screen</h3>
          </div>
          <h3 className="text-xl font-semibold mb-2">Enter your PIN:</h3>
          <div className="flex gap-1">
            {pinInputs.map((value, index) => (
              <input
                key={index}
                ref={(el) => (pinInputRefs.current[index] = el)}
                className="w-[50px] bg-transparent text-2xl border-2 border-black rounded text-center py-2 mb-5"
                type="text"
                value={value}
                onChange={(e) => handlePinInputChange(index, e.target.value)}
                maxLength={1}
                required={true}
              />
            ))}
          </div>
          <button
            type="submit"
            className="flex justify-center items-center text-white text-sm bg-blue-600 hover:bg-blue-700 py-2.5 px-5 rounded"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateKiosk;
