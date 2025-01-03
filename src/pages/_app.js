import "@/styles/globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { BookingProvider } from "@/lib/BookingContext";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </BookingProvider>
    </AuthProvider>
  );
}
