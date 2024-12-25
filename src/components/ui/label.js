// src/components/ui/label.js
import React from "react";

const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-gray-700">
      {children}
    </label>
  );
};

export { Label };
