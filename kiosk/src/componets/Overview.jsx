import React from "react";

function Overview() {
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
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
              </svg>
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
                  440GB of 500 GB used
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
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
              </svg>
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
                  75 of 120 used
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
