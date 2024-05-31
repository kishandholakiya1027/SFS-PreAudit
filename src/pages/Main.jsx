import React, { useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/common/AdminHeader";

const Main = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      navigate(`/login`);
    } else if (location.pathname === "/") {
      navigate(`/pre_audit/dashboard`);
    }
  }, [accessToken, refreshToken, navigate]);

  return (
    <div className="flex h-full">
      <aside className="h-screen sticky top-0">
        <Sidebar />
      </aside>
      <main className="w-full h-full overflow-hidden">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
