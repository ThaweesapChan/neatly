import { useContext, createContext, useState } from "react";

const BookingDetailContext = createContext({
  bookingDetail: {
    checkIn: "",
    checkOut: "",
    roominfo: {},
  },
  setBookingDetail: () => {},
});
export function BookingDetailProvider({ children }) {
  const [bookingDetail, setBookingDetail] = useState({
    checkIn: "",
    checkOut: "",
    roominfo: {},
  });
  return (
    <BookingDetailContext.Provider value={{ bookingDetail, setBookingDetail }}>
      {children}
    </BookingDetailContext.Provider>
  );
}

export function useBookingDetail() {
  return useContext(BookingDetailContext);
}
