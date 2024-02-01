import React, { useState, useContext, useEffect } from "react";
import logo from "./asstes/logo.png";
import KioskContext from "../context/kiosk/kioskContext";
import { Link } from "react-router-dom";
import Img from "../componets/asstes/wall.svg";
import Img2 from "../componets/asstes/logo.png";
function LoginUser() {
  const { login, loading } = useContext(KioskContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isPassword, setIsPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(credentials.email, credentials.password);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = () => {
    setIsPassword(!isPassword);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row bg-white min-h-screen ">
        <div
          className="flex flex-col justify-center  lg:w-2/5 "
          style={{ width: "95%" }}
        >
          <div className="mx-auto w-full max-w-md p-4 pt-12 lg:p-8">
            <div>
              <div className="flex flex-col-reverse sm:flex-row justify-between items-center">
                <img src={Img2} className="w-25  " alt="" />
                <div className="flex space-x-2 items-baseline">
                  <p className="text-sm text-black">Don't have an account?</p>
                  <Link to={"/create"}>
                    <p className="font-bold text-purple-600">Log In</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm"></p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-6 grid gap-2">
                <div className="">
                  <label
                    for="6eff123f-83ed-468f-a057-cc2f427fb509"
                    className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2 text-left"
                  >
                    email
                  </label>
                  <div
                    className='relative bg-white border rounded h-12 text-gray-700 border-gray-300 focus-within:border-blue-500  [&amp;[aria-disabled="true"]]:text-gray-500 [&amp;[aria-disabled="true"]]:border-gray-500 [&amp;[aria-disabled="true"]]:bg-gray-100  [&amp;[aria-readonly="true"]]:text-gray-700 [&amp;[aria-readonly="true"]]:border-gray-100 [&amp;[aria-readonly="true"]]:bg-gray-100  [&amp;[aria-invalid="true"]]:text-gray-700 [&amp;[aria-invalid="true"]]:border-red-500  [&amp;[data-success="true"]]:text-green-600 [&amp;[data-success="true"]]:border-green-600 '
                    aria-invalid="true"
                    data-success="false"
                  >
                    <input
                      id="6eff123f-83ed-468f-a057-cc2f427fb509"
                      type="text"
                      name="email"
                      placeholder="Type email"
                      autocomplete="username"
                      className=" h-full w-full bg-transparent px-2 align-middle outline-none"
                      value={credentials.email}
                      onChange={onChange}
                    />
                    <div className="flex items-center pr-2 absolute right-0 h-full top-0 bottom-0 space-x-2"></div>
                  </div>
                </div>
                <div className="">
                  <label
                    for="6b8fc895-f761-4b73-a911-8fe0e365cb60"
                    className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2 text-left          "
                  >
                    password
                  </label>
                  <div
                    className=' relative bg-white border rounded h-12  text-gray-700 border-gray-300 focus-within:border-blue-500  [&amp;[aria-disabled="true"]]:text-gray-500 [&amp;[aria-disabled="true"]]:border-gray-500 [&amp;[aria-disabled="true"]]:bg-gray-100  [&amp;[aria-readonly="true"]]:text-gray-700 [&amp;[aria-readonly="true"]]:border-gray-100 [&amp;[aria-readonly="true"]]:bg-gray-100  [&amp;[aria-invalid="true"]]:text-gray-700 [&amp;[aria-invalid="true"]]:border-red-500  [&amp;[data-success="true"]]:text-green-600 [&amp;[data-success="true"]]:border-green-600          '
                    aria-invalid="false"
                    data-success="false"
                  >
                    <input
                      id="6b8fc895-f761-4b73-a911-8fe0e365cb60"
                      type={isPassword ? "text" : "password"}
                      name="password"
                      placeholder="Type password"
                      autocomplete="new-password"
                      className=" h-full w-full bg-transparent px-2 align-middle outline-none"
                      value={credentials.password}
                      onChange={onChange}
                    />
                    <div
                      onClick={handlePasswordChange}
                      className="flex items-center pr-2 absolute right-0 h-full top-0 bottom-0 space-x-2          "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 20"
                        role="switch"
                        className={
                          isPassword
                            ? "cursor-pointer stroke-current text-gray-300"
                            : "cursor-pointer stroke-current text-gray-500 "
                        }
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M2.781 18.75l18.75-18M8.962 16.801c.983.305 2.007.457 3.037.45 4.1.068 8.258-2.814 10.824-5.638.275-.305.427-.702.427-1.113 0-.411-.152-.808-.427-1.113-.93-1.02-1.96-1.943-3.074-2.757M14.412 4.032c-.79-.196-1.6-.29-2.414-.282-4.03-.067-8.2 2.752-10.82 5.635-.276.306-.428.702-.428 1.113 0 .411.152.808.427 1.113.797.873 1.667 1.676 2.6 2.4"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M8.248 10.5c0-.492.097-.98.286-1.435.188-.455.464-.869.813-1.217.348-.348.761-.624 1.216-.813.455-.188.943-.285 1.435-.285M15.748 10.5c0 .492-.096.98-.285 1.434-.188.456-.464.87-.813 1.218-.348.348-.761.624-1.216.813-.455.188-.943.285-1.435.285"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className=' [&amp;[data-state="error"]]:text-red-500 mt-1 text-sm text-gray-700             '>
                    &nbsp;
                  </div>
                </div>
                <div>
                  <span className="block w-full rounded-md ">
                    <button
                      type="submit"
                      data-testid="signup-button"
                      className="w-full sm:w-auto inline-block rounded py-3 px-4 font-bold focus:shadow-lg focus:outline-none text-white bg-blue-700 hover:bg-blue-500"
                    >
                      <div className="flex-cols flex h-full items-center justify-center ">
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-8 h-8 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        ) : (
                          "Log in"
                        )}
                      </div>
                    </button>
                  </span>
                  <div className="font-bold text-red-600">&nbsp;</div>
                </div>
                <p className="text-sm font-bold text-black">
                  By registering, I agree to TrustSign&nbsp;
                  <a
                    href="https://www.fugo.ai/terms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Terms of Service
                  </a>
                  &nbsp;and&nbsp;
                  <a
                    href="https://www.fugo.ai/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* changes */}
        <div className="bg-cover h-full w-full flex justify-center items-center">
          <img className="h-3/4 w-3/4" src={Img} alt=" cou" />
        </div>
      </div>
    </>
  );
}

export default LoginUser;
