import React, { createContext, useContext, useState } from "react";

const TotalPriceContext = createContext({
  totalprice: "",
  setTotal: () => {},
});

export function TotalProvider({ children }) {
  const [total, setTotal] = useState({
    totalprice: "",
  });

  return (
    <TotalPriceContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalPriceContext.Provider>
  );
}

export function useTotal() {
  return useContext(TotalPriceContext);
}
