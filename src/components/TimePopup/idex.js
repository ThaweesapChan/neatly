import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTimer } from "@/lib/TimerContext"; // ใช้ TimerContext เพื่อดึงข้อมูลเวลา

Modal.setAppElement("#__next"); // ตั้งค่าให้ป้องกัน error ของ Next.js

const TimeUpPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTimeUp, resetTimer } = useTimer(); // ดึงข้อมูลจาก TimerContext
  const router = useRouter();

  // เมื่อเวลาหมดให้เปิดป็อปอัพ
  useEffect(() => {
    if (isTimeUp) {
      setIsModalOpen(true); // เปิดป็อปอัพเมื่อเวลาหมด
    }
  }, [isTimeUp]);

  const handleRedirect = () => {
    setIsModalOpen(false);
    router.push("/"); // เปลี่ยนเส้นทางไปหน้าที่ต้องการ
  };

  const closeModal = () => {
    setIsModalOpen(false); // ปิดป็อปอัพ
  };

  return (
    <div>
      {/* ป็อปอัพ */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Time's Up Popup"
        ariaHideApp={false} // ต้องใส่ให้ Next.js ไม่แจ้ง error
        className="fixed inset-0 z-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
      >
        <div className="mx-auto max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Time is up!
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Time's up! You can return to the main page to proceed.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRedirect}
              className="rounded-sm bg-orange-600 px-6 py-2 text-white transition duration-300 hover:bg-orange-300"
            >
              Back To HomePage
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TimeUpPopup;
