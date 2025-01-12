import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const initialTime = 5; // 5 นาที in seconds
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    // เมื่อ remainingTime ลดลงจนถึง 0
    if (remainingTime === 0) {
      setIsTimeUp(true); // เวลาได้หมดแล้ว
    }
  }, [remainingTime]);

  useEffect(() => {
    // Set an interval for countdown
    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Clear the interval when component unmounts
  }, []);

  const resetTimer = () => {
    setRemainingTime(initialTime); // รีเซ็ตเวลาให้กลับไปที่ 5 นาที
    setIsTimeUp(false); // รีเซ็ตสถานะเวลาหมด
  };

  return (
    <TimerContext.Provider value={{ remainingTime, isTimeUp, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
