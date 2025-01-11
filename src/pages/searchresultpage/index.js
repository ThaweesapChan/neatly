import React from "react";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import Searchresult from "@/component/searchresult";

export default function Searchresultpage() {
  return (
    <>
      <div>
        <Navbar />
        <Searchresult />
        <Footer />
      </div>
    </>
  );
}
