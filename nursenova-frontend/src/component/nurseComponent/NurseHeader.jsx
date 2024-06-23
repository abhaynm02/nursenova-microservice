import React from "react";
import Logo from "../Logo";
import NurseNav from "./NurseNav";


const NurseHeader = () => {
  return (
    <header className="bg-white sticky top-0 z-30 w-full flex items-center justify-between border-b border-gray-300 p-3 shadow-md">
      <Logo />
      <NurseNav></NurseNav>
    </header>
  );
};

export default NurseHeader;