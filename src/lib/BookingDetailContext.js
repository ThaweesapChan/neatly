import React, { createContext, useState, useContext } from "react";

// Context Initialization
const BookingDetailContext = createContext();

// Provider Component
export function BookingDetailProvider({ children }) {
  // ตั้งค่า default value สำหรับ bookingDetail
  const [bookingDetail, setBookingDetailState] = useState({
    roominfo: {},
    check_in_date: "",
    check_out_date: "",
    userinfo: {},
    additionalInfo: {},
  });

  // ฟังก์ชันในการอัปเดตข้อมูลของ bookingDetail
  const updateBookingDetail = (newDetails) => {
    setBookingDetailState((prevDetails) => {
      const updatedDetails = { ...prevDetails, ...newDetails };
      return updatedDetails;
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

// Hook for using BookingDetailContext
export function useBookingDetail() {
  return useContext(BookingDetailContext);
}
