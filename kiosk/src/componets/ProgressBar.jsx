import React from "react";
import progressAni from "./asstes/progress.gif";
function ProgressBar(props) {
  const { progress } = props;
  return (
    <>
      {" "}
      <div
        id="popup-modal"
        tabindex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full">
          <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
            <div className="p-4 md:p-5 text-center">
              {" "}
              <label
                htmlFor="input-img"
                className="grag-area flex flex-col items-center justify-center w-full rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center gap-10 pt-5 pb-6 overflow-hidden">
                  <img src={progressAni} />
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                      style={{
                        width: `${progress * 10}px`,
                        transition: "0.4s",
                      }}
                    >
                      {progress}%
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
