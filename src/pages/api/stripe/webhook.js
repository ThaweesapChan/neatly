import Stripe from "stripe";
import { buffer } from "micro";
import supabase from "@/utils/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Stripe ต้องการ raw body
  },
};

async function updateBookingStatus(paymentIntentId, status) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("payment_intent_id", paymentIntentId);

  if (error) {
    console.error(`Failed to update booking: ${error.message}`);
  } else {
    console.log(`Booking updated successfully: ${data}`);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      const event = stripe.webhooks.constructEvent(
        await buffer(req),
        sig,
        endpointSecret,
      );

      const paymentIntent = event.data.object;
      // Handle different event types
      switch (event.type) {
        case "payment_intent.succeeded":
          await updateBookingStatus(paymentIntent.id, "confirmed");
          console.log("✅ Payment succeeded:", event.data.object);
          break;
        case "payment_intent.payment_failed":
          await updateBookingStatus(paymentIntent.id, "failed");
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.status(200).send("Event received");
    } catch (err) {
      console.error("⚠️ Webhook Error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
