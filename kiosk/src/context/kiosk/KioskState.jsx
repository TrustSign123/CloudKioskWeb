import KioskContext from "./kioskContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Kioskstate = (props) => {
  const host = "http://localhost:5000/api/";
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [kiosks, setKiosks] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  let navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setLoading(false);
    setKiosks([]), setUserProfile([]);
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setLoading(false);
        // Save the auth token and redirect
        localStorage.setItem(`token`, json.authtoken);
        navigate("/dash");
      } else {
        setLoading(false);
        console.log("error");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const profile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();
      setUserProfile(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const fetchKiosk = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}kioskMachine/get-kiosk`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();
      setKiosks(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const createKiosk = async (kioskName, kioskCode) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}kioskMachine/kiosk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          kioskName,
          kioskCode,
        }),
      });

      const json = await response.json();
      navigate("/dash");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const editKiosk = async (kioskName, id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}kioskMachine/kiosk/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          kioskName,
        }),
      });

      const json = await response.json();
      let newkiosk = JSON.parse(JSON.stringify(kiosks));
      // Logic to edit in client
      for (let index = 0; index < newkiosk.length; index++) {
        const element = newkiosk[index];
        if (element._id === id) {
          newkiosk[index].kioskName = kioskName;
          break;
        }
      }
      setKiosks(newkiosk);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const deleteKiosk = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}kioskMachine/kiosk/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    profile();
    fetchKiosk();
  }, []);
  return (
    <KioskContext.Provider
      value={{
        loading,
        userProfile,
        kiosks,
        logout,
        register,
        login,
        profile,
        fetchKiosk,
        createKiosk,
        editKiosk,
        deleteKiosk,
      }}
    >
      {props.children}
    </KioskContext.Provider>
  );
};

export default Kioskstate;
