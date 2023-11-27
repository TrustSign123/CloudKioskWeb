import React, { useState } from "react";

function Overview(props) {
  const { userStorage, userCluster, storage, cluster } = props;

  // Function to extract numeric value from a string with units (e.g., "84.98 MB")
  const extractNumericValue = (str) => {
    const match = str.match(/(\d+(\.\d+)?)\s*(\w*)/);
    if (match) {
      const numericValue = parseFloat(match[1]);
      const unit = match[3].toLowerCase(); // Extracted unit (e.g., "MB")

      // Convert to bytes for consistent comparison
      switch (unit) {
        case "kb":
          return numericValue * 1024;
        case "mb":
          return numericValue * 1024 * 1024;
        case "gb":
          return numericValue * 1024 * 1024 * 1024;
        case "tb":
          return numericValue * 1024 * 1024 * 1024 * 1024;
        default:
          return numericValue;
      }
    }
    return NaN; // Return NaN if no numeric value is found
  };

  // Parse numeric values
  const numericUserStorage = extractNumericValue(userStorage);
  const numericStorage = extractNumericValue(storage);

  // Check if numeric values are valid
  if (
    isNaN(numericUserStorage) ||
    isNaN(numericStorage) ||
    numericStorage === 0
  ) {
    console.error("Invalid storage values or division by zero.");
    return null;
  }

  // Calculate the percentage of storage used
  const percentageUsed = (numericUserStorage / numericStorage) * 100;
  const percentageUsedCluser = (userCluster / cluster) * 100;

  // Determine the color based on the percentage used
  let barColor;
  if (percentageUsed < 50) {
    barColor = "bg-green-500";
  } else if (percentageUsed < 80) {
    barColor = "bg-yellow-500";
  } else {
    barColor = "bg-red-500";
  }

  let barColorCluster;
  if (percentageUsedCluser < 50) {
    barColorCluster = "bg-green-500";
  } else if (percentageUsedCluser < 80) {
    barColorCluster = "bg-yellow-500";
  } else {
    barColorCluster = "bg-red-500";
  }

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
                  {userStorage} of {storage} used
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div
                  className={`rounded-full h-2.5 ${barColor}`}
                  style={{ width: `${percentageUsed}%` }}
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
                  {userCluster} of {cluster} used
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div
                  className={`${barColorCluster} h-2.5 rounded-full`}
                  style={{ width: `${percentageUsedCluser}%` }}
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
