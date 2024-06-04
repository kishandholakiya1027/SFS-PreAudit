import { LoaderIcon } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuertRaise from "../../components/common/QuertRaise";
import SelectList from "../../components/common/SelectList";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneAudit } from "../../store/action/preAuditAction";

const docs1 = [
  {
    id: 1,
    document_name: "Facility Map",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Geographical Marking",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Longitude Latitude",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Land documents",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Legal papers verified by authorities",
    document: "",
    select: "",
    comment: "",
  },
];

const docs2 = [
  {
    id: 1,
    document_name:
      "Legal documents: (GSTIN, PAN, Adhar and PAN of owner, COl,Govn. registration documents, IEC, Udyog Adhar, MSME, etc.)",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Organization structure:",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 3,
    document_name:
      "Oualification documents for manpower: (Resume and education and experience details)",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Unit Layout, Farm Group Maps, Route maps:",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 5,
    document_name:
      "Bank transaction details / financial report : (Bank Passbook and Statement and audit report.)",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Company mission, goals and policy. written framework:",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "BankOrganization operating manual:",
    document: "",
    select: "",
    comment: "",
  },
];

const docs3 = [
  {
    id: 1,
    document_name:
      "Written policy: (HR policy, compliance, organization operating manual)",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Internal training plan and records",
    document: "",
    select: "",
    comment: "",
  },
];

const docs4 = [
  {
    id: 1,
    document_name: "Existing standards scope certficates:",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Existing standards audit reports:",
    document: "",
    select: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Complaint records:",
    document: "",
    select: "",
    comment: "",
  },
];

const Organization = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading2, setLoading2] = useState(true);
  const [title, setTitle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const { preaudit } = useSelector((state) => state.preAuditReducer);
  const [doc, setDoc] = useState([
    {
      name: "Facility and Site Information",
      documents: docs1,
    },
    {
      name: "Organizational Structure and Management",
      documents: docs2,
    },
    {
      name: "Policies and Procedures",
      documents: docs3,
    },
    {
      name: "Existing Accreditations and Certifications",
      documents: docs4,
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
  ]);

  const handleDropDown = (i) => {
    setDropdown((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, dropdown: !item.dropdown } : item
      )
    );
  };

  const handleSubmit = () => {
    navigate("/pre_audit/project/" + id + "/review/chain_of_custody");
  };

  useEffect(() => {
    dispatch(getOneAudit(setLoading2, id, "Organization"));
  }, []);

  useEffect(() => {
    if (preaudit && preaudit?.name === "Organization") {
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
                        <p>{item.document_name}</p>
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
                          value={doc[0].documents[i].comment || ""}
                          className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                          placeholder="Enter comments"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center justify-between">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Organisation: Organizational Structure and Management
              </h2>
              <button onClick={() => handleDropDown(1)} type="button">
                {!dropdown[1]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[1].dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery(
                        "Organisation: Organizational Structure and Management"
                      )
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
                      <p>{item.document_name}</p>
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
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Organisation: Policies and Procedures
              </h2>
              <button onClick={() => handleDropDown(2)} type="button">
                {!dropdown[2]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[2].dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery("Organisation: Policies and Procedures")
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
                      <p>{item.document_name}</p>
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
                        placeholder="Enter comments"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
                Organisation: Existing Accreditations and Certifications
              </h2>
              <button onClick={() => handleDropDown(3)} type="button">
                {!dropdown[3]?.dropdown ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
            </div>
            {!dropdown[3].dropdown && (
              <div className="px-3 mb-10">
                <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
                  <h5 className="text-[14px] font-[500] leading-4">
                    Documents
                  </h5>
                  <button
                    onClick={() =>
                      handleRaiseQuery(
                        "Organisation: Existing Accreditations and Certifications"
                      )
                    }
                    className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
                  >
                    Raise Query
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {docs4.map((item, index) => (
                    <div
                      className="grid grid-cols-4 gap-10 items-center"
                      key={index}
                    >
                      <p>{item.document_name}</p>
                      {doc[3].documents[index]?.document ? (
                        <Link
                          to={doc[3].documents[index]?.document}
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
                        value={doc[3].documents[index].select.name || "Select"}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
                        disabled
                      />
                      <input
                        type="text"
                        name="comment"
                        value={doc[3].documents[index].comment || ""}
                        className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm pointer-events-none"
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

export default Organization;
