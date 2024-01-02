import React, { useContext } from "react";
import { Link } from "react-router-dom";
import KioskContext from "../context/kiosk/kioskContext";

function MyProfile() {
  const { userProfile, loading } = useContext(KioskContext);

  return (
    <>
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className=" dark:bg-slate-900 shadow-2xl rounded-lg py-3 px-4">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                alt="John Doe"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl  font-medium leading-8">
                {userProfile.name}
              </h3>

              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{userProfile.email}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">+977 9955221114</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Subscription
                    </td>
                    <td className="px-2 py-2">
                      {userProfile.userSubscription[0].validityPlan} (₹{userProfile.userSubscription[0].price})
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center my-3">
                <Link
                  to={"/screens"}
                  className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium cursor-pointer"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
