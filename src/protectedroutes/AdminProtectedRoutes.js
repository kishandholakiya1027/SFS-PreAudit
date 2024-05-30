import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProtectedRoutes(props) {
  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      navigate("/login");
    }
  }, [accessToken, refreshToken, navigate]);

  return props.children;
}

export default AdminProtectedRoutes;
