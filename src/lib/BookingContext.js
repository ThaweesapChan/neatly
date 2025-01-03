import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext({
  bookingData: { basicInfo: {}, specialRequest: {}, paymentMethod: {} },
  setBookingData: () => {},
});

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    basicInfo: {},
    specialRequest: {},
    paymentMethod: {},
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
