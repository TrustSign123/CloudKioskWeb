import React, { useState, useEffect, useContext } from "react";
import KioskContext from "../context/kiosk/kioskContext";
import copy from "clipboard-copy";
import { Link } from "react-router-dom";

function Admin() {
  const { host } = useContext(KioskContext);
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState([]);
  const [copyCheck, setCopy] = useState(<i className="fa-solid fa-copy" />);
  const [loading, setLoading] = useState("Generate");

  const fetchOfflineKioskCode = async () => {
    setLoading("Loading...");
    try {
      setCopy(<i className="fa-solid fa-copy" />);
      const response = await fetch(`${host}offlineMode/offline-code`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch code");
      }

      const json = await response.json();
      setCode(json.generatedCode);
      setLoading("Generate");
    } catch (error) {
      setLoading("Generate");
      console.error("Error fetching code:", error.message);
    }
  };

  const fetchOfflineKioskCodes = async () => {
    try {
      const response = await fetch(`${host}offlineMode/offline-codes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch codes");
      }

      const json = await response.json();
      setCodes(json.codes);
    } catch (error) {
      console.error("Error fetching codes:", error.message);
    }
  };
  const deleteCode = async (id) => {
    try {
      const response = await fetch(`${host}offlineMode/offline-codes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete code");
      }
    } catch (error) {
      console.error("Error deleting code:", error.message);
    }
  };

  const handleCopy = () => {
    copy(code)
      .then(() => {
        setCopy(<i className="fa-solid fa-check-double" />);
        console.log("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };

  const handleDelete = (index) => {
    deleteCode(codes[index]._id);
  };

  useEffect(() => {
    fetchOfflineKioskCodes();
  }, [codes]);

  return (
    <>
      <Link to={"/screens"}>
        <button className="bg-rose-700 hover:bg-rose-800 text-white py-1 px-3">
          Back
        </button>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <div
          className="flex flex-col justify-center items-center gap-5"
          style={{ height: "100vh" }}
        >
          <div className="flex flex-row justify-center items-center gap-2">
            <p className=" border-2 border-rose-700 py-1 px-5 text-black">
              {code || "Code Generator"}
            </p>
            <button
              className="bg-rose-700 hover:bg-rose-800 text-white py-1 px-3"
              onClick={handleCopy}
            >
              {copyCheck}
            </button>
          </div>
          <button
            className="bg-rose-700 hover:bg-rose-800 text-white py-1"
            onClick={fetchOfflineKioskCode}
            style={{ paddingLeft: "100px", paddingRight: "100px" }}
          >
            {loading}
          </button>
        </div>
        <div className="">
          <table className="table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-12 py-3">Code</th>
                <th className="px-12 py-3">Status</th>
                <th className="px-12 py-3">Delete</th>
              </tr>
            </thead>
            {codes.map((offlinecode, index) => (
              <tbody key={offlinecode._id} className="">
                <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-2 px-5">{offlinecode.OfflineKioskCode}</td>
                  <td className="py-2 px-5">
                    {offlinecode.status ? "Active" : "Not Active"}
                  </td>
                  <td className="py-2 px-5">
                    <button
                      className="bg-rose-700 hover:bg-rose-800 text-white py-1 px-3"
                      onClick={() => handleDelete(index)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;
