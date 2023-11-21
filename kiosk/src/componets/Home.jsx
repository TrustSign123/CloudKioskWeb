import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex gap-4">
        {" "}
        <Link to={"/login"}>
          <button className="bg-blue-600 py-2 px-5 rounded">login</button>
        </Link>
        <Link to={"/create"}>
          <button className="bg-blue-600 py-2 px-5 rounded">create</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
