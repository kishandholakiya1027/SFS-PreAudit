import { forwardRef } from "react";

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`block w-full text-black border border-[#D2D8DD] sm:text-sm sm:leading-4 p-2 bg-white rounded-sm ${
        className && className
      }`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
