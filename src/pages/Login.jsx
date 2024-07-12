import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../store/action/AdminActions/memberAction";
import LoginLogo from "../assets/images/LoginLogo.svg";
import LoginBanner from "../assets/images/LoginBanner.svg";
import { emailRegx, numberRegx } from "../utils/constant";
import { LoaderIcon } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!value) {
        setUserError((prev) => ({ ...prev, [name]: "Please enter email" }));
      } else if (!value.match(emailRegx)) {
        setUserError((prev) => ({
          ...prev,
          [name]: "Please enter valid email",
        }));
      } else {
        setUserError((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "password") {
      if (!value) {
        setUserError((prev) => ({ ...prev, [name]: "Please enter password" }));
      } else {
        setUserError((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleSubmit = async () => {
    if (admin.email || admin.password) {
      if (admin.email) {
        setUserError((prev) => ({ ...prev, email: "" }));
      }
      if (admin.password) {
        setUserError((prev) => ({ ...prev, password: "" }));
      }
      if (admin.email && admin.password) {
        try {
          setLoading(true);
          dispatch(adminLogin(admin, navigate, setLoading));
        } catch (error) {
          console.log("Error:", error);
        }
      } else {
        if (!admin.email) {
          setUserError((prev) => ({ ...prev, email: "Please enter email" }));
        } else if (!admin.email.match(emailRegx)) {
          setUserError((prev) => ({
            ...prev,
            email: "Please enter valid email",
          }));
        }

        if (!admin.password) {
          setUserError((prev) => ({
            ...prev,
            password: "Please enter password",
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate("/pre_audit/dashboard");
    }
  }, [accessToken, refreshToken]);
  return (
    <section className="bg-slate-200">
      <div className="h-screen w-full flex items-center justify-center mx-auto">
        <div className="bg-white dark:bg-gray-900 w-full min-h-[90vh] h-auto mx-auto shadow-md overflow-hidden overflow-y-auto">
          <div className="flex items-center justify-center py-8 mx-auto lg:py-0">
            <div className="w-1/2 bg-[#106FEC] h-screen flex items-center justify-center 2xl:pt-[106px] pt-[206px] pb-[28px] 2xl:px-0 px-3">
              <div className="flex flex-col justify-between 2xl:h-[calc(100vh-134px)] h-[calc(100vh-240px)]">
                <div>
                  <div className="mb-4 text-left">
                    <img
                      src={LoginLogo}
                      alt="LoginImg"
                      className="2xl:w-[99px] w-[80px]"
                    />
                  </div>
                  <h2 className="2xl:text-[30px] text-[24px] font-[400] leading-[35px] text-[#fff] 2xl:mb-5 mb-2">
                    Delivering Quality
                  </h2>
                  <p className="2xl:text-[14px] text-[12px] leading-[20px] text-[#fff] max-w-[450px] font-[400] mb-12">
                    SFS is dedicated to bringing textile testing and our
                    expertise to those who need it the most. Let's work
                    together!
                  </p>
                  <img
                    src={LoginBanner}
                    alt="LoginBanner"
                    className="xl:h-auto h-[200px] 2xl:block 2xl:mx-0 flex mx-auto"
                  />
                </div>
                <div className="text-center text-white">
                  <p className="2xl:text-[14px] text-[12px] font-[400] leading-[17px] 2xl:mb-[6px] mb-0">
                    Questions?{" "}
                    <span className="2xl:font-[700] font-[600]">
                      support@sfs.com
                    </span>
                  </p>
                  <p className="2xl:text-[14px] text-[10px] font-[400] leading-[17px]">
                    SFS is one of the global leaders in auditing and testing for
                    filled textiles.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 relative h-screen flex items-center justify-center">
              <div>
                <h3 className="text-[18px] font-[500] text-left text-[#106FEC] leading-[21px] mb-[22px]">
                  Login in SFS
                </h3>
                <div className="mt-[22px] text-center relative z-50">
                  <div className="w-[420px] mx-auto relative">
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full py-[13px] font-[400] leading-[18px] px-5 text-[16px] text-[#565E60] bg-[#F5F7F9] rounded-[4px]"
                        placeholder="Enter Email"
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleChange(e)}
                        name="email"
                        id="email"
                        required
                      />
                    </div>
                    {userError.email && (
                      <p className="text-[10px] text-[#ff0000] pt-1 text-start">
                        {userError.email}
                      </p>
                    )}
                  </div>
                  <div className="w-[420px] mx-auto relative mt-5">
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full py-[13px] font-[400] leading-[18px] px-5 text-[16px] text-[#565E60] bg-[#F5F7F9] rounded-[4px]"
                        placeholder="Enter Password"
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleChange(e)}
                        name="password"
                        id="password"
                      />
                    </div>
                    {userError.password && (
                      <p className="text-[10px] text-[#ff0000] pt-1 text-start">
                        {userError.password}
                      </p>
                    )}
                  </div>
                  <div className="w-[420px] mx-auto">
                    <div className=" mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-[10px]">
                        <input type="checkbox" id="RememberMe" />
                        <label
                          htmlFor="RememberMe"
                          className="text-[16px] leading-[18px] font-[300]"
                        >
                          Remember me
                        </label>
                      </div>
                      <button className="text-[16px] leading-[19px] font-[400] cursor-pointer text-[#106FEC] hover:underline dark:text-blue-500">
                        Forgot Password?
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSubmit}
                      className={`w-full text-white bg-[#106FEC] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-[4px] text-[16px] px-5 py-[13px] font-[500] leading-[18px] text-center dark:[#013C76] dark:focus:ring-[#106FEC] my-[30px] flex items-center justify-center gap-3 ${
                        loading && "opacity-70"
                      }`}
                    >
                      {loading ? (
                        <span className="h-[18px] w-[18px] flex items-center justify-center">
                          <LoaderIcon className="!w-[18px] !h-[18px]" />
                        </span>
                      ) : (
                        "CONTINUE"
                      )}
                    </button>
                    {/* <span className="font-[600] leading-[19px] text-[16px] text-center">
                      OR
                    </span>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSubmit}
                      className={`w-full text-white bg-[#106FEC] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-[4px] text-[16px] px-5 py-[10px] font-[500] leading-[19px] text-center dark:[#013C76] dark:focus:ring-[#106FEC] my-[30px] flex items-center justify-center gap-3 ${
                        loading && "opacity-70"
                      }`}
                    >
                      {loading ? (
                        <span className="h-6 w-6 flex items-center justify-center">
                          <LoaderIcon className="!w-4 !h-4" />
                        </span>
                      ) : (
                        "CONTINUE"
                      )}
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
