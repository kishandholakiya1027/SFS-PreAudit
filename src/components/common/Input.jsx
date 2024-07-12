import { forwardRef } from "react";

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`block w-full text-black border border-[#D2D8DD] 2xl:text-sm text-[12px] px-2 py-[6px] bg-white rounded-sm ${
        className && className
      }`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
