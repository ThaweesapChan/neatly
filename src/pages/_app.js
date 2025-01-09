import "@/styles/globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { BookingProvider } from "@/lib/BookingContext";
import { BookingDetailProvider } from "@/lib/BookingDetailContext";
import { TimerProvider } from "@/lib/TimerContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <BookingDetailProvider>
          <TimerProvider>
            <ToastContainer />
            <Component {...pageProps} />
          </TimerProvider>
        </BookingDetailProvider>
      </BookingProvider>
    </AuthProvider>
  );
}
