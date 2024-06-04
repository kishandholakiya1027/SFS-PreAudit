import React, { useEffect, useState } from "react";
import SelectList from "../../components/common/SelectList";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addDocData, getOneAudit } from "../../store/action/preAuditAction";
import { LoaderIcon } from "react-hot-toast";
import QuertRaise from "../../components/common/QuertRaise";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const docs1 = [
  {
    id: 1,
    document_name: "List of workers with date of birth",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Id card",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Attendance record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Social and labour act",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Child labour policy data",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Code of Conduct",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Communicating and Training",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Monitoring Compliance",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs2 = [
  {
    id: 1,
    document_name: "List of workers with date of birth",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Working hour record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Id cards",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Attendance record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Force labour policy data",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Code of Conduct",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Communicating and Training",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Communicating and Training",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs3 = [
  {
    id: 1,
    document_name: "List of workers with date of birth",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Working hour record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Attendance record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Code of Conduct",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Communicating and Training",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Monitoring Compliance",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Social status",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs4 = [
  {
    id: 1,
    document_name: "List of workers with date of birth",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Working hour record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Attendance record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Code of Conduct",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Communicating and Training",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Monitoring Compliance",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Social status",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs5 = [
  {
    id: 1,
    document_name: "Training record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Worker regular checkup for health and hygiene",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Accident record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Appropriate PP issuance and usage record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name:
      "Written list of chemical used & separate area for storage of chemicals and identification mark on it",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Valid fire extinguisher",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Training record on fire safety to be given",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Accident record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs6 = [
  {
    id: 1,
    document_name: "Minimum wages act",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Payment details",
    document: "",
    select: "",
    desc: "(Digital transaction)",
    comment: "",
  },
  {
    id: 3,
    document_name: "Attendance record",
    document: "",
    select: "",
    desc: "(Working hour record)",
    comment: "",
  },
  {
    id: 4,
    document_name: "Social security detail",
    document: "",
    select: "",
    desc: "(Mediclaim, Insurance...)",
    comment: "",
  },
  {
    id: 5,
    document_name: "Other benefit detail",
    document: "",
    select: "",
    desc: "(Bonus)",
    comment: "",
  },
  {
    id: 6,
    document_name: "Code of Conduct",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Communicating and Training",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Monitoring Compliance",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs7 = [
  {
    id: 1,
    document_name: "Record of attendance",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Any over time, details of it and payment details",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs8 = [
  {
    id: 1,
    document_name:
      "Calculating cost of living wage to verify the income per family",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Wage record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Policy on living wages",
    document: "",
    select: "",
    desc: "(of operator)",
    comment: "",
  },
  {
    id: 4,
    document_name: "Minimum wages act",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Total income from all sources of all income",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const SocialLabour = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const { preaudit } = useSelector((state) => state.preAuditReducer);
  const [doc, setDoc] = useState([
    {
      name: "Organisation: Facility and Site Information",
      documents: docs1,
    },
    {
      name: "Social and Labour: Forced Labor",
      documents: docs2,
    },
    {
      name: "Social and Labour: Harassment / Abuse",
      documents: docs3,
    },
    {
      name: "Social and Labour: Discrimination",
      documents: docs4,
    },
    {
      name: "Social and Labour: Health and safety",
      documents: docs5,
    },
    {
      name: "Social and Labour: Wages and benefits",
      documents: docs6,
    },
    {
      name: "Social and Labour: Working hours",
      documents: docs7,
    },
    {
      name: "Social and Labour: Employee/Contractor Living Wage",
      documents: docs8,
    },
  ]);
  const [dropdown, setDropdown] = useState([
    {
      dropdown: false,
    },
    {
      dropdown: false,
    },
    {
      dropdown: false,
    },
    {
      dropdown: false,
    },
    {
      dropdown: false,
    },
    {
      dropdown: false,
    },
    {
      dropdown: false,
    },
    {
      dropdown: false,
    },
  ]);

  const handleDropDown = (i) => {
    setDropdown((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, dropdown: !item.dropdown } : item
      )
    );
  };

  const handleSubmit = () => {
    navigate("/pre_audit/project/" + id + "/scheduling/company_details");
  };

  useEffect(() => {
    dispatch(getOneAudit(setLoading2, id, "Social and Labour"));
  }, []);

  useEffect(() => {
    if (preaudit && preaudit?.name === "Social and Labour") {
      setDoc(preaudit?.documents);
    }
  }, [preaudit]);

  const handleRaiseQuery = (title) => {
    setTitle(title);
    setIsSubmit(true);
  };

  return (
    <div className="h-full min-h-[calc(100vh-227px)]">
      {loading2 ? (
        <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-227px)]">
          <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
        </div>
      ) : (
        <div className="flex justify-between flex-col gap-5 h-full">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Organisation: Facility and Site Information
              </h2>
              <button onClick={() => handleDropDown(0)} type="button">
                {!dropdown[0]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[0]?.dropdown && (
              <>
                <div className="grid grid-cols-2 gap-4 px-3">
                  <div className="relative mb-5">
                    <h4 className="mb-2">Facility Name</h4>
                    <p className="text-[14px] font-400 leading-4">
                      ABC Pvt. Ltd.
                    </p>
                  </div>

                  <div className="relative mb-5">
                    <h4 className="mb-2">Facility Address</h4>
                    <p className="text-[14px] font-400 leading-4">
                      401/B, New abc building, Khothari nagar, NR. R mall,
                      Andheri - Mumbai
                    </p>
                  </div>
                </div>
                <div className="px-3 mb-10">
                  <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                    <h5 className="text-[14px] font-[500] leading-4">
                      Documents
                    </h5>
                    <button
                      onClick={() =>
                        handleRaiseQuery(
                          "Organisation: Facility and Site Information"
                        )
                      }
                      className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                    >
                      Raise Query
                    </button>
                  </div>
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
                          <p className="text-[10px] font-[300] leading-3">
                            {item?.desc}
                          </p>
                        </div>
                        {doc[0].documents[i]?.document ? (
                          <Link
                            to={doc[0].documents[i]?.document}
                            target="_blank"
                            className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                          >
                            Factory License
                          </Link>
                        ) : (
                          <span className="text-[14px] font-[400] leading-4">
                            Factory License
                          </span>
                        )}
                        <input
                          type="text"
                          value={doc[0].documents[i].select.name || "Select"}
                          className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                          disabled
                        />
                        <input
                          type="text"
                          name="comment"
                          value={doc[0]?.documents[i]?.comment || ""}
                          className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                          disabled
                          placeholder="Enter comments"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Social and Labour: Forced Labor
              </h2>
              <button onClick={() => handleDropDown(1)} type="button">
                {!dropdown[1]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[1]?.dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery("Social and Labour: Forced Labor")
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs2.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                        <p className="text-[10px] font-[300] leading-3">
                          {item?.desc}
                        </p>
                      </div>
                      {doc[1].documents[i]?.document ? (
                        <Link
                          to={doc[1].documents[i]?.document}
                          target="_blank"
                          className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                        >
                          Factory License
                        </Link>
                      ) : (
                        <span className="text-[14px] font-[400] leading-4">
                          Factory License
                        </span>
                      )}
                      <input
                        type="text"
                        value={doc[1].documents[i].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[1].documents[i].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Social and Labour: Harassment / Abuse
              </h2>
              <button onClick={() => handleDropDown(2)} type="button">
                {!dropdown[2]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[2]?.dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery("Social and Labour: Harassment / Abuse")
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs3.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                        <p className="text-[10px] font-[300] leading-3">
                          {item?.desc}
                        </p>
                      </div>
                      {doc[2].documents[i]?.document ? (
                        <Link
                          to={doc[2].documents[i]?.document}
                          target="_blank"
                          className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                        >
                          Factory License
                        </Link>
                      ) : (
                        <span className="text-[14px] font-[400] leading-4">
                          Factory License
                        </span>
                      )}
                      <input
                        type="text"
                        value={doc[2].documents[i].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[2].documents[i].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Social and Labour: Discrimination
              </h2>
              <button onClick={() => handleDropDown(3)} type="button">
                {!dropdown[3]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[3]?.dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery("Social and Labour: Discrimination")
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs4.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                        <p className="text-[10px] font-[300] leading-3">
                          {item?.desc}
                        </p>
                      </div>
                      {doc[1].documents[i]?.document ? (
                        <Link
                          to={doc[1].documents[i]?.document}
                          target=" blank"
                          className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                        >
                          Factory License
                        </Link>
                      ) : (
                        <span className="text-[14px] font-[400] leading-4">
                          Factory License
                        </span>
                      )}

                      <input
                        type="text"
                        value={doc[3].documents[i].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[3].documents[i].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Social and Labour: Health and safety
              </h2>
              <button onClick={() => handleDropDown(4)} type="button">
                {!dropdown[4]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[4]?.dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery("Social and Labour: Health and safety")
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs5.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                        <p className="text-[10px] font-[300] leading-3">
                          {item?.desc}
                        </p>
                      </div>
                      {doc[4].documents[i]?.document ? (
                        <Link
                          to={doc[4].documents[i]?.document}
                          target="_blank"
                          className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                        >
                          Factory License
                        </Link>
                      ) : (
                        <span className="text-[14px] font-[400] leading-4">
                          Factory License
                        </span>
                      )}
                      <input
                        type="text"
                        value={doc[4].documents[i].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[4].documents[i].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Social and Labour: Wages and benefits
              </h2>
              <button onClick={() => handleDropDown(5)} type="button">
                {!dropdown[5]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[5]?.dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery("Social and Labour: Wages and benefits")
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs6.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                        <p className="text-[10px] font-[300] leading-3">
                          {item?.desc}
                        </p>
                      </div>
                      {doc[5].documents[i]?.document ? (
                        <Link
                          to={doc[5].documents[i]?.document}
                          target="_blank"
                          className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                        >
                          Factory License
                        </Link>
                      ) : (
                        <span className="text-[14px] font-[400] leading-4">
                          Factory License
                        </span>
                      )}
                      <input
                        type="text"
                        value={doc[5].documents[i].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[5].documents[i].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Social and Labour: Working hours
              </h2>
              <button onClick={() => handleDropDown(6)} type="button">
                {!dropdown[6]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[6]?.dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery("Social and Labour: Working hours")
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs7.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                        <p className="text-[10px] font-[300] leading-3">
                          {item?.desc}
                        </p>
                      </div>
                      {doc[6].documents[i]?.document ? (
                        <Link
                          to={doc[6].documents[i]?.document}
                          target="_blank"
                          className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                        >
                          Factory License
                        </Link>
                      ) : (
                        <span className="text-[14px] font-[400] leading-4">
                          Factory License
                        </span>
                      )}
                      <input
                        type="text"
                        value={doc[6].documents[i].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[6].documents[i].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Social and Labour: Employee/Contractor Living Wage
              </h2>
              <button onClick={() => handleDropDown(7)} type="button">
                {!dropdown[7]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[7]?.dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery(
                        "Social and Labour: Employee/Contractor Living Wage"
                      )
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs8.map((item, i) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={i}
                    >
                      <div>
                        <h5 className="text-[14px] font-[300]">
                          {item.document_name}
                        </h5>
                        <p className="text-[10px] font-[300] leading-3">
                          {item?.desc}
                        </p>
                      </div>
                      {doc[7].documents[i]?.document ? (
                        <Link
                          to={doc[7].documents[i]?.document}
                          target="_blank"
                          className="underline text-[#106FEC] text-[14px] font-[400] leading-4"
                        >
                          Factory License
                        </Link>
                      ) : (
                        <span className="text-[14px] font-[400] leading-4">
                          Factory License
                        </span>
                      )}
                      <input
                        type="text"
                        value={doc[7].documents[i].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[7].documents[i].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className={`text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] w-[116px] flex items-center justify-center`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <QuertRaise
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        handleClose={() => setIsSubmit(false)}
        memberid={admin?.id}
        userid={id}
        title={title}
      />
    </div>
  );
};

export default SocialLabour;
