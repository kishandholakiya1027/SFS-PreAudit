const FormError = ({ message }) => {
  return (
    <span className={`text-[10px] text-[#ff0000] pt-1 absolute top-full`}>
      {message}
    </span>
  );
};

export default FormError;
