import React from "react";
import { MDBDataTable } from "mdbreact";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import moment from "moment";

const DataTableWithCheckbox = ({
  data,
  onCheckboxChange,
  selectedRows,
  renderRowActions,
}) => {
  const handleCheckboxChange = (id) => {
    onCheckboxChange(id);
  };

  const extendedData = {
    ...data,
    rows: data?.rows?.map((row) => ({
      ...row,
      // createdAt: moment(row.createdAt).format('lll'),
      createdAt: moment(row.createdAt).format("DD/MM/YYYY"),
      alldata: row?.alldata?.clientData?.company_name,
      checkbox: (
        <input
          type="checkbox"
          onChange={(e) => handleCheckboxChange(row.userid)} // assuming each row has an 'id' property
          checked={selectedRows.includes(row.userid)} // assuming selectedRows is an array of selected row ids
          // defaultChecked={selectedRows.includes(row.id)} // assuming selectedRows is an array of selected row ids
        />
      ),
      status:
        row.status === "Pending" ? (
          <span className="text-[#D0A31E]">Pending for Review</span>
        ) : (
          row.status
        ),
      actions: renderRowActions !== null && renderRowActions(row),
    })),
  };

  return (
    <div>
      <MDBDataTable
        striped
        bordered
        small
        paginationLabel={[
          <BsChevronLeft className="inline-block" />,
          <BsChevronRight className="inline-block" />,
        ]}
        data={extendedData}
        checkbox
      />
    </div>
  );
};

export default DataTableWithCheckbox;
