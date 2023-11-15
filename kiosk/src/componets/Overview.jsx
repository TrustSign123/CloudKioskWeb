import React, { useState } from "react";

function Overview(props) {
  const { storage, cluster } = props;
  return (
    <>
      <div
        id="progress-modal"
        tabindex="-1"
        aria-hidden="true"
        className="flex justify-start items-center w-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full dark:bg-slate-900">
          <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
            <div className="p-4 md:p-5">
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                Approaching Full Capacity
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Choosing the right server storage solution is essential for
                maintaining data integrity.
              </p>
              <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
                <span className="text-base font-normal">My storage</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  440GB of {storage} used
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div
                  className="bg-orange-500 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>

              <div className="flex items-center mt-6 space-x-2 rtl:space-x-reverse">
                <button
                  data-modal-hide="progress-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buy More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative p-4 w-full max-w-md max-h-full dark:bg-slate-900">
          <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
            <div className="p-4 md:p-5">
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                Approaching Full Capacity
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Choosing the right server storage solution is essential for
                maintaining data integrity.
              </p>
              <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
                <span className="text-base font-normal">My clusters</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  75 of {cluster} used
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div
                  className="bg-orange-300 h-2.5 rounded-full"
                  style={{ width: "55%" }}
                ></div>
              </div>

              <div className="flex items-center mt-6 space-x-2 rtl:space-x-reverse">
                <button
                  data-modal-hide="progress-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buy More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
