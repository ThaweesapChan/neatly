import React from "react";
import Aboutsection from "@/component/aboutsection";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import Herosection from "@/component/herosection";
import RoomsSuits from "@/component/roomssuits";
import Servicesection from "@/component/servicesection";
import Testimonial from "@/component/testimonial";
function Homepage() {
  return (
    <div>
      <Navbar />
      <Herosection />
      <Aboutsection />
      <Servicesection />
      <RoomsSuits />
      <Testimonial />
      <Footer />
    </div>
  );
}
export default Homepage;
