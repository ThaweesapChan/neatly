import React, { createContext, useContext, useState } from "react";

// Create context
const TotalPriceContext = createContext({
  totalprice: 0,
  setTotalPrice: () => {},
});

// Provider component
export function TotalProvider({ children }) {
  const [totalprice, setTotalPrice] = useState(0);

  return (
    <TotalPriceContext.Provider value={{ totalprice, setTotalPrice }}>
      {children}
    </TotalPriceContext.Provider>
  );
}

// Custom hook for consuming context
export function useTotal() {
  const context = useContext(TotalPriceContext);

  if (!context) {
    throw new Error("useTotal must be used within a TotalProvider");
  }

  return context;
}
