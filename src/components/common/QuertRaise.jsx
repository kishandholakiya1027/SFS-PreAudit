import React, { useState } from "react";
import Model from "../common/Model";
import { useDispatch } from "react-redux";
import { addQuery } from "../../store/action/queryAction";

const QuertRaise = ({
  isSubmit,
  setIsSubmit,
  handleClose,
  memberid,
  companyid,
}) => {
  const [query, setQuery] = useState({
    comment: "",
    title: "",
  });
  const [error, setError] = useState({
    comment: "",
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (query.comment && query.title) {
      const data = {
        memberid: memberid,
        companyid: companyid,
        query: query.comment,
        title: query.title,
      };
      setLoading(true);
      dispatch(addQuery(data, setLoading, handleClose, setQuery));
    } else {
      !query.comment &&
        setError((prev) => ({ ...prev, comment: "Please enter comment" }));
      !query.title &&
        setError((prev) => ({ ...prev, title: "Please enter title" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));

    if (name === "comment") {
      if (!value) {
        setError((prev) => ({ ...prev, [name]: "Please enter comment" }));
      } else {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    }
    if (name === "title") {
      if (!value) {
        setError((prev) => ({ ...prev, [name]: "Please enter title" }));
      } else {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const body = (
    <div className="mt-[20px] text-left relative z-50">
      <div className="grid grid-cols-1 gap-[25px]">
        <div className="relative">
          <label
            htmlFor="title"
            className="text-[14px] text-[#000] font-Roboto font-[400] mb-[6px] leading-4"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm"
            placeholder="Enter Title"
            onChange={(e) => handleChange(e)}
          />
          {error.title && (
            <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
              {error.title}
            </p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="comment"
            className="text-[14px] text-[#000] font-Roboto font-[400] mb-[6px] leading-4"
          >
            Comments
          </label>
          <textarea
            type="text"
            name="comment"
            id="comment"
            value={query.comment}
            rows={12}
            className="block w-full text-black border border-[#D2D8DD] text-[16px] leading-[18px] font-[400] p-2 bg-white rounded-[4px] resize-none"
            placeholder="Enter Comment"
            onChange={(e) => handleChange(e)}
          ></textarea>
          {error.comment && (
            <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
              {error.comment}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Model
      isOpen={isSubmit}
      setIsOpen={setIsSubmit}
      title={"Raise Query"}
      buttonText={"Send"}
      buttonBg={"bg-[#106FEC]"}
      onSubbmit={handleSubmit}
      buttonText2={"Cancel"}
      button2Bg={"bg-[#D9D9D9]"}
      onSubbmit2={() => {
        handleClose();
        setError("");
      }}
      body={body}
      loading={loading}
      btnW1={"w-full"}
      btnW2={"w-full"}
    />
  );
};

export default QuertRaise;
