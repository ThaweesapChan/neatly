import React, { createContext, useState, useContext } from "react";

const BookingDetailContext = createContext();

export function BookingDetailProvider({ children }) {
  const [bookingDetail, setBookingDetailState] = useState({
    user_id: null,
    roominfo: {},
    check_in_date: "",
    check_out_date: "",
    userinfo: {},
    additionalInfo: {},
    totalprice: 0,
  });

  const calculateTotalPrice = (details) => {
    const { roominfo, check_in_date, check_out_date, additionalInfo } = details;
    const days =
      (new Date(check_out_date) - new Date(check_in_date)) / (1000 * 3600 * 24);
    const roomPrice = roominfo?.promotion_price || 0;

    const specialRequestTotal = Array.isArray(additionalInfo?.specialRequests)
      ? additionalInfo.specialRequests.reduce(
          (acc, req) => acc + (req?.price || 0),
          0,
        )
      : 0;

    return roomPrice * days + specialRequestTotal;
  };

  const updateBookingDetail = (newDetails) => {
    setBookingDetailState((prevDetails) => {
      const updatedDetails = { ...prevDetails, ...newDetails };
      return {
        ...updatedDetails,
        totalprice: calculateTotalPrice(updatedDetails),
      };
    });
  };

  return (
    <BookingDetailContext.Provider
      value={{ bookingDetail, updateBookingDetail }}
    >
      {children}
    </BookingDetailContext.Provider>
  );
}

export function useBookingDetail() {
  return useContext(BookingDetailContext);
}
