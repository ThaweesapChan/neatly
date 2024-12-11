import "@/styles/globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { BookingProvider } from "@/lib/BookingContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <Component {...pageProps} />
      </BookingProvider>
    </AuthProvider>
  );
}
