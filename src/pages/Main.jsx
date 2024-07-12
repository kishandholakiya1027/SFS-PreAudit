import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/common/AdminHeader";

const Main = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

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
        <AdminHeader
          notification={notification}
          setNotification={setNotification}
        />
        <div className="pt-[57px]">
          <Outlet context={{ notification, setNotification }} />
        </div>
      </main>
    </div>
  );
};

export default Main;
