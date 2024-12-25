import "@/styles/globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { BookingProvider } from "@/lib/BookingContext";
import { BookingDetailProvider } from "@/lib/BookingDetailContext";
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <BookingDetailProvider>
          <Component {...pageProps} />
        </BookingDetailProvider>
      </BookingProvider>
    </AuthProvider>
  );
}
