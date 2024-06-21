import { useEffect } from "react";
import React, { useState } from "react";
import {
  GetCertificationStatusById2,
  GetOneClientInfo2,
  GetPayerInfoById,
} from "../store/action/manageAction";
import { LoaderIcon } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ComboBox from "../components/common/ComboBox";
import { useDispatch, useSelector } from "react-redux";
import { GetCountry } from "../store/action/countryAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputWithLabel from "../components/common/InputWithLabel";
import { getOneAudit } from "../store/action/preAuditAction";

const docs1 = [
  {
    id: 1,
    document_name: "Legal Documents (GST, Incorporation, MSME)",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Farmers Agreement",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 3,
    document_name:
      "Seeds/Pesticides/ Compost Purchase and Distribution Records",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "All SC Certificate",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Farmers and Staff Training Record",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Internal Inspection Records",
    document: "",
    select: "",
    comment: "",
  },
];

const select = [
  { id: 1, name: "Yes" },
  { id: 2, name: "No" },
  { id: 3, name: "N/A" },
];

const PreAuditDocumentaion = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const unit = params.get("unit");
  const [doc, setDoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preAudit, setPreAudit] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const { country } = useSelector((state) => state.countryReducer);
  const { preaudit } = useSelector((state) => state.preAuditReducer);
  const { data, payer, clientInfo } = useSelector(
    (state) => state.manageUserReducer
  );

  useEffect(() => {
    if (!unit || unit === "0" || unit > payer?.units?.length) {
      navigate("/pre_audit/project");
    }
  }, [unit, payer]);

  useEffect(() => {
    dispatch(GetOneClientInfo2(id, setIsLoading2));
  }, [id]);

  useEffect(() => {
    if (country?.length === 0) {
      dispatch(GetCountry());
    }
  }, [country]);

  const handleChangesCheckbox = (e, index, name) => {
    setPreAudit((prev) => {
      return prev.map((item, idx) => {
        if (idx === +unit - 1) {
          const updatedStandards = [...(item.standards || [])];
          updatedStandards[index] = {
            ...updatedStandards[index],
            [name]: e.target.value,
          };
          return {
            ...item,
            standards: updatedStandards,
          };
        }
        return item;
      });
    });
  };

  const handleChanges = (e, index) => {
    const { name, value } = e.target;
    setPreAudit((prev) => {
      return prev.map((item, idx) => {
        if (idx === +unit - 1) {
          const updatedStandards = [...item.standards];
          updatedStandards[index] = {
            ...updatedStandards[index],
            [name]: value,
          };
          return {
            ...item,
            standards: updatedStandards,
          };
        }
        return item;
      });
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setPreAudit((prev) => {
      return prev.map((item, idx) => {
        if (idx === +unit - 1) {
          return {
            ...item,
            [name]: +value,
          };
        }
        return item;
      });
    });
  };

  const handleChange = (e, i) => {
    const { value } = e.target;
    setDoc((prev) => {
      return prev.map((item) => {
        if (item.id === +unit) {
          return {
            ...item,
            documents: item.documents.map((doc) => {
              if (doc.id === i + 1) {
                return { ...doc, comment: value };
              } else {
                return doc;
              }
            }),
          };
        }
        return item;
      });
    });
  };

  const handleSelect = (i, value) => {
    setDoc((prev) => {
      return prev.map((item) => {
        if (item.id === +unit) {
          return {
            ...item,
            documents: item.documents.map((doc) => {
              if (doc.id === i + 1) {
                return { ...doc, select: value.name };
              } else {
                return doc;
              }
            }),
          };
        }
        return item;
      });
    });
  };

  const handleSubmit = () => {
    if (+unit <= payer?.units?.length) {
      if (+unit === 1) {
        navigate("/pre_audit/project");
      } else {
        navigate("/pre_audit/project/" + id + "/review?unit=" + (+unit - 1));
      }
    } else {
      navigate("/pre_audit/project");
    }
  };

  const handleNext = () => {
    if (payer?.units?.length) {
      if (+unit < payer?.units?.length) {
        navigate("/pre_audit/project/" + id + "/review?unit=" + (+unit + 1));
      } else {
        navigate("/pre_audit/project/" + id + "/scheduling/company_details");
      }
    }
  };

  useEffect(() => {
    dispatch(GetCertificationStatusById2(id, setLoading));
    dispatch(GetPayerInfoById(id, setIsLoading2));
    dispatch(getOneAudit(setIsLoading3, id));
  }, [id, dispatch]);

  useEffect(() => {
    if (preaudit) {
      setPreAudit(preaudit?.preAudit);
      setDoc(preaudit?.documents);
    }
  }, [preaudit]);

  return (
    <div className={`pt-[50px]`}>
      <div className="max-w-full w-full 2xl:mx-auto">
        <div
          className={`relative flex flex-col justify-between h-full gap-[30px] ${
            isLoading2 || loading || isLoading3
              ? "min-h-[calc(100vh-247px)]"
              : "min-h-[calc(100vh-389px)]"
          }`}
        >
          {isLoading2 || loading || isLoading3 ? (
            <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-311px)]">
              <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-[16px] leading-6 font-[600] mb-3 text-[#000]">
                  Unit {unit}
                </h3>
                <h3 className="text-[16px] leading-6 font-[500] mb-5 text-[#000]">
                  Company Details
                </h3>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-5 relative">
                    <InputWithLabel
                      type="text"
                      label={t("companyName")}
                      placeholder="Enter Company Name"
                      name="company_name"
                      id="company_name"
                      value={clientInfo?.company_name}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-3/4 px-3 mb-6 md:mb-5 relative">
                    <InputWithLabel
                      type="text"
                      label={t("Address")}
                      placeholder="Enter Address"
                      name="address"
                      id="address"
                      value={clientInfo?.address}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="text"
                      label={t("city")}
                      placeholder="Enter City"
                      name="city"
                      id="city"
                      value={clientInfo?.city}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-5 relative">
                    <label className="text-[16px] font-[400] leading-[18px] mb-1">
                      {t("country")}
                    </label>
                    <ComboBox
                      option={country}
                      value={country?.find(
                        (v) => v.name === clientInfo?.country
                      )}
                      location={country?.find(
                        (v) => v.name === clientInfo?.country
                      )}
                      setLocation={(e) => handleCountry(e, 1)}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="text"
                      label={t("zip")}
                      placeholder="Enter Zip Code"
                      name="zip_code"
                      id="zip_code"
                      value={clientInfo?.zip_code}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="text"
                      label={t("contactPerson")}
                      placeholder="Enter Contact Person"
                      name="contact_p_name"
                      id="contact_p_name"
                      value={clientInfo?.contact_p_name}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="text"
                      label={t("p_phone")}
                      placeholder="Enter Primary Phone Numebr"
                      name="p_phone"
                      id="p_phone"
                      value={clientInfo?.p_phone}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="text"
                      label={t("email")}
                      placeholder="Enter Email"
                      name="email"
                      id="email"
                      value={clientInfo?.email}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <h3 className="text-[16px] leading-6 font-[500] mb-5 text-[#000]">
                  Certification & Processes
                </h3>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/3 px-3 relative">
                    <InputWithLabel
                      type="text"
                      label="Process Type"
                      placeholder="Enter Process Type"
                      name="process"
                      id="process"
                      value={Object.keys(
                        payer?.units?.[+unit - 1]?.processeUnit
                      ).filter(
                        (key) => payer?.units?.[+unit - 1]?.processeUnit[key]
                      )}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <label
                  className={` block tracking-wide text-black text-[16px] font-[400] mb-4 leading-[18px]`}
                >
                  Certified Standard
                </label>
                {Object.keys(data?.certifications?.[+unit - 1]?.standards)
                  ?.length > 0 &&
                  Object.keys(data?.certifications?.[+unit - 1]?.standards)
                    ?.filter(
                      (key) => data?.certifications?.[+unit - 1]?.standards[key]
                    )
                    .map((item, index) => (
                      <div
                        className="flex items-center gap-36 mb-6"
                        key={index}
                      >
                        <div>
                          <label className="block tracking-wide text-black text-[16px] font-[400] mb-2 leading-[18px]">
                            {item}
                          </label>
                          <div className="flex items-center gap-[95px]">
                            <div className="flex items-center gap-[6px]">
                              <input
                                type="radio"
                                value="Yes"
                                checked={
                                  preAudit?.[+unit - 1]?.standards?.[index]?.[
                                    item
                                  ] === "Yes"
                                }
                                className="accent-black pointer-events-none"
                                onChange={(e) =>
                                  handleChangesCheckbox(e, index, item)
                                }
                                name={item}
                                id={item + "yes"}
                              />
                              <label
                                className="pointer-events-none"
                                htmlFor={item + "yes"}
                              >
                                Yes
                              </label>
                            </div>
                            <div className="flex items-center gap-[6px]">
                              <input
                                type="radio"
                                value="No"
                                checked={
                                  preAudit?.[+unit - 1]?.standards?.[index]?.[
                                    item
                                  ] === "No"
                                }
                                className="accent-black pointer-events-none"
                                onChange={(e) =>
                                  handleChangesCheckbox(e, index, item)
                                }
                                name={item}
                                id={item + "no"}
                              />
                              <label
                                className="pointer-events-none"
                                htmlFor={item + "no"}
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <InputWithLabel
                            type="text"
                            label="SC Number"
                            placeholder="Enter Sc Number"
                            name="sc_number"
                            id={`sc_number_${index}`}
                            className="w-[200px]"
                            disabled
                            value={
                              preAudit?.[+unit - 1]?.standards?.[index]
                                ?.sc_number || ""
                            }
                            onChange={(e) => handleChanges(e, index)}
                          />

                          {/* <label
                            htmlFor={`document_${index}`}
                            className="cursor-pointer w-fit flex items-center gap-[10px] outline-none mt-[26px]"
                          >
                            <HiUpload size={20} color="#106FEC" />
                            <span>Choose File</span>
                          </label>
                          <input
                            type="file"
                            name={`document_${index}`}
                            accept=".pdf"
                            id={`document_${index}`}
                            onChange={(e) => handleFile(e, index)}
                            className="py-[8px] text-[14px] hidden w-[100px]"
                          /> */}
                          {preAudit?.[+unit - 1]?.standards?.[index]
                            ?.document && (
                            <p className="flex items-center gap-2 mt-[26px]">
                              <Link
                                to={
                                  preAudit?.[+unit - 1]?.standards?.[index]
                                    ?.document
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#106FEC] underline text-[14px] font-[300] leading-4"
                              >
                                {preAudit?.[+unit - 1]?.standards?.[
                                  index
                                ]?.document
                                  .split("/")
                                  .pop()}
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="number"
                      min={1}
                      label="Number of Farmers"
                      placeholder="Enter Number of Farmers"
                      name="totalFarmers"
                      id="totalFarmers"
                      disabled
                      value={preAudit?.[+unit - 1]?.totalFarmers}
                      onChange={(e) => handleChange2(e)}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="number"
                      min={1}
                      label="Total Area (In Hectare)"
                      placeholder="Enter Total Area"
                      name="totalArea"
                      id="totalArea"
                      disabled
                      value={preAudit?.[+unit - 1]?.totalArea}
                      onChange={(e) => handleChange2(e)}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="number"
                      min={1}
                      label="Organic In Conversion Year"
                      placeholder="Enter Organic In Conversion Year"
                      name="conversionYear"
                      id="conversionYear"
                      disabled
                      value={preAudit?.[+unit - 1]?.conversionYear}
                      onChange={(e) => handleChange2(e)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="number"
                      min={1}
                      label="Cotton Area (In Hectare)"
                      placeholder="Enter Cotton Area"
                      name="cottonArea"
                      id="cottonArea"
                      disabled
                      value={preAudit?.[+unit - 1]?.cottonArea}
                      onChange={(e) => handleChange2(e)}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    <InputWithLabel
                      type="number"
                      min={1}
                      label="Estimated Yield (In MT)"
                      placeholder="Enter Estimated Yield"
                      name="estimatedYield"
                      id="estimatedYield"
                      disabled
                      value={preAudit?.[+unit - 1]?.estimatedYield}
                      onChange={(e) => handleChange2(e)}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 md:mb-5 relative">
                    {preAudit?.[+unit - 1]?.afl ? (
                      <>
                        <label className="block tracking-wide text-black text-[16px] font-[400] mb-2 leading-[18px]">
                          AFL
                        </label>
                        <div className="flex gap-2 items-center">
                          <Link
                            to={preAudit?.[+unit - 1]?.afl}
                            target="_blank"
                            className="text-[#106FEC] underline text-[14px] font-[300] block leading-4"
                          >
                            {preAudit?.[+unit - 1]?.afl.split("/").pop()}
                          </Link>
                          {/* <span
                            className="cursor-pointer"
                            onClick={() =>
                              setPreAudit((prev) => {
                                return prev.map((item, idx) => {
                                  if (idx === +unit - 1) {
                                    return {
                                      ...item,
                                      afl: "",
                                    };
                                  }
                                  return item;
                                });
                              })
                            }
                          >
                            <IoClose />
                          </span> */}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* <label
                          htmlFor="afl"
                          className="text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[9px] px-5 bg-[#106FEC] rounded-[2px] w-[180px] flex items-center justify-center gap-2 mt-[26px] cursor-pointer"
                        >
                          <HiUpload size={20} color="#fff" /> Upload AFL
                        </label>
                        <input
                          type="file"
                          name="afl"
                          id="afl"
                          accept=".pdf"
                          onChange={(e) => handleFile3(e)}
                          className="py-[8px] text-[14px] hidden w-[100px]"
                        />
                        <p className="font-[300] text-[12px] font-Roboto mt-[6px]">
                          (To download AFL Format click on link)
                        </p> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-3">
                <h5 className="text-[14px] font-[500] leading-4 border-b-2 pb-4 mb-4">
                  Documents
                </h5>
                <div className="grid grid-cols-1 gap-3">
                  {docs1.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                      </div>
                      <div className="text-[14px] font-[300] font-Roboto text-left relative">
                        {doc?.[+unit - 1]?.documents?.[i]?.document ? (
                          <p className="flex items-center gap-2">
                            <Link
                              className="text-[#106FEC] underline text-[14px] font-[300] block leading-4"
                              to={doc?.[+unit - 1]?.documents?.[i]?.document}
                              target="_blank"
                            >
                              {doc?.[+unit - 1]?.documents?.[i]?.document
                                .split("/")
                                .pop()}
                            </Link>

                            {/* <span
                              className="cursor-pointer"
                              onClick={() =>
                                setDoc((prev) => {
                                  return prev.map((item, idx) => {
                                    if (idx === +unit - 1) {
                                      return {
                                        ...item,
                                        documents: item.documents.map(
                                          (item2, idx2) => {
                                            if (idx2 === i) {
                                              return {
                                                ...item2,
                                                document: "",
                                              };
                                            }
                                            return item2;
                                          }
                                        ),
                                      };
                                    }
                                    return item;
                                  });
                                })
                              }
                            >
                              <IoClose />
                            </span> */}
                          </p>
                        ) : (
                          <>
                            {/* <label
                              htmlFor="file"
                              onClick={() => setFlieValue(i)}
                              className="cursor-pointer flex items-center gap-[10px] outline-none"
                            >
                              <HiUpload size={20} color="#106FEC" />{" "}
                              <span>Choose File</span>
                            </label>
                            <input
                              type="file"
                              name="file"
                              accept=".pdf"
                              id="file"
                              onChange={(e) => handleFile2(e)}
                              className="py-[8px] text-[14px] hidden w-[100px]"
                            /> */}
                          </>
                        )}
                      </div>
                      <ComboBox
                        option={select}
                        setLocation={(value) => handleSelect(i, value)}
                        disabled={true}
                        location={select.find(
                          (item) =>
                            item.name === doc?.[+unit - 1]?.documents[i]?.select
                        )}
                      />
                      <input
                        type="text"
                        name="comment"
                        disabled
                        value={doc?.[+unit - 1]?.documents[i]?.comment}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                        placeholder="Enter comments"
                        onChange={(e) => handleChange(e, i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-[#D9D9D9] text-black py-[8px] px-[40px] rounded-[2px] text-[16px] font-Roboto font-[500] leading-[18px]"
              >
                Back
              </button>
              <button
                className={`text-[16px] font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] w-[116px] flex items-center justify-center`}
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreAuditDocumentaion;
