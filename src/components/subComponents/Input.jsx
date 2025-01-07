import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", classname = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
