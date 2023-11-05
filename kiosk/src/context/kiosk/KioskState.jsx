import KioskContext from "./KioskContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Kioskstate = (props) => {
  const host = "http://localhost:5000/api/";

  const [kiosks, setKiosks] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <KioskContext.Provider value={{}}>{props.children}</KioskContext.Provider>
  );
};

export default Kioskstate;
