import { useTimer } from "@/lib/TimerContext";

export default function CountdownTimer() {
  const { remainingTime } = useTimer(); // ใช้ค่า remainingTime จาก context

  // แปลง seconds เป็นรูปแบบ mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="countdown-timer rounded-lg bg-orange-200 p-1">
      <div className="font-inter text-xl text-red-700">
        {formatTime(remainingTime)} {/* แสดงเวลาในรูปแบบที่ต้องการ */}
      </div>
    </div>
  );
}
