import React from "react";
import loader from "../assets/images/loader.svg";

function Loader() {
  return (
    <div className="fixed z-50 h-screen right-0 w-1/2 flex items-center justify-center">
      <img src={loader} className=" h-16 w-16" alt="loader" />
    </div>
  );
}

export default Loader;
