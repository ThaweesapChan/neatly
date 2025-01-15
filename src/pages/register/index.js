import { useState, useEffect } from "react";
import InputField from "@/component/form";
import { Button } from "@/component/button";
import Navbar from "@/component/navbar";
import { uploadFile } from "../api/upload";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null);
  const [country, setCountry] = useState([]);

  const [profile, setProfile] = useState(null);
  const [errorMSG, setErrorMSG] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    date_of_birth: "",
    country: "",
    confirmPassword: "",
    profile_picture_url: "",
  });
  const showError = errorMSG === "";

  useEffect(() => {
    // โหลดรายชื่อประเทศจาก API
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      const sortedCountries = data
        .map((country) => ({
          name: country.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountry(sortedCountries);
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setProfile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // เก็บ URL ของไฟล์ภาพที่เลือก
      };
      reader.readAsDataURL(file); // อ่านไฟล์ภาพ
    }
  };

  const handleCancel = () => {
    setSelectedImage(null); // รีเซ็ตค่า selectedImage เป็น null
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบ First Name
    const nameRegex = /^[A-Za-z\s]{5,}$/; // รองรับการเว้นวรรค
    if (!formData.first_name.trim() || !nameRegex.test(formData.first_name)) {
      setErrorMSG(
        "First Name must contain only letters, spaces, and be at least 5 characters long.",
      );
      return;
    }

    // ตรวจสอบ Last Name
    if (!formData.last_name.trim() || !nameRegex.test(formData.last_name)) {
      setErrorMSG(
        "Last Name must contain only letters, spaces, and be at least 5 characters long.",
      );
      return;
    }

    // ตรวจสอบ Username
    if (!formData.username.trim() || !nameRegex.test(formData.username)) {
      setErrorMSG(
        "Username must contain only letters, spaces, and be at least 5 characters long.",
      );
      return;
    }

    // 4) ตรวจสอบ Date of Birth
    // ตรวจสอบว่า Date of Birth ไม่ว่าง
    if (!formData.date_of_birth) {
      setErrorMSG("Please select your Date of Birth.");
      return;
    }

    const today = new Date();
    const birthDate = new Date(formData.date_of_birth);

    // คำนวณอายุ
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // ถ้าเดือนหรือวันเกิดยังไม่ถึงปีปัจจุบัน ให้ลดอายุลง 1 ปี
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    // ตรวจสอบว่าอายุ < 18 ปี
    if (age < 18) {
      setErrorMSG("You must be at least 18 years old to register.");
      return;
    }

    // ตรวจสอบว่า Date of Birth เป็นวันในอนาคตหรือไม่
    if (birthDate >= new Date(today.toDateString())) {
      setErrorMSG("Date of Birth must be in the past (before today).");
      return;
    }

    // 5) ตรวจสอบ Country
    //    - ต้องไม่เป็นค่าว่าง
    if (!formData.country) {
      setErrorMSG("Please select your country.");
      return;
    }

    // ตรวจสอบว่า password และ confirmPassword ตรงกัน
    if (formData.password !== formData.confirmPassword) {
      setErrorMSG("Passwords do not match");
      return;
    }

    // ตรวจสอบว่า email ถูกต้อง
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMSG("Invalid email format");
      return;
    }

    // ตรวจสอบว่า phone_number ต้องเป็นตัวเลขเท่านั้น
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone_number)) {
      setErrorMSG("Phone number must contain 10 digits only");
      return;
    }

    // ส่งข้อมูลไปยัง API โดยไม่ส่ง confirmPassword
    try {
      // ตรวจสอบว่ามีไฟล์ภาพหรือไม่ ถ้ามีก็ upload
      if (profile) {
        const url = await uploadFile(profile); // อัพโหลดไฟล์และรับ URL
        if (url) {
          //console.log(url);
          formData.profile_picture_url = url;
        } else {
          //console.error("Failed to upload file.");
        }
      }

      // ตัด confirmPassword ออกก่อนส่ง
      const { confirmPassword, ...dataToSubmit } = formData;
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/");
      } else {
        setErrorMSG(result.message || "Something went wrong!");
      }
    } catch (error) {
      //console.error(error);
      setErrorMSG("An error occurred while submitting the form.");
    }
  };
  return (
    <section>
      <Navbar />
      <div className="bg-gray-100 px-[4%] py-[5%] md:hidden">
        <article className="flex flex-col gap-10">
          <div>
            <h1 className="font-notoSerif text-5xl font-medium text-green-800">
              Register
            </h1>
          </div>
          {/*form */}
          <div>
            <h1 className="font-inter text-xl font-semibold leading-6 text-gray-600">
              Basic information
            </h1>
            <InputField
              label="First Name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              errorInput={errorMSG}
              errorSpec={
                "First Name must contain only letters, spaces, and be at least 5 characters long."
              }
              required
            />
            <InputField
              label="Last Name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              errorInput={errorMSG}
              errorSpec={
                "Last Name must contain only letters, spaces, and be at least 5 characters long."
              }
              required
            />
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              errorInput={errorMSG}
              errorSpec={
                "Username must contain only letters, spaces, and be at least 5 characters long."
              }
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              errorInput={errorMSG}
              errorSpec={"Invalid email format"}
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              errorInput={errorMSG}
              errorSpec={"Passwords do not match"}
              required
            />
            <InputField
              label="Phone Number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              errorInput={errorMSG}
              errorSpec={"Phone number must contain 10 digits only"}
              required
            />
            <div className="form-group my-[16px] w-full font-inter">
              <label
                htmlFor="dateOfBirth"
                className="mb-2 block text-[16px] font-normal"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 p-3 text-gray-400"
              />

              {errorMSG ===
                "You must be at least 18 years old to register." && (
                <p className="mt-2 text-red-500">
                  You must be at least 18 years old to register.
                </p>
              )}

              {errorMSG === "Please select your Date of Birth." && (
                <p className="mt-2 text-red-500">
                  Please select your Date of Birth.
                </p>
              )}

              <style jsx>{`
                input[type="date"]::-webkit-calendar-picker-indicator {
                  color: gray;
                  opacity: 0.5;
                }
              `}</style>
            </div>
            <div className="form-group my-[16px] w-full font-inter">
              <label
                htmlFor="country"
                className="mb-2 block text-[16px] font-normal"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-[4px] border border-gray-300 pl-3 font-inter shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                style={{
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: 400,
                  borderRadius: "4px",
                  borderWidth: "1px",
                }}
              >
                <option value="" disabled>
                  Select your country
                </option>
                {country.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errorMSG === "Please select your country." && (
                <p className="mt-2 text-red-500">Please select your country.</p>
              )}
            </div>

            {/*input picture*/}
            <div className="my-10 border-t-2 border-gray-400"></div>

            <div className="flex flex-col items-start gap-6">
              <h1 className="font-inter text-xl font-semibold leading-6 text-gray-600">
                Profile Picture
              </h1>

              <label
                className={`w-[50%] cursor-pointer ${selectedImage ? "" : "bg-gray-600 bg-opacity-15"}`}
              >
                {/* ถ้ามีการเลือกภาพแล้ว ให้แสดงรูปภาพแทนข้อความ */}
                {selectedImage ? (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Selected Profile"
                      className="h-auto w-full rounded-md"
                    />
                    {/* ปุ่มยกเลิกที่มุมขวาบน */}
                    <button
                      onClick={handleCancel}
                      className="absolute right-2 top-2 rounded-full bg-white px-2 text-orange-600"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="flex aspect-[3/2] h-full w-full flex-col items-center justify-center">
                    <div className="text-5xl text-orange-600">+</div>
                    <h1 className="text-orange-600">Upload photo</h1>
                  </div>
                )}

                {/* ปุ่ม input ที่ซ่อนและจะเปิดเมื่อคลิก */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/*button*/}
            <div className="mt-6">
              <Button
                type="1"
                name="Register"
                style="w-full"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </article>
      </div>

      {/*DeskTop*/}
      <div className="hidden md:block">
        <div
          className="w-screen px-[12%] pb-16 pt-12"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 19.66%, rgba(0, 0, 0, 0) 100%), url("/asset/loginduochair.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex h-full w-full flex-col gap-20 bg-gray-100 p-[7%] pb-11">
            {/* เนื้อหาหรือองค์ประกอบเพิ่มเติมในส่วนนี้ */}
            <h1 className="font-notoSerif text-5xl font-medium text-green-800">
              Register
            </h1>
            <div>
              <h1 className="font-inter text-xl font-semibold leading-6 text-gray-600">
                Basic information
              </h1>
              <div>
                {/* ส่วนของ form*/}
                {/* ส่วนของ form ซ้าย*/}
                <div className="flex w-full justify-between gap-[5%] bg-gray-100">
                  <div className="w-[50%] bg-gray-100">
                    <InputField
                      label="First Name"
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      errorInput={errorMSG}
                      errorSpec={
                        "First Name must contain only letters, spaces, and be at least 5 characters long."
                      }
                      required
                    />
                    <InputField
                      label="Username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      errorInput={errorMSG}
                      errorSpec={
                        "Username must contain only letters, spaces, and be at least 5 characters long."
                      }
                      required
                    />
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      errorInput={errorMSG}
                      errorSpec={"Signup requires a valid password"}
                      required
                    />
                    <InputField
                      label="Phone Number"
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      errorInput={errorMSG}
                      errorSpec={"Phone number must contain 10 digits only"}
                      required
                    />
                    <div className="form-group my-[16px] w-full font-inter">
                      <label
                        htmlFor="country"
                        className="mb-2 block text-[16px] font-normal"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-[4px] border border-gray-300 pl-3 font-inter shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        style={{
                          height: "48px",
                          fontSize: "16px",
                          fontWeight: 400,
                          borderRadius: "4px",
                          borderWidth: "1px",
                        }}
                      >
                        <option className="text-gray-300" value="" disabled>
                          Select your country
                        </option>
                        {country.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errorMSG === "Please select your country." && (
                        <p className="mt-2 text-red-500">
                          Please select your country.
                        </p>
                      )}
                    </div>
                  </div>
                  {/* ส่วนของ form ขวา*/}
                  <div className="w-[50%] bg-gray-100">
                    <InputField
                      label="Last Name"
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      errorInput={errorMSG}
                      errorSpec={
                        "Last Name must contain only letters, spaces, and be at least 5 characters long."
                      }
                      required
                    />
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      errorInput={errorMSG}
                      errorSpec={"Invalid email format"}
                    />
                    <InputField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      errorInput={errorMSG}
                      errorSpec={"Passwords do not match"}
                      required
                    />
                    <div className="form-group my-[16px] w-full font-inter">
                      <label
                        htmlFor="dateOfBirth"
                        className="mb-2 block text-[16px] font-normal"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full rounded border border-gray-300 p-3 text-gray-400"
                      />

                      {errorMSG ===
                        "You must be at least 18 years old to register." && (
                        <p className="mt-2 text-red-500">
                          You must be at least 18 years old to register.
                        </p>
                      )}

                      {errorMSG === "Please select your Date of Birth." && (
                        <p className="mt-2 text-red-500">
                          Please select your Date of Birth.
                        </p>
                      )}
                      <style jsx>{`
                        input[type="date"]::-webkit-calendar-picker-indicator {
                          color: gray;
                          opacity: 0.5;
                        }
                      `}</style>
                    </div>
                  </div>
                </div>
                {/* ส่วนของ profile picture*/}
                <div className="my-10 border-t-2 border-gray-400"></div>
                <div className="flex flex-col items-start gap-6">
                  <h1 className="font-inter text-xl font-semibold leading-6 text-gray-600">
                    Profile Picture
                  </h1>

                  <label
                    className={`w-[50%] cursor-pointer ${selectedImage ? "" : "bg-gray-600 bg-opacity-15"}`}
                  >
                    {/* ถ้ามีการเลือกภาพแล้ว ให้แสดงรูปภาพแทนข้อความ */}
                    {selectedImage ? (
                      <div className="relative flex h-full w-full items-center justify-center">
                        <img
                          src={selectedImage}
                          alt="Selected Profile"
                          className="h-auto w-full rounded-md"
                        />
                        {/* ปุ่มยกเลิกที่มุมขวาบน */}
                        <button
                          onClick={handleCancel}
                          className="absolute right-2 top-2 rounded-full bg-white px-2 text-orange-600"
                        >
                          &times;
                        </button>
                      </div>
                    ) : (
                      <div className="flex aspect-[3/2] h-full w-full flex-col items-center justify-center">
                        <div className="text-5xl text-orange-600">+</div>
                        <h1 className="text-orange-600">Upload photo</h1>
                      </div>
                    )}

                    {/* ปุ่ม input ที่ซ่อนและจะเปิดเมื่อคลิก */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
            {/* ส่วนของ ปุ่ม register ขวา*/}
            <Button
              type="1"
              name="Register"
              style="w-full"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
