import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetReviewe } from "../store/action/SendRevieweAction";
import Sidebar from "../components/common/Sidebar";
import { getCurrentStep } from "../store/action/CurrentStep";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/common/AdminHeader";
import { GetUser } from "../store/action/registerAction";

let recall = false;

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.UserReducer);
  const { reviewer } = useSelector((state) => state.sendRevieweReducer);
  const { currentStep } = useSelector((state) => state.currentStepDataReducer);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const currentUser = useMemo(() => {
    if (user.length && id) {
      return user.find((item) => item.id === +id);
    }
  }, [user, id]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getCurrentStep(currentUser?.id));
    }
  }, [currentUser, dispatch]);

  // useEffect(() => {
  //   if (reviewer?.length === 0 && !recall) {
  //     dispatch(GetReviewe());
  //     recall = true;
  //   }
  // }, [reviewer, dispatch]);

  useEffect(() => {
    dispatch(GetUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getCurrentStep(currentUser.id));
    }
  }, [currentUser, dispatch, user]);

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
        <Sidebar steps={currentStep.isStep} />
      </aside>
      <main className="w-full h-full overflow-hidden">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
