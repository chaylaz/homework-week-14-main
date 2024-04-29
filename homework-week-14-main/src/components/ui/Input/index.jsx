import React from "react";

const Input = (props) => {
  const { label, name, type, placeholder } = props;

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder-opacity-50 mb-4"
      />
    </div>
  );
};

export default Input;
