import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-20 w-full flex items-center justify-between border-b border-gray-300 p-3 shadow-md">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
