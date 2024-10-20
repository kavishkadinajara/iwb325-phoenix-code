/* eslint-disable @typescript-eslint/no-unused-vars */
import { createHash } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.text();
  const formData = new URLSearchParams(body);

  // Extract specific fields
  const order_id = formData.get("order_id");
  const payment_id = formData.get("payment_id");
  const amount = formData.get("payhere_amount");
  const md5sig = formData.get("md5sig");
  const method = formData.get("method");
  const status_code = formData.get("status_code");
  const event_organizer = formData.get("custom_1");
  const ticket_price = formData.get("custom_2");

  // Validate payment
  const hashedMerchantSecret = createHash("md5")
    .update(process.env.PAYHERE_MERCHANT_SECRET!)
    .digest("hex")
    .toUpperCase();
  const hashOnServer = createHash("md5")
    .update(
      process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID! +
        order_id +
        amount +
        "LKR" +
        status_code +
        hashedMerchantSecret
    )
    .digest("hex")
    .toUpperCase();

  if (md5sig !== hashOnServer) {
    console.log("Invalid payment");
    return NextResponse.json({ message: "Invalid payment" });
  }

  try {
    // Create the payment and ticket data objects
    const paymentData = {
      name: "John Doe", // Replace with actual user data if available
      email: "john@example.com", // Replace with actual user data if available
      mobile: "1234567890", // Replace with actual user data if available
      ticket_id: order_id,
      payment_id: payment_id,
      payment_method: method === "Visa" ? 1 : 2, // Adjust payment method based on your logic
      amount: amount,
      status_code: status_code === "2" ? 1 : status_code === "-3" ? 2 : 0, // 0 = not-paid, 1 = paid, 2 = refunded
    };

    // Make the HTTP request to the Ballerina backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BAL_URL}/events/payhere`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      console.log("Failed to send payment and ticket data");
      return NextResponse.json({ message: "Internal server error" });
    }

    const result = await response.json();

    // Handle the response from the backend
    if (result.message === "success") {
      return NextResponse.json({ message: "success" });
    } else {
      console.log("Backend error:", result);
      return NextResponse.json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
