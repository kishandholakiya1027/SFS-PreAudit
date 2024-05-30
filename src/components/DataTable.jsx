import React from "react";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DataTable = ({
  data,
  renderRowActions = null,
  option = null,
  handleCheck,
}) => {
  const extendedData = {
    ...data,
    rows: data?.rows?.map((row) => ({
      ...row,
      createdAt: moment(row.createdAt).format("DD-MM-YYYY"),
      expire_date:
        option === "createAuditClient" && row.expire_date
          ? moment(row?.expire_date).format("lll")
          : "-",
      company_name:
        (option === "createAudit" ||
          option === "invoiceList" ||
          option === "createAuditClient") &&
        row?.alldata?.clientData?.company_name,
      contact_p_name:
        (option === "createAudit" || option === "createAuditClient") &&
        row?.alldata?.clientData?.contact_p_name,
      email:
        option === "createAudit" || option === "createAuditClient"
          ? row?.alldata?.clientData?.email
          : row?.email,
      seller: option === "transactionCerti" && row.seller.name,
      buyer: option === "transactionCerti" && row.buyer.name,
      productcategory:
        option === "product" && row?.product?.productcategory?.name,
      producttypes: option === "product" && row?.product?.producttypes?.name,
      rawmaterial: option === "product" && row?.product?.rawmaterial?.name,
      name:
        option === "product"
          ? `${row.proCate} | ${row.proDetail} | ${row.material} | ${row.standard} | ${row.component}`
          : option === "productCate"
            ? row.name
            : option === "createAudit" || option === "invoiceList"
              ? row?.user?.name
              : row?.user?.name,
      lastprocessor: option === "transactionCerti" && row.last_proccesor.name,
      approveby: option === "transactionCerti" && row?.approve_by?.name,
      updatedAt:
        option === "createUpdate" && moment(row.updatedAt).format("lll"),
      received_date:
        option === "received_date" &&
        moment(row.received_date).format("MMMM DD, YYYY"),
      status:
        option === "invoiceList" ? (
          <span className={`text-[#D0A31E]`}>Pending For Review</span>
        ) : (
          <span>{row.status}</span>
        ),
      actions: renderRowActions !== null && renderRowActions(row),
      checkbox: (
        <input
          type="checkbox"
          name={row.AppId}
          onClick={() => handleCheck(row.AppId)}
        />
      ),
      legalDoc: row?.legalDoc?.map((item) => {
        return (
          <span className="border border-[#DBDBDE] rounded-[30px] px-[20px]">
            {item},
          </span>
        );
      }),
    })),
  };

  return (
    <div>
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
