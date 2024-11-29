import Homepage from "./homepage";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import Searchresult from "../component/searchresult";

import Searchresultpage from "./searchresultpage/idex";
export default function Home() {
  return (
    <div>
      {/* landing page */}
      <Navbar />
      <Searchresult />
      <Footer />
    </div>
  );
}
