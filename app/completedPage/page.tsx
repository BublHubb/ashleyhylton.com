"use client";
import * as successAnimation from "@/components/Animations/successAnimation.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { SendEmail } from "../../components/SendEmail";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useRouter } from "next/navigation";
type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function page() {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [messageSuccessful, setMessageSuccessful] = useState(false);
  const [messageUnsuccessful, setMessageUnsuccessful] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [missingInfo, setMissingInfo] = useState(false);
  const [missingInfoText, setMissingInfoText] = useState("");

  const handleCloseSuccessful = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setMessageSuccessful(false);
  };

  const handleCloseUnsuccessful = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setMissingInfo(false);
  };
  const onSubmit: SubmitHandler<Inputs> = async (submitData) => {
    const name = submitData.name;
    const email = submitData.email;
    const subject = submitData.subject;
    const message = submitData.message;
    setSubmitting(true);

    if (name == "") {
      setMissingInfoText("Please enter a name!");
      setMissingInfo(true);
      setSubmitting(false);

      return;
    } else if (email == "") {
      setMissingInfoText("Please enter a email!");
      setMissingInfo(true);
      setSubmitting(false);
      return;
    } else if (subject == "") {
      setMissingInfoText("Please enter a subject!");
      setMissingInfo(true);
      setSubmitting(false);
      return;
    } else if (message == "") {
      setMissingInfoText("Please enter a message!");
      setMissingInfo(true);
      setSubmitting(false);
      return;
    } else
      await SendEmail({
        name: name,
        email: email,
        subject: subject,
        message: message,
      })
        .then((response) => {
          setMessageSuccessful(true);
          setSubmitting(false);
          console.log("just want an error");
        })
        .catch((error) => {
          setMessageUnsuccessful(true);
          setSubmitting(false);
        });
  };

  const goToHome = () => {
    router.push(`/`);
  };

  return (
    <div className="bg-white flex-1  h-screen overflow-y-auto ">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={messageSuccessful}
          autoHideDuration={6000}
          onClose={handleCloseSuccessful}
        >
          <Alert
            onClose={handleCloseSuccessful}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message submitted!
          </Alert>
        </Snackbar>
        <Snackbar
          open={missingInfo}
          autoHideDuration={6000}
          onClose={handleCloseUnsuccessful}
        >
          <Alert
            onClose={handleCloseUnsuccessful}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {missingInfoText}
          </Alert>
        </Snackbar>
      </Stack>
      <div className="bg-white flex  h-screen overflow-y-auto text-[#274472] text-lg font-bold  flex-col ">
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{
            width: 180,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            margin: 1,
          }}
        />
        <div className="flex flex-col justify-center items-center self-center text-center">
          <p className="text-6xl m-6 ease-in duration-300 transition ">
            Success!
          </p>
          <p className="m-2 text-2xl">
            Thank you for trying the BublHubb demo!
          </p>
          <p className="text-lg font-light m-2">
            I would love to hear any feedback from your experience. Please fill
            out the form below and/or go back to the home page
          </p>
          <div
            onClick={goToHome}
            className="heroButton bg-[#341948] text-gray-50 flex justify-center items-center align-middle mt-4 hover:transform hover:grow font-normal cursor-pointer z-50"
          >
            <p>Home</p>
          </div>

          <div className=" flex flex-col  items-center justify-center text-center overflow-y-visible relative  ">
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 4,
              }}
              viewport={{ once: true }}
              className=" flex flex-row w-screen h-screen absolute justify-center"
            ></motion.div>
            <div className="z-20 max-w-screen-xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-2 w-fit  justify-center items-center z-50 bg-gray-50/30 rounded-2xl p-2  "
              >
                <div className="flex flex-row  align-middle items-center justify-center">
                  <EnvelopeIcon className="h-10 w-10 p-2  animate-pulse " />
                  <p>ashleyhylton91@gmail.com</p>
                </div>
                <motion.div
                  initial={{
                    x: 0,
                    opacity: 0,
                  }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                  }}
                  className="text-start"
                >
                  <p className="pl-2 text-base ">Name:</p>
                  <input
                    {...register("name")}
                    placeholder="Name..."
                    className="contactInput"
                    type="text"
                  />
                </motion.div>
                <motion.div
                  initial={{
                    x: 0,
                    opacity: 0,
                  }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                  }}
                  className="text-start"
                >
                  <p className="pl-2 text-base ">E-mail:</p>
                  <input
                    {...register("email")}
                    placeholder="Email..."
                    className="contactInput"
                    type="email"
                  />
                </motion.div>
                <motion.div
                  initial={{
                    x: 0,
                    opacity: 0,
                  }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.8,
                  }}
                  className="text-start"
                >
                  <p className="pl-2 text-base ">Subject:</p>
                  <input
                    {...register("subject")}
                    placeholder="Subject..."
                    className="contactInput"
                    type="text"
                  />
                </motion.div>
                <motion.div
                  initial={{
                    x: 0,
                    opacity: 0,
                  }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2.1,
                  }}
                  className="text-start"
                >
                  <p className="pl-2 text-base ">Message:</p>
                  <textarea
                    {...register("message")}
                    placeholder="Message..."
                    className="contactInput"
                  />
                </motion.div>
                {submitting == false ? (
                  <motion.div
                    initial={{
                      x: 0,
                      opacity: 0,
                    }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 2.1,
                    }}
                  >
                    <button
                      type="submit"
                      className="heroButton bg-[#341948] text-gray-50 flex justify-center items-center align-middle mt-4 hover:transform hover:grow font-normal "
                    >
                      Submit
                    </button>
                  </motion.div>
                ) : (
                  <div>
                    <p className="bg-[#E0E0E0]  py-5 px-10 rounded-md text-lg text-[#B1B1B1] font-bold">
                      Submitting...
                      <CircularProgress size={18} sx={{ color: "inherit" }} />
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
