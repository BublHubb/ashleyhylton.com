import { functions } from "@/firebase/init";
import { httpsCallable } from "firebase/functions";
export async function SendEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const ashleyHytonWebMessage = httpsCallable(
    functions,
    "ashleyHytonWebMessage"
  );
  const emailResponse = ashleyHytonWebMessage({
    name: name,
    email: email,
    subject: subject,
    message: message,
  })
    .then((response) => {
      console.log("Ok");
      return "OK";
    })
    .catch((error) => {
      console.log("Error1:", error);
      return { Error1: error };
    });

  return { emailResponse };
}
