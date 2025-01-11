import React, { createContext, useContext, useState, useEffect } from "react";
const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const initialTime = 5 * 60; // 5 นาที
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Clear interval เมื่อ component ถูก unmount
  }, []);

  // ฟังก์ชันสำหรับรีเซ็ต Timer
  const resetTimer = () => {
    setRemainingTime(initialTime);
  };

  return (
    <TimerContext.Provider value={{ remainingTime, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
