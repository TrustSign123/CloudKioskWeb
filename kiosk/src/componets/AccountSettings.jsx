import React from "react";
import { Link } from "react-router-dom";

function AccountSettings() {
  return (
    <>
      <nav className="font-semibold text-sm text-slate-400 mb-4 overflow-scroll">
        <ul className="flex justify-start items-center gap-4 py-3 px-5 border-b border-slate-700">
          <Link to={"/dash"}>
            <li className="bg-slate-900 hover:bg-slate-950 cursor-pointer py-2 px-3 rounded">
              Dashboard
            </li>
          </Link>
          <li className="cursor-pointer">Account</li>
          <li className="cursor-pointer">Notifications</li>
          <li className="cursor-pointer">Billing</li>
        </ul>
      </nav>
      <main className="px-4">
        <div className="flex flex-col justify-around border-b border-slate-700 py-5">
          {/* Personal Information*/}
          <h3 className="font-semibold">Personal Information</h3>
          <div className="flex flex-col  items-center">
            <div className="flex flex-col justify-center items-center gap-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="rounded"
                width={"100px"}
              />
              <button className="bg-slate-900 hover:bg-slate-950 font-semibold py-1.5 px-2.5 rounded">
                Change avatar
              </button>
            </div>
            <div className=" grid grid-cols-1 gap-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block font-semibold leading-6 text-gray-200"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-200 bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block font-semibold leading-6 text-gray-200"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-200 bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block font-semibold leading-6 text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-200 bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex justify-around w-50 mt-6 ">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around border-b border-slate-700 py-5">
          {/* Change password*/}
          <h3 className="font-semibold">Change password</h3>
          <div className="flex flex-col  items-center">
            <div style={{ width: "400px" }}>
              <div className="sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="block font-semibold leading-6 text-gray-200"
                >
                  Current password
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="current-password"
                    id="current-password"
                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-200 bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 mt-4">
                <label
                  htmlFor="new-password"
                  className="block font-semibold leading-6 text-gray-200"
                >
                  New password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-200 bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 mt-4">
                <label
                  htmlFor="confirm-password"
                  className="block font-semibold leading-6 text-gray-200"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-200 bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex justify-around w-50 mt-6 ">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around border-b border-slate-700 py-5">
          {/* CDelete account */}
          <h3 className="font-semibold">Delete account</h3>
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            <div className="w-50">
            <h3 className="mb-4">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </h3>
            <button className="font-semibold text-white bg-rose-600 hover:bg-rose-500 py-1.5 px-2 rounded">
              Yes, delete my account
            </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AccountSettings;
