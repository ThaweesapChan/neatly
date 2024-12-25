// src/components/ui/card.js
import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg bg-white p-4 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export { Card };
