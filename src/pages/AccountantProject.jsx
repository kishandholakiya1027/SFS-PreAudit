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
import moment from "moment";

const AccountantProject = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isId, setIsId] = useState("");
  const [loading, setLoading] = useState(true);
  const { setActiveTab } = useContext(TabContext);
  const { reviewer } = useSelector((state) => state.sendRevieweReducer);

  useEffect(() => {
    if (reviewer) {
      dispatch(GetReviewe(setLoading));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const pendingData = useMemo(() => {
    return reviewer?.filter((item) => item.ncr_status === "approved");
  }, [reviewer]);

  const TableData = {
    columns: [
      {
        label: (
          <div className="flex gap-3 cursor-pointer w-[119px]">
            Application ID <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer w-[206px]">
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
          <div className="flex gap-3 cursor-pointer w-[200px]">
            Company Name <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "company_name",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer w-[100px]">
            STD <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "std",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer w-[100px]">
            Reviewer <img src={Sort} alt="Sort" />
          </div>
        ),
        field: "reviewer",
        sort: "asc",
        width: 100,
      },
      {
        label: (
          <div className="flex gap-3 cursor-pointer w-[100px]">
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
          navigate(`/pre_audit/project/${row.companyid}/review?unit=1`)
        }
      >
        <LuEye size={20} />
      </button>
    </div>
  );

  const exportData = useMemo(() => {
    return pendingData.length > 0
      ? pendingData.map((item) => {
          return {
            "Application ID":
              moment().year().toString().slice(2) + "-" + item?.id,
            "Application Received Date": moment(item?.createdAt).format(
              "DD-MM-YYYY"
            ),
            "Company Name": item?.alldata?.clientData?.company_name,
            STD: item?.std,
            Reviewer: item?.reviewer,
            Status: item?.status,
            Comments: item?.messages,
          };
        })
      : [];
  }, [pendingData]);

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
            exportData={exportData}
            setLoading={setLoading}
            fileName="ApplicationList.xlsx"
          />
        );

      default:
        break;
    }
  }, [TableData, pathname]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="2xl:p-10 p-6 bg-[#F9FCFF] h-full min-h-[calc(100vh-57px)]">
      <div className="w-full rounded pt-0 pl-0">
        <h1 className="pb-[15px] text-[16px] leading-[24px] border-b text-[#106FEC] rounded-t font-[600]">
          Application List
        </h1>
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
