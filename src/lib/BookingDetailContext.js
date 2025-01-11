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

  const resetBookingDetail = () => {
    setBookingDetailState({
      user_id: null,
      roominfo: {},
      check_in_date: "",
      check_out_date: "",
      userinfo: {},
      additionalInfo: {},
      totalprice: 0,
    });
  };

  const calculateTotalPrice = (details) => {
    const { roominfo, check_in_date, check_out_date, additionalInfo } = details;
    const days =
      (new Date(check_out_date) - new Date(check_in_date)) / (1000 * 3600 * 24);
    const roomPrice = roominfo?.promotion_price || roominfo?.price || 0;

    // ตรวจสอบและคำนวณราคาของ special requests
    const specialRequestTotal = Array.isArray(additionalInfo?.specialRequests)
      ? additionalInfo.specialRequests.reduce((acc, req) => {
          if (
            [
              "Airport transfer",
              "Extra bed",
              "Phone chargers and adapters",
            ].includes(req.name)
          ) {
            // กรณีไม่ต้องคูณจำนวนวัน
            return acc + (req?.price || 0);
          } else {
            // กรณีต้องคูณจำนวนวัน
            return acc + (req?.price || 0) * days;
          }
        }, 0)
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
      value={{ bookingDetail, updateBookingDetail, resetBookingDetail }}
    >
      {children}
    </BookingDetailContext.Provider>
  );
}

export function useBookingDetail() {
  return useContext(BookingDetailContext);
}
