import React, { useContext, useEffect, useMemo, useState } from "react";
import { EnhancedTable } from "../components/ProjectApplicationList";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sort from "../assets/images/Vector.svg";
import { deleteInvoice } from "../store/action/InvoiceAction";
import Model from "../components/common/Model";
import { TabContext } from "../contexts/ActiveTabContext";
import { LuEye } from "react-icons/lu";
import { LoaderIcon } from "react-hot-toast";
import { GetReviewe } from "../store/action/SendRevieweAction";

const tabs = [
  {
    id: "1",
    label: "Application List",
    link: "/pre_audit/project",
    content: "Content for Tab 1",
  },
];

const AccountantProject = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [isId, setIsId] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeTab, setActiveTab } = useContext(TabContext);
  const { reviewer } = useSelector((state) => state.sendRevieweReducer);
  const { invoice } = useSelector((state) => state.SendInvoiceReducer);

  useEffect(() => {
    dispatch(GetReviewe(setLoading));
  }, [dispatch]);

  const pendingData = useMemo(() => {
    return reviewer?.filter((item) => item.status === "pending");
  }, [reviewer]);

  const otherData = useMemo(() => {
    return reviewer?.filter((item) => item.status !== "pending");
  }, [reviewer]);

  const TableData = {
    columns: [
      {
        label: (
          <div className="flex gap-3 cursor-pointer">
            Application ID <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer">
            Application Received Date
            <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "createdAt",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer">
            Company Name <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "company_name",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer">
            STD <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "std",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer">
            Reviewer <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "reviewer",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer">
            Status <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "status",
        sort: "asc",
        width: 20,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer">
            Comments <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "messages",
        sort: "asc",
        width: 100,
      },
      {
        label: "",
        field: "actions",
        sort: "asc",
        width: 100,
      },
    ],
    rows: pendingData?.length > 0 ? pendingData : [],
  };

  useEffect(() => {
    if (!!state) {
      setActiveTab(state.activeTab);
    }
  }, [state]);

  const handleDelete = () => {
    dispatch(deleteInvoice(isId));
    setIsSubmit(false);
    setIsId("");
  };

  const handleOpen = (id) => {
    setIsSubmit(true);
    setIsId(id);
  };

  const handleClose = () => {
    setIsSubmit(false);
    setIsId("");
  };

  const renderRowActions = (row) => (
    <div className="flex flex-nowrap gap-[8px]">
      <button
        type="button"
        className="text-[14px]  text-[#000] rounded p-[6px]"
        onClick={() =>
          navigate(`/pre_audit/project/${row.userid}/review/organisation`)
        }
      >
        <LuEye size={20} />
      </button>
    </div>
  );
  const TabsContent = useMemo(() => {
    switch (pathname) {
      case "/pre_audit/project":
        return (
          <EnhancedTable
            key={1}
            data={TableData}
            renderRowActions={renderRowActions}
            option={"invoiceList"}
            filter={true}
          />
        );

      default:
        break;
    }
  }, [activeTab, invoice, TableData, pendingData, otherData]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] p-[40px] pt-[37px] pb-[30px] bg-[#F9FCFF]">
      <div className="w-full rounded pt-0 pl-0">
        <ul
          className={`flex items-center gap-[40px] border-b border-[#D2D8DD]`}
        >
          {tabs.length > 0 &&
            tabs.map((item, i) => {
              return (
                <li key={i}>
                  <button
                    type="button"
                    disabled={
                      (type && id) || pathname.includes("send-invoice")
                        ? true
                        : false
                    }
                    onClick={() => {
                      handleTabClick(item.id);
                      navigate(item.link);
                    }}
                    className={`px-3 py-4 text-[16px] font-[500] border-b-[5px] text-[#106FEC] border-transparent leading-6`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
        </ul>
        {/* {loading ? (
          <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-186px)]">
            <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
          </div>
        ) : id ? (
          <Outlet />
        ) : (
          TabsContent
        )} */}
        {loading ? (
          <div className="flex items-center justify-center w-full h-full min-h-[calc(100vh-186px)]">
            <LoaderIcon className="!w-12 !h-12 !border-r-[#106FEC]" />
          </div>
        ) : id ? (
          <Outlet />
        ) : (
          TabsContent
        )}
      </div>
      <Model
        isOpen={isSubmit}
        setIsOpen={setIsSubmit}
        title={"Are you sure want delete selected entry"}
        buttonText={"Yes"}
        buttonBg={"bg-[#106FEC]"}
        onSubbmit={handleDelete}
        buttonText2={"No"}
        button2Bg={"bg-[#D9D9D9]"}
        onSubbmit2={handleClose}
      />
    </div>
  );
};

export default AccountantProject;
