"use client";
import BackgroundBlur from "./Backgrounds/BackgroundBlur";
import BackgroundBlur2 from "./Backgrounds/BackgroundBlur2";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { SendEmail } from "./SendEmail";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

export default function Contact({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
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
        })
        .catch((error) => {
          setMessageUnsuccessful(true);
          setSubmitting(false);
        });
  };
  return (
    <div>
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
      <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-y-visible relative  ">
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
        >
          <div className="flex justify-start w-1/2  items-start">
            <BackgroundBlur2 />
          </div>

          <div className="flex justify-end items-end w-1/2 ">
            <BackgroundBlur />
          </div>
        </motion.div>
        <div className="z-20 max-w-screen-xl">
          <div className="flex rounded-lg   flex-col container items-center justify-center p-2 z-50 max-w-lg">
            {" "}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2 w-fit  justify-center items-center z-50 bg-gray-50/30 rounded-2xl p-2  "
            >
              <motion.div
                initial={{
                  y: -0,
                  opacity: 0,
                }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                }}
                className="z-50"
              >
                <h1 className="title m-4">Contact Me!</h1>
              </motion.div>
              <motion.div
                initial={{
                  y: -0,
                  opacity: 0,
                }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.5,
                }}
                className="z-50"
              >
                <p className="text-xl ">
                  Contact me via email or fill out the form below!
                </p>
              </motion.div>
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
                    className="heroButton bg-[#341948] text-gray-50 flex justify-center items-center align-middle mt-4 hover:transform hover:grow "
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
  );
}
