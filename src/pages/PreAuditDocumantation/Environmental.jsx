import React, { useEffect, useState } from "react";
import SelectList from "../../components/common/SelectList";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addDocData, getOneAudit } from "../../store/action/preAuditAction";
import { LoaderIcon } from "react-hot-toast";
import QuertRaise from "../../components/common/QuertRaise";

const docs1 = [
  {
    id: 1,
    document_name: "Electricity bill",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "Electricity consumption report",
    document: "",
    select: "",
    desc: "(annually)",
    comment: "",
  },
  {
    id: 3,
    document_name: "Pollution board certificate related to emission",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 4,
    document_name: "Fuel consumption detail",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 5,
    document_name: "Machinery record",
    document: "",
    select: "",
    desc: "(Transport, weight scale and processing unit machinery etc)",
    comment: "",
  },
];

const docs2 = [
  {
    id: 1,
    document_name: "Local requirements or certificates",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "ZDHC Chemical Management System Framework verification",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Scope certificate under GOTS 7.0.",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];

const docs3 = [
  {
    id: 1,
    document_name: "Local requirements or certificates",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 2,
    document_name: "ZDHC Chemical Management System Framework verification",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
  {
    id: 3,
    document_name: "Scope certificate under GOTS 7.0.",
    document: "",
    select: "",
    desc: "",
    comment: "",
  },
];
const Environmental = () => {
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
      name: "Processor Site/Facility Energy and Emissions",
      documents: docs1,
    },
    {
      name: "Processor Site/Facility Chemical Management",
      documents: docs2,
    },
    {
      name: "Processor Site/Facility Water and Effluent (if Applicable)",
      documents: docs3,
    },
  ]);

  const handleChange = (e, link, i) => {
    const { name, value } = e.target;
    setDoc((prev) => {
      return prev.map((item) => {
        if (item.name === link) {
          return {
            ...item,
            documents: item.documents.map((doc) => {
              if (doc.id === i + 1) {
                return { ...doc, [name]: value };
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

  const handleSelect = (link, i, value) => {
    setDoc((prev) => {
      return prev.map((item) => {
        if (item.name === link) {
          return {
            ...item,
            documents: item.documents.map((doc) => {
              if (doc.id === i + 1) {
                return { ...doc, select: value };
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
    setLoading(true);
    const payload = {
      data: doc,
      clientId: id,
      name: "Environmental",
    };
    dispatch(addDocData(payload, setLoading, navigate, id));
  };

  useEffect(() => {
    dispatch(getOneAudit(setLoading2, id, "Environmental"));
  }, []);

  useEffect(() => {
    if (preaudit && preaudit?.name === "Environmental") {
      setDoc(preaudit?.documents);
    }
  }, [preaudit]);

  const handleRaiseQuery = (title) => {
    setTitle(title);
    setIsSubmit(true);
  };

  return (
    <div>
      {loading2 ? (
        <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-227px)]">
          <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
        </div>
      ) : (
        <>
          <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
            Environmental: Processor Site/Facility Energy and Emissions
          </h2>
          <div className="grid grid-cols-2 gap-4 px-3">
            <div className="relative mb-5">
              <h4 className="mb-2">Facility Name</h4>
              <p className="text-[14px] font-400 leading-4">ABC Pvt. Ltd.</p>
            </div>

            <div className="relative mb-5">
              <h4 className="mb-2">Facility Address</h4>
              <p className="text-[14px] font-400 leading-4">
                401/B, New abc building, Khothari nagar, NR. R mall, Andheri -
                Mumbai
              </p>
            </div>
          </div>
          <div className="px-3 mb-10">
            <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
              <h5 className="text-[14px] font-[500] leading-4">Documents</h5>
              <button
                onClick={() =>
                  handleRaiseQuery(
                    "Environmental: Processor Site/Facility Energy and Emissions"
                  )
                }
                className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
              >
                Raise Query
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {docs1.map((item, i) => (
                <div className="grid grid-cols-4 gap-10 items-center" key={i}>
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
                  <SelectList
                    value={doc[0].documents[i].select || "Select"}
                    option={[{ name: "Yes" }, { name: "No" }, { name: "N/A" }]}
                    field="name"
                    name="select"
                    onchange={(value) =>
                      handleSelect(
                        "Processor Site/Facility Energy and Emissions",
                        i,
                        value
                      )
                    }
                  />
                  <input
                    type="text"
                    name="comment"
                    value={doc[0].documents[i].comment || ""}
                    className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                    placeholder="Enter comments"
                    onChange={(e) =>
                      handleChange(
                        e,
                        "Processor Site/Facility Energy and Emissions",
                        i
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
            Environmental: Processor Site/Facility Chemical Management
          </h2>
          <div className="px-3 mb-10">
            <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
              <h5 className="text-[14px] font-[500] leading-4">Documents</h5>
              <button
                onClick={() =>
                  handleRaiseQuery(
                    "Environmental: Processor Site/Facility Chemical Management"
                  )
                }
                className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
              >
                Raise Query
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {docs2.map((item, i) => (
                <div className="grid grid-cols-4 gap-10 items-center" key={i}>
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
                  <SelectList
                    value={doc[1].documents[i].select || "Select"}
                    option={[{ name: "Yes" }, { name: "No" }, { name: "N/A" }]}
                    field="name"
                    name="select"
                    onchange={(value) =>
                      handleSelect(
                        "Processor Site/Facility Chemical Management",
                        i,
                        value
                      )
                    }
                  />
                  <input
                    type="text"
                    name="comment"
                    value={doc[1].documents[i].comment || ""}
                    className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                    placeholder="Enter comments"
                    onChange={(e) =>
                      handleChange(
                        e,
                        "Processor Site/Facility Chemical Management",
                        i
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <h2 className="px-3 text-[18px] font-[500] leading-5 mb-5">
            Environmental: Processor Site/Facility Water and Effluent (if
            Applicable)
          </h2>
          <div className="px-3 mb-10">
            <div className="border-b-2 pb-4 mb-4 flex items-center justify-between">
              <h5 className="text-[14px] font-[500] leading-4">Documents</h5>
              <button
                onClick={() =>
                  handleRaiseQuery(
                    "Environmental: Processor Site/Facility Water and Effluent (if Applicable)"
                  )
                }
                className="text-[14px] font-[500] leading-4 underline text-[#106FEC]"
              >
                Raise Query
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {docs3.map((item, i) => (
                <div className="grid grid-cols-4 gap-10 items-center" key={i}>
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
                  <SelectList
                    value={doc[2].documents[i].select || "Select"}
                    option={[{ name: "Yes" }, { name: "No" }, { name: "N/A" }]}
                    field="name"
                    name="select"
                    onchange={(value) =>
                      handleSelect(
                        "Processor Site/Facility Water and Effluent (if Applicable)",
                        i,
                        value
                      )
                    }
                  />
                  <input
                    type="text"
                    name="comment"
                    value={doc[2].documents[i].comment || ""}
                    className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
                    placeholder="Enter comments"
                    onChange={(e) =>
                      handleChange(
                        e,
                        "Processor Site/Facility Water and Effluent (if Applicable)",
                        i
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className={`text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] w-[116px] flex items-center justify-center ${
                loading && "opacity-70"
              }`}
            >
              {loading ? (
                <LoaderIcon className="!w-[18px] !h-[18px]" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </>
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

export default Environmental;
