import React, { useState } from "react";
import Model from "../common/Model";
import { useDispatch } from "react-redux";
import { addQuery } from "../../store/action/queryAction";

const QuertRaise = ({
  isSubmit,
  setIsSubmit,
  handleClose,
  memberid,
  userid,
  title,
}) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!comment) {
      setError("Please enter comment");
    } else {
      const data = {
        memberid: memberid,
        userid: userid,
        query: comment,
        title: title,
      };
      setLoading(true);
      dispatch(addQuery(data, setLoading, handleClose, setComment));
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
    if (e.target.value) {
      setError("");
    } else {
      setError("Please enter comment");
    }
  };

  const body = (
    <div className="mt-[20px] text-left relative z-50">
      <div className="relative">
        <div className="relative">
          <label
            htmlFor="comments"
            className="text-[14px] text-[#000] font-Roboto font-[400] mb-[7px]"
          >
            Comments
          </label>
          <textarea
            type="text"
            name="comments"
            value={comment}
            rows={12}
            className="block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm resize-none"
            placeholder="Enter Comment"
            onChange={(e) => handleChange(e)}
          ></textarea>
          {error && (
            <p className="text-[10px] text-[#ff0000] pt-1 absolute top-full">
              {error}
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
      onSubbmit2={handleClose}
      body={body}
      loading={loading}
      btnW1={"w-full"}
      btnW2={"w-full"}
    />
  );
};

export default QuertRaise;
