import supabase from "@/utils/supabaseClient";
const createUser = async () => {
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "securepassword123",
  };

  try {
    // ใช้ signUp เพื่อสมัครสมาชิกใหม่
    const { user, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      throw error;
    }

    // บันทึกข้อมูลผู้ใช้ในตาราง users
    const { data, error: insertError } = await supabase
      .from("users") // ตาราง users
      .insert([
        {
          id: user.id, // ใช้ user ID ที่ได้จากการสมัครสมาชิก
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        },
      ]);

    if (insertError) {
      throw insertError;
    }

    console.log("User created successfully:", data);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};

// เรียกใช้ฟังก์ชัน
createUser();
