import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 300 วินาที = 5 นาที

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("Bookings Timeout"); // แจ้งเตือนเมื่อเวลาหมด
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // ล้าง timer เมื่อ component ถูกถอดออก
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="countdown-timer rounded-lg bg-orange-200 p-1">
      <div className="font-inter text-xl text-red-700">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
