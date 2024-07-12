import React from "react";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DataTable = ({
  data,
  renderRowActions = null,
  option = null,
  responsive,
}) => {
  const extendedData = {
    ...data,
    rows: data?.rows?.map((row) => ({
      ...row,
      id: row?.id ? `${moment().year().toString().substr(2)}-${row.id}` : null,
      createdAt: moment(row.createdAt).format("DD-MM-YYYY"),
      company_name:
        (option === "createAudit" ||
          option === "invoiceList" ||
          option === "createAuditClient") &&
        row?.alldata?.clientData?.company_name,
      status:
        row.status === "0" ? (
          <span className="text-[#FF3131]">Cancel</span>
        ) : row.status === "1" ? (
          <span className="text-[#FF914D]">Pending for Review</span>
        ) : row.status === "2" ? (
          <span className="text-[#FFBD59]">Pending for Agreement</span>
        ) : row.status === "3" ? (
          <span className="text-[#FFDE59]">Pending for Payment</span>
        ) : row.status === "4" ? (
          <span className="text-[#C1FF72]">Payment Done</span>
        ) : row.status === "5" ? (
          <span className="text-[#00BF63]">Active</span>
        ) : (
          <span className="text-[#FF914D]">Pending</span>
        ),
      reviewer: row?.member?.name,
      actions: renderRowActions !== null && renderRowActions(row),
    })),
  };

  return (
    <div
      className={`text-left ${
        responsive && "min-w-[1400px] w-full overflow-auto"
      }`}
    >
      <MDBDataTable
        striped
        bordered
        small
        paginationLabel={[<FaChevronLeft />, <FaChevronRight />]}
        data={
          renderRowActions !== null || option !== null ? extendedData : data
        }
        checkbox
      />
    </div>
  );
};

export default DataTable;
