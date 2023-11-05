import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"create"}>SignUp</Link>
    </>
  );
}

export default Navbar;
