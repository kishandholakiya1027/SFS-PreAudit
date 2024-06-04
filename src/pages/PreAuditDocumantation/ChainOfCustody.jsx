import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneAudit } from "../../store/action/preAuditAction";
import { LoaderIcon } from "react-hot-toast";
import QuertRaise from "../../components/common/QuertRaise";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const docs1 = [
  {
    id: 1,
    document_name: "Management system",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "COC SOPS",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Mapping product diagram",
    document: "",
    select: "",
    desc: "(Machinery list / floor mapping/ cleaning and hygiene record)",
    comment: "",
  },
  {
    id: 4,
    document_name: "Process flow chart",
    document: "",
    select: "",
    desc: "(ownership deed or lease agreement)",
    comment: "",
  },
  {
    id: 5,
    document_name: "Inbound purchasing record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Handling record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Quality Test reports",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Outbound sales record (bales)",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 9,
    document_name: "Supplier valid license certificate",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 10,
    document_name: "Annual transaction summary",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs2 = [
  {
    id: 1,
    document_name: "Farm group/seller/ supplier/middleman or collector list",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name:
      "SFS standards certification and license of farm group/ seller /supplier/ middleman or collector",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name:
      "List of market source or middleman or collector with contact",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name:
      "Registration certificate of all market source or middleman or collector if not covered under license",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Contract with all market source or middleman or collector",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Weighing list and slips",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Sale slip or purchase slip (Location)",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name:
      "Bank transaction details (if applicable) or proof of payment to farmer or supplier",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 9,
    document_name:
      "Vehicle loading checklist with all loaded materials details",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 10,
    document_name:
      "R copy and photo of truck with material and license plate number",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 11,
    document_name: "Delivery Order",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 12,
    document_name: "Truck receipt",
    document: "",
    select: "",
    desc: "(net and gross weight)",
    comment: "",
  },
  {
    id: 13,
    document_name: "Purchase orders",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 14,
    document_name: "Sale contract",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 15,
    document_name: "Packing list",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 16,
    document_name: "Invoice",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 17,
    document_name: "Bale and Lot record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 18,
    document_name: "Quality Test report",
    document: "",
    select: "",
    desc: "(if applicable)",
    comment: "",
  },
  {
    id: 19,
    document_name: "Eway Bill",
    document: "",
    select: "",
    desc: "(if applicable)",
    comment: "",
  },
  {
    id: 20,
    document_name:
      "Receipt issued by Distributor/Trader/Warehouse to collector or transporter",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 21,
    document_name:
      "Bank transaction details (if applicable) or proof of payment to collector or transporter",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 22,
    document_name: `Proof of transaction "Transaction certificate"`,
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs3 = [
  {
    id: 1,
    document_name: "Unit map warehouse with all details",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Vehicle identification and verification:",
    document: "",
    select: "",
    desc: "(License plate, Photo of truck)",
    comment: "",
  },
  {
    id: 3,
    document_name:
      "GRN (Good Receipt Note) Weight of truck including material (Net weight and gross weight)",
    document: "",
    select: "",
    desc: "(Net weight and gross weight)",
    comment: "",
  },
  {
    id: 4,
    document_name: "Weighment slip",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name:
      "Bank transaction details (if applicable) or proof of payment to collector or transporter",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Inward records",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Heap record / Bales record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Raw material lot number at reception and storage",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 9,
    document_name: "Stock record and reconciliation records",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs4 = [
  {
    id: 1,
    document_name: "SOPs, Management system",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Floor Layout",
    document: "",
    select: "",
    desc: "(License plate, Photo of truck)",
    comment: "",
  },
  {
    id: 3,
    document_name: "Mapping product diagram",
    document: "",
    select: "",
    desc: "(process flow chart)",
    comment: "",
  },
  {
    id: 4,
    document_name: "Machinery list",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Cleaning and hygiene and pest control record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name:
      "Cleaning and pest control sub contractor detail if applicable",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Handling record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Finished goods /stock records/lot number details",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 9,
    document_name: "Stock reconciliation records",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 10,
    document_name: "Packing material MSDS, and supplier details",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 11,
    document_name: "Draft Label",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs5 = [
  {
    id: 1,
    document_name: "SOPs, Management system",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Finished goods stock records",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Sales and outward records",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Sale order or Purchase orders",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Invoices",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 6,
    document_name: "Packing list",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 7,
    document_name: "Material issue record",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 8,
    document_name: "Export label/Lot number",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 9,
    document_name: "Container loading / vehicle loading check list",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 10,
    document_name: "Transport document (LR) / Eway bill",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 12,
    document_name: "Shipping check list",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 13,
    document_name: "Bill of lading",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 14,
    document_name: "Quality Test report",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 15,
    document_name: `Proof of transaction "Transaction certificate"`,
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 16,
    document_name: `Mass balance records"`,
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 17,
    document_name: `Proof of payment details`,
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs6 = [
  {
    id: 1,
    document_name:
      "All relevant data and documents from Module A and B above are reflected in digital traceability system",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs7 = [
  {
    id: 1,
    document_name:
      "Testing data and report issued by third-party technology company or qualified laboratory and entered into qualified thrid-party digital traceability software solution",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const ChainOfCustody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [loading2, setLoading2] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const { preaudit } = useSelector((state) => state.preAuditReducer);
  const [doc, setDoc] = useState([
    {
      name: "Chain-of-Custody: Processor or Manufacturer to Intermediary 1",
      documents: docs1,
    },
    {
      name: "Chain-of-Custody: Processor or Manufacturer to Intermediary 2",
      documents: docs2,
    },
    {
      name: "Chain-of-Custody: Intermediary (Documentary-1)",
      documents: docs3,
    },
    {
      name: "Chain-of-Custody: Intermediary (Documentary-2)",
      documents: docs4,
    },
    {
      name: "Chain-of-Custody: Intermediary to Manufacturer or Processor (Documentary)",
      documents: docs5,
    },
    {
      name: "Chain-of-Custody: Manufacturer Site/Facility (Digital and Physical-1)",
      documents: docs6,
    },
    {
      name: "Chain-of-Custody: Manufacturer Site/Facility (Digital and Physical-2)",
      documents: docs7,
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
  ]);

  const handleDropDown = (i) => {
    setDropdown((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, dropdown: !item.dropdown } : item
      )
    );
  };

  const handleSubmit = () => {
    navigate("/pre_audit/project/" + id + "/review/environmental");
  };

  useEffect(() => {
    dispatch(getOneAudit(setLoading2, id, "Chain of Custody"));
  }, []);

  useEffect(() => {
    if (preaudit && preaudit?.name === "Chain of Custody") {
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
                Chain-of-Custody: Processor or Manufacturer to Intermediary
                (Documentary)
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
                          "Chain-of-Custody: Processor or Manufacturer to Intermediary (Documentary)"
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
                          value={doc[0].documents[i]?.comment || ""}
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
                Chain-of-Custody: Processor or Manufacturer to Intermediary
                (Documentary)
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
                      handleRaiseQuery(
                        "Chain-of-Custody: Processor or Manufacturer to Intermediary (Documentary)"
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
                        value={doc[1].documents[i]?.comment || ""}
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
                Chain-of-Custody: Intermediary (Documentary-1)
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
                      handleRaiseQuery(
                        "Chain-of-Custody: Intermediary (Documentary-1)"
                      )
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
                        value={doc[2].documents[i]?.comment || ""}
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
                Chain-of-Custody: Intermediary (Documentary-2)
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
                      handleRaiseQuery(
                        "Chain-of-Custody: Intermediary (Documentary-2)"
                      )
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
                      {doc[3].documents[i]?.document ? (
                        <Link
                          to={doc[3].documents[i]?.document}
                          target="_blank"
                          classNam="underline i-[#106FEC] text-[14px] font-[400] leading-4"
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
                        value={doc[3].documents[i]?.comment || ""}
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
                Chain-of-Custody: Intermediary to Manufacturer or Processor
                (Documentary)
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
                      handleRaiseQuery(
                        "Chain-of-Custody: Intermediary to Manufacturer or Processor (Documentary)"
                      )
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
                        value={doc[4]?.documents[i]?.comment || ""}
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
                Chain-of-Custody: Manufacturer Site/Facility (Digital and
                Physical-1)
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
                      handleRaiseQuery(
                        "Chain-of-Custody: Manufacturer Site/Facility (Digital and Physical-1)"
                      )
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
                        value={doc[5]?.documents[i]?.comment || ""}
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
                Chain-of-Custody: Manufacturer Site/Facility (Digital and
                Physical-2)
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
                      handleRaiseQuery(
                        "Chain-of-Custody: Manufacturer Site/Facility (Digital and Physical-2)"
                      )
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
                        value={doc[6]?.documents[i]?.comment || ""}
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

export default ChainOfCustody;
