import { forwardRef } from "react";
import { Input } from "./Input";
import FormError from "./FormError";

const InputWithLabel = forwardRef(
  (
    { label, className, className2, className3, id, name, error, ...rest },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label
            className={`block tracking-wide text-black 2xl:text-[16px] text-[14px] font-[400] mb-2 leading-[18px] ${
              className3 && className3
            }`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className={`${className && className}`}>
          <Input
            {...rest}
            id={id}
            name={name}
            ref={ref}
            className={className2}
          />
        </div>
        {error && <FormError message={error} />}
      </div>
    );
  }
);

export default InputWithLabel;
