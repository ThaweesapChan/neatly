import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  // ตรวจสอบว่าเป็น POST request หรือไม่
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { roomId, status } = req.body;

  // ตรวจสอบว่า roomId และ status ถูกส่งมา
  if (!roomId || !status) {
    return res.status(400).json({ message: 'roomId and status are required' });
  }

  // ตรวจสอบว่าค่า status เป็นหนึ่งในสถานะที่กำหนดไว้หรือไม่
  const validStatuses = [
    "Vacant",
    "Occupied",
    "Assign Clean",
    "Assign Dirty",
    "Vacant Clean",
    "Vacant Clean Inspected",
    "Vacant Clean Pick Up",
    "Occupied Clean",
    "Occupied Clean Inspected",
    "Occupied Dirty",
    "Out of Order",
    "Out of Service",
    "Out of Inventory",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // อัปเดตสถานะของห้องในฐานข้อมูล
    const { data, error } = await supabase
      .from('rooms')
      .update({ status })
      .eq('room_id', roomId)
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Room status updated successfully', room: data });
  } catch (error) {
    console.error('Error updating room status:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}