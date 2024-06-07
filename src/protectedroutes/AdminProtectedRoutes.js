import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminProtectedRoutes(props) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const admin = localStorage.getItem("admin");
  const cookieValue = Cookies.get("expire");

  useEffect(() => {
    if (!cookieValue) {
      localStorage.clear();
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!accessToken || !refreshToken || !admin) {
      navigate("/login");
      localStorage.clear();
    }
  }, [accessToken, refreshToken, admin]);

  return props.children;
}

export default AdminProtectedRoutes;
