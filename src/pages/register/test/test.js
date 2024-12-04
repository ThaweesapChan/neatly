import { useState } from "react";
import InputField from "@/component/form";
import { Button } from "@/component/button";
import Navbar from "@/component/navbar";

const RegisterForm = () => {
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่า password และ confirmPassword ตรงกัน
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ตรวจสอบว่า email ถูกต้อง
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format");
      return;
    }

    // ส่งข้อมูลไปยัง API โดยไม่ส่ง confirmPassword
    try {
      const { confirmPassword, ...dataToSubmit } = formData; // ตัด confirmPassword ออก
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
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
              required
            />
            <InputField
              label="Last Name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              required
            />
            <InputField
              label="Phone Number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
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
                id="checkout"
                name="checkout"
                className="w-full rounded border border-gray-300 p-3 text-gray-400"
              />
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
                defaultValue=""
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
                <option>Thailand</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            </div>

            
            {/*input picture*/}
            <div className="my-10 border-t-2 border-gray-400"></div>
            <div className="flex flex-col items-start gap-6">
              <h1 className="font-inter text-xl font-semibold leading-6 text-gray-600">
                Profile Picture
              </h1>
              <button className="w-[50%] bg-gray-600 bg-opacity-15">
                <div className="flex aspect-[3/2] h-full w-full flex-col items-center justify-center">
                  <div className="text-5xl text-orange-600">+</div>
                  <h1 className="text-orange-600">Upload photo</h1>
                </div>
              </button>
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
          className="w-screen px-[12%] pt-12"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 19.66%, rgba(0, 0, 0, 0) 100%), url("/asset/loginduochair.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex h-full w-full flex-col gap-[300px] bg-yellow-600 px-[7%] pb-11">
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
                <div className="flex w-full justify-between gap-[5%] bg-slate-600">
                  <div className="w-[50%] bg-red-600">
                    <InputField
                      label="First Name"
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                    <InputField
                      label="Username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
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
                      label="Phone Number"
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
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
                        defaultValue=""
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
                        <option>Thailand</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  {/* ส่วนของ form ขวา*/}
                  <div className="w-[50%] bg-green-950">
                    <InputField
                      label="Last Name"
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    <InputField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
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
                        id="checkout"
                        name="checkout"
                        className="w-full rounded border border-gray-300 p-3 text-gray-400"
                      />
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
                  <button className="w-[50%] bg-gray-600 bg-opacity-15">
                    <div className="flex aspect-[3/2] h-full w-full flex-col items-center justify-center">
                      <div className="text-5xl text-orange-600">+</div>
                      <h1 className="text-orange-600">Upload photo</h1>
                    </div>
                  </button>
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
