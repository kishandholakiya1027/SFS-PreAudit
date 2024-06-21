import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetCountry } from "../../store/action/countryAction";
import {
  GetCertificationStatusById,
  GetOneClientInfo,
  GetPayerInfoById,
} from "../../store/action/manageAction";
import { LoaderIcon } from "react-hot-toast";
import QuertRaise from "../../components/common/QuertRaise";

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cName, setCname] = useState("");
  const [fdata, setFdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [standards, setStandards] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading2, setIsLoading2] = useState(true);
  const [processeUnit, setProcesseUnit] = useState([]);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const { country } = useSelector((state) => state.countryReducer);
  const { clientInfo, payer, data } = useSelector(
    (state) => state.manageUserReducer
  );

  useEffect(() => {
    if (clientInfo && country?.length > 0) {
      setFdata(clientInfo);
      setCname(
        country?.find((item) => item.name === clientInfo?.country)?.name
      );
    }
  }, [clientInfo, country]);

  useEffect(() => {
    dispatch(GetPayerInfoById(id, setIsLoading2));
    dispatch(GetCertificationStatusById(id));
    dispatch(GetOneClientInfo(id, setLoading));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(GetCountry());
  }, [dispatch]);

  useEffect(() => {
    if (payer) {
      let trueKeys = [];
      payer?.units?.forEach((company) => {
        const processeUnit = company.processeUnit;
        Object.keys(processeUnit).forEach((key) => {
          if (processeUnit[key] === true) {
            trueKeys.push(key);
          }
        });
      });

      setProcesseUnit(trueKeys?.join(" , "));
    }
  }, [payer]);

  useEffect(() => {
    if (data) {
      let trueKeys = [];
      data?.certifications?.forEach((company) => {
        const stands = company.standards;
        Object.keys(stands).forEach((key) => {
          if (stands[key] === true) {
            trueKeys.push(key);
          }
        });
      });
      setStandards(trueKeys?.join(" , "));
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-between h-full gap-5">
      {loading || isLoading2 ? (
        <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-281px)]">
          <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
        </div>
      ) : (
        <div className="flex flex-wrap items-center">
          <div className="w-1/3 mb-5 px-3">
            <div>
              <label
                htmlFor="company_name"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                onChange={(e) =>
                  setFdata({ ...fdata, company_name: e.target.value })
                }
                value={fdata?.company_name}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter company name"
              />
            </div>
          </div>
          <div className="w-1/3 mb-5 px-3">
            <div>
              <label
                htmlFor="p_phone"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                Contact No
              </label>
              <input
                type="text"
                name="p_phone"
                id="p_phone"
                onChange={(e) =>
                  setFdata({ ...fdata, p_phone: e.target.value })
                }
                value={fdata?.p_phone}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="w-full mb-5 px-3">
            <div>
              <label
                htmlFor="address"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) =>
                  setFdata({ ...fdata, address: e.target.value })
                }
                value={fdata?.address}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter address"
              />
            </div>
          </div>
          <div className="w-1/3 mb-5 px-3">
            <div>
              <label
                htmlFor="company_name"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setFdata({ ...fdata, city: e.target.value })}
                value={fdata?.city}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter city"
              />
            </div>
          </div>
          <div className="w-1/3 mb-5 px-3">
            <div>
              <label
                htmlFor="region"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                Region
              </label>
              <input
                type="text"
                name="region"
                id="region"
                onChange={(e) => setFdata({ ...fdata, region: e.target.value })}
                value={fdata?.region}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter region"
              />
            </div>
          </div>
          <div className="w-1/3 mb-5 px-3">
            <div>
              <label
                htmlFor="country"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCname(e.target.value)}
                value={cName}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter country"
              />
            </div>
          </div>
          <div className="w-1/3 mb-5 px-3">
            <div>
              <label
                htmlFor="standards"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                Standard
              </label>
              <input
                type="text"
                name="standards"
                id="standards"
                onChange={(e) => setStandards(e.target.value)}
                value={standards}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter standards"
              />
            </div>
          </div>
          <div className="w-1/3 mb-5 px-3">
            <div>
              <label
                htmlFor="processeUnit"
                className="mb-[6px] text-[16px] leading-[18px] font-[400] font-Roboto"
              >
                Process
              </label>
              <input
                type="text"
                name="processeUnit"
                id="processeUnit"
                onChange={(e) => setProcesseUnit(e.target.value)}
                value={processeUnit}
                className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                placeholder="Enter processe unit"
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsSubmit(true)}
          className="text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px]"
        >
          Raise Query
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(`/pre_audit/project/${id}/scheduling/auditor_details`)
          }
          className={`text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] w-[230px] flex items-center justify-center`}
        >
          Select Auditors
        </button>
      </div>
      <QuertRaise
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        handleClose={() => setIsSubmit(false)}
        memberid={admin?.id}
        userid={id}
      />
    </div>
  );
};

export default CompanyDetails;
