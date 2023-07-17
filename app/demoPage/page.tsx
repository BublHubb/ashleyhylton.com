"use client";
import EventListing from "@/components/EventListing";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
type Props = {};
const stripePromise = loadStripe(
  "pk_test_51Hnio6EEJeuneSMuyA0UlHK6vWnwI9Nis8KlQiUy3o2Nfcn3lqU8dZLbkGNB7IPZg7fXqQd7tijRo34ZdOMazqTK00G4XyOiJw"
);

function page({}: Props) {
  return (
    <div className=" w-full bg-white justify-center self-center text-[#274472] text-xl font-bold text-center flex items-center ">
      <Elements stripe={stripePromise}>
        <EventListing />
      </Elements>
    </div>
  );
}

export default page;
