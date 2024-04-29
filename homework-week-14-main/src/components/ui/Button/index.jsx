import React from "react";

const Button = (props) => {
  const { type, onClick, children, variant = "primary", className } = props;

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`h-10 px-6 font-semibold rounded-md ${className} text-white`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
