"use client";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { functions } from "../../firebase/init";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
export default function StripeCheckout({
  cartItems,
  clientSecret,
}: {
  cartItems: any;
  clientSecret: string | null;
}) {
  const router = useRouter();
  const elements = useElements();
  const stripe = useStripe();
  const cardStyle = {
    style: {
      base: {
        color: "#274472",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#B1B1B1",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#D21404",
        iconColor: "#D21404",
      },
    },
  };
  const handleChange = async (event: any) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const demoPurchase = httpsCallable(functions, "demoPurchase");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("clientSecret3:", clientSecret);
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    setError(false);
    setProcessing(true);
    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      if (payload.error) {
        setError(true);
        setErrorMessage(`Payment failed ${payload.error.message}`);
        setProcessing(false);
        console.log("Error:", payload.error.message);
      } else {
        await demoPurchase({
          ticketingDetailsDemo: cartItems,
          paymentID: clientSecret,
        })
          .then((response) => {
            console.log("Response1:", response.data);
            router.push(`/completedPage/`);
          })
          .catch((error) => {
            console.log("Error:", error);
          });

        console.log("Success!");
        setSucceeded(true);
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="w-full drop-shadow-lg bg-white rounded-lg p-2">
        <div className="w-72 m-2 ">
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
        </div>
        {error && (
          <div className="card-error" role="alert">
            <p className="text-sm font-bold text-[#D21404]">{errorMessage}</p>
          </div>
        )}
        <div className="flex justify-center">
          {processing ? (
            <div className="processingText">
              <p className="text-sm">Processing...</p>
              <CircularProgress size={18} sx={{ color: "inherit" }} />
            </div>
          ) : (
            <button id="submit">
              <span id="button-text" className="eventPurchaseText">
                Pay now
              </span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
