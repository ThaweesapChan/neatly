// src/components/ui/select.js

import React from "react";

export const Select = ({ value, onValueChange, children }) => {
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  );
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export const SelectTrigger = ({ children }) => {
  // ห่อหุ้ม Trigger ด้วย div แทนที่จะอยู่ภายใน <select>
  return <div>{children}</div>;
};

export const SelectValue = ({ children }) => {
  return <div>{children}</div>;
};
