import { functions } from "@/firebase/init";
import { httpsCallable } from "firebase/functions";
export async function PaymentIntent({
  currentTotal,
}: {
  currentTotal: number;
}) {
  const total = currentTotal * 100;
  console.log(total);
  const createStripePaymentWeb = httpsCallable(
    functions,
    "createStripePaymentWeb"
  );
  const clientSecret = await createStripePaymentWeb({
    unitAmount: total,
  })
    .then((response: any) => {
      const error = response.data.error;

      const clientSecret = response.data.paymentIntentClientSecret;
      console.log("clientSecret2:", clientSecret);

      if (error) {
        return "Error";
      } else {
        return {
          clientSecret: clientSecret,
        };
      }
    })
    .catch((error) => {
      return "Error";
    });

  return { clientSecret: clientSecret };
}
