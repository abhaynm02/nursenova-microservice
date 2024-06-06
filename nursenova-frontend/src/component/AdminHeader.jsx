import React from "react";
import Logo from "./Logo";
import AdminNav from "./AdminNav";

const AdminHeader = () => {
  return (
    <header className="bg-white sticky top-0 z-30 w-full flex items-center justify-between border-b border-gray-300 p-3 shadow-md">
      <Logo />
      <AdminNav />
    </header>
  );
};

export default AdminHeader;