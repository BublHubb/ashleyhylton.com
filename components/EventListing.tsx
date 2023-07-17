"use client";
import { useEffect, useState, useRef, useContext } from "react";

import { db } from "@/firebase/init";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";
import VideoPlayer from "./VideoPlayer";
import Map from "./Config/Map";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Lottie from "lottie-react";
import * as infoAnimation from "./Animations/info.json";
import { PaymentIntent } from "./Config/PaymentIntent";
import StripeCheckout from "./Config/StripeCheckout";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { TicketIcon } from "@heroicons/react/24/solid";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CircularProgress } from "@mui/material";
import Loader from "./Animations/Loader";

function EventListing() {
  const ticketSection = useRef(null);
  const cartSection = useRef(null);
  const cardSection = useRef(null);

  const [eventDetails, setEventDetails] = useState<any>({});
  const [noEventFound, setNoEventFound] = useState(false);
  const [ticketSelection, setTicketSelection] = useState<any>([]);
  const [dataReady, setDataReady] = useState(false);
  const [cartItems, setCartItems] = useState<any>([]);
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const eventID = eventDetails?.id;
  const nameOfEvent = eventDetails?.nameofevent;
  const tickets = eventDetails?.tickets;

  const eventImage = eventDetails?.mainimage;
  const tags = eventDetails?.tags;
  const startDate = eventDetails?.startdatetext;
  const images = eventDetails?.images;
  const video = eventDetails?.video;

  const description = eventDetails?.description;
  const locationName = eventDetails?.locationname;
  const lat = eventDetails?.locationlat;
  const lng = eventDetails?.locationlng;

  const endDate = eventDetails?.enddatetext;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalSubText, setModalSubText] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const [cardDetails, setCardDetails] = useState(false);

  const scrollToSection = (elementRef: any) => {
    window.scrollTo({ top: elementRef.current.offsetTop, behavior: "smooth" });
  };

  const handleCloseCardDetails = () => {
    setCardDetails(false);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const getEvent = async (): Promise<void> => {
    // try {
    //   const documentRef = doc(db, "events", "0pGzZJHScejRLZo4WhHn");
    //   const snapshot = await getDoc(documentRef);
    //   if (snapshot.exists()) {
    //     console.log("Document:", snapshot.data());
    //     setEventDetails(id: docsnapshot.data());
    //     setDataReady(true);
    //   } else {
    //     console.log("Document does not exist!");
    //     setDataReady(true);
    //     setNoEventFound(true);
    //   }
    // } catch (error) {
    //   console.error("Error fetching document:", error);
    //   setDataReady(true);
    //   setNoEventFound(true);
    // }
    const colRef = collection(db, "events");
    const q = query(colRef, where("eventref", "==", "demoevent"));
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Q:", q);
    console.log("QS:", querySnapshot);
    console.log("Events:", events);
    setEventDetails(events[0]);
    if (events.length == 0) setNoEventFound(true);
    setDataReady(true);
  };

  useEffect(() => {
    getEvent();
  }, []);

  const getTickets = async () => {
    if (tickets) {
      const ticketSelectionArray = await Promise.all(
        tickets?.map(async (ticket: any) => {
          const ticketKey = ticket.ticketKey;
          const numberOfTickets = ticket.numberoftickets;
          const colRef = collection(db, "events", eventID, "tickets");
          const q = query(colRef, where("ticketKey", "==", ticketKey));
          const querySnapshot = await getDocs(q);
          const ticketsSold = querySnapshot.size;
          const ticketsAvailable = numberOfTickets - ticketsSold;
          ticket.eventID = eventID;
          ticket.ticketsAvailable = ticketsAvailable;
          ticket.quantity = 0;
          ticket.ticketPrice = ticket.priceofticket;
          ticket.ticketName = ticket.nameofticket;

          return ticket;
        })
      );
      setTicketSelection(ticketSelectionArray);
      setDataReady(true);
    }
  };

  useEffect(() => {
    if (eventDetails) getTickets();
  }, [eventDetails]);

  const addQuantity = (ticketKey: number) => {
    const ticketSelectionArray = ticketSelection.map((ticket: any) => {
      if (
        ticket.ticketKey == ticketKey &&
        ticket.quantity < 12 &&
        ticket.quantity <= ticket.ticketsAvailable
      ) {
        ticket.quantity = ticket.quantity + 1;
        return ticket;
      } else {
        return ticket;
      }
    });
    setTicketSelection(ticketSelectionArray);
  };
  const subtractQuantity = (ticketKey: any) => {
    const ticketSelectionArray = ticketSelection.map((ticket: any) => {
      if (ticket.ticketKey == ticketKey && ticket.quantity !== 0) {
        ticket.quantity = ticket.quantity - 1;
        return ticket;
      } else {
        return ticket;
      }
    });
    setTicketSelection(ticketSelectionArray);
  };

  const getCartItems = () => {
    const cartItemsArray = ticketSelection.filter((ticket: any) => {
      if (ticket.priceofticket <= 0) {
        ticket.bookingFee = 0.0;
      } else if (ticket.priceofticket <= 10) {
        ticket.bookingFee = 1.0 * ticket.quantity;
      } else if (ticket.priceofticket <= 15) {
        ticket.bookingFee = 1.5 * ticket.quantity;
      } else if (ticket.priceofticket <= 20) {
        ticket.bookingFee = 2.0 * ticket.quantity;
      } else if (ticket.priceofticket <= 90) {
        ticket.bookingFee = 2.5 * ticket.quantity;
      } else if (ticket.priceofticket > 90) {
        ticket.bookingFee =
          Number((ticket.priceofticket * 2.5) / 100 + 0.2) * ticket.quantity;
      }
      return ticket.quantity !== 0;
    });

    setCartItems(cartItemsArray);
  };
  useEffect(() => {
    if (ticketSelection) {
      getCartItems();
    }
  }, [ticketSelection]);

  const getCurrentTotal = () => {
    const currentTotal = cartItems.reduce((currentTotal: number, item: any) => {
      const totalPrice = item.priceofticket * item.quantity;
      const totalPriceBooking = totalPrice + item.bookingFee;
      return totalPriceBooking + currentTotal;
    }, 0);

    setCurrentTotal(currentTotal);
  };
  useEffect(() => {
    if (cartItems) {
      getCurrentTotal();
    }
  }, [cartItems]);

  const purchaseTickets = () => {
    setModalIcon("CONFIRMPURCHASE");
    setModalText("Would you like to purchase fake tickets?");
    setModalSubText("I'm telling you this fake event can't be missed!");
    setModalOpen(true);
  };
  const paymentOpen = () => {
    if (currentTotal !== 0) {
      setLoading(true);
      PaymentIntent({ currentTotal }).then((response: any) => {
        if (response == "Error") {
          console.log("Error");
        }
        const clientSecret = response.clientSecret.clientSecret;

        setClientSecret(clientSecret);

        setCardDetails(true);
        setModalOpen(false);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else if (currentTotal == 0) {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <div>
      {dataReady == false ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          {noEventFound ? (
            <div className="bg-white flex-1  h-screen overflow-y-auto ">
              <div className="bg-white flex  h-screen overflow-y-auto text-[#274472] text-lg font-bold  flex-col ">
                <Lottie
                  animationData={infoAnimation}
                  loop={false}
                  style={{
                    width: 130,
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    margin: 1,
                  }}
                />
                <div className="flex flex-col justify-center items-center self-center text-center">
                  <p className="text-4xl m-6 text-[#D21404] ">
                    No event found!
                  </p>
                  <p className="m-2">
                    We cannot locate the event you are looking for!
                  </p>
                  <p className="text-lg font-light">
                    Be sure to check out the BublHubb app to find more events!
                  </p>

                  <div className="flex items-center flex-1 justify-end md:hidden lg:hidden xl:hidden 2xl:hidden"></div>
                  <p className="text-xs font-light underline m-8">
                    You may now close this window
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                {modalIcon == "CONFIRMPURCHASE" ? (
                  <div>
                    <div
                      onClick={handleCloseModal}
                      className="flex justify-center items-center text-[#274472] cursor-pointer"
                    >
                      <XMarkIcon className="iconSize m-2" />
                    </div>
                    <div className="flex justify-center items-center">
                      <Lottie
                        animationData={infoAnimation}
                        loop={false}
                        style={{
                          width: 140,
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          alignSelf: "center",
                          color: "#274472",
                        }}
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#274472",
                      fontSize: 25,
                      margin: 0,
                      paddingRight: 2,
                      paddingLeft: 2,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    {modalText}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{
                        textAlign: "center",
                        color: "#274472",
                        fontSize: 16,
                        margin: 0,
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingBottom: 0,
                      }}
                    >
                      {modalSubText}
                    </DialogContentText>
                  </DialogContent>
                </div>

                {modalIcon == "CONFIRMPURCHASE" ? (
                  <div>
                    {loading ? (
                      <div className="flex flex-row  justify-center items-center ">
                        <div
                          className="continueLoadingText"
                          onClick={paymentOpen}
                        >
                          <p>Continue...</p>
                          <CircularProgress
                            size={18}
                            sx={{ color: "inherit" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row  justify-center items-center ">
                        <div className="continueText" onClick={paymentOpen}>
                          <p>Continue...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </Dialog>
              {cardDetails == false ? (
                <div>
                  <div className="flex flex-col items-center  bg-white max-w-screen-sm w-full justify-center justify-items-center">
                    <img src={eventImage} className="listingImageContainer" />
                    <p className="text-4xl">{nameOfEvent}</p>
                    <div className="dateContainer">
                      <p className="text-base">Start:</p>
                      <p className="font-normal text-sm">{startDate}</p>
                      <p className="text-base">End:</p>
                      <p className="font-normal text-sm">{endDate}</p>
                    </div>
                    {tags ? (
                      <div className="flex flex-row justify-center">
                        <img
                          src={tags[0]!?.imageb}
                          className="tagImageContainer"
                        />
                        <img
                          src={tags[1]!?.imageb}
                          className="tagImageContainer"
                        />
                        <img
                          src={tags[2]!?.imageb}
                          className="tagImageContainer"
                        />
                      </div>
                    ) : null}
                    {images ? (
                      <div
                        className="max-w-screen-sm h-96
         w-full m-auto py-16 px-4 relative group justify-center "
                      >
                        <div className="iconContainer">
                          <PhotoIcon className="iconSize " />
                          <p className="underline">Images</p>
                        </div>
                        <div
                          style={{
                            backgroundImage: `url(${images[currentIndex]})`,
                          }}
                          className="max-w-screen-sm h-full rounded-2xl bg-center bg-contain duration-500 items-center bg-no-repeat"
                        ></div>

                        <div
                          className=" absolute top-[65%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2  text-[#274472] cursor-pointer"
                          onClick={prevSlide}
                        >
                          <ArrowLeftCircleIcon className="h-8 w-8 " />
                        </div>

                        <div
                          className=" absolute top-[65%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2  text-[#274472] cursor-pointer"
                          onClick={nextSlide}
                        >
                          <ArrowRightCircleIcon className="h-8 w-8 " />
                        </div>
                      </div>
                    ) : null}
                    {video ? (
                      <div>
                        <div className="iconContainer">
                          <PlayCircleIcon className="iconSize " />
                          <p className="underline">Video</p>
                        </div>
                        <div className="max-w-screen-sm ">
                          <VideoPlayer url={video} />
                        </div>
                      </div>
                    ) : null}
                    <div className="shadowContainer">
                      <div className="iconContainer">
                        <DocumentTextIcon className="iconSize " />
                        <p className="underline">Description</p>
                      </div>
                      <p className="font-light">{description}</p>
                    </div>
                    {lat ? (
                      <div className="w-full max-w-screen-sm flex flex-col items-center justify-center ">
                        <div className="shadowContainer">
                          <div className="iconContainer">
                            <MapPinIcon className="iconSize " />
                            <p className="underline">Location</p>
                          </div>
                          <p className="font-light">{locationName}</p>
                        </div>
                        <div className="max-w-screen-sm w-full items-center justify-center flex">
                          <Map lat={lat} lng={lng} />
                        </div>
                      </div>
                    ) : null}
                    {ticketSelection ? (
                      <div
                        ref={ticketSection}
                        className="w-full max-w-screen-sm flex flex-col items-center justify-center "
                      >
                        <div className="iconContainer">
                          <TicketIcon className="iconSize " />
                          <p className="underline">Tickets</p>
                        </div>
                        {ticketSelection?.map((ticket: any, i: number) => (
                          <div className="ticketContainer ">
                            <p className="text-xl leading-none">Name:</p>
                            <p className="text-xl font-light ">
                              {ticket.nameofticket}
                            </p>
                            <p className="leading-none">Price:</p>
                            {ticket.priceofticket !== 0 ? (
                              <p className="text-xl font-light ">
                                £{ticket.priceofticket.toFixed(2)}
                              </p>
                            ) : (
                              <p className="text-xl font-light ">Free</p>
                            )}
                            <p className="text-xl leading-none">Quantity:</p>
                            {ticket.ticketsAvailable !== 0 ? (
                              <div className="flex flex-row justify-center  items-center ">
                                <div
                                  onClick={() =>
                                    subtractQuantity(ticket.ticketKey)
                                  }
                                  className="cursor-pointer m-2"
                                >
                                  <MinusCircleIcon className=" w-8 h-8 text-[#5885AF]" />
                                </div>
                                <p className="text-xl font-light ">
                                  {ticket.quantity}
                                </p>
                                <div
                                  onClick={() => addQuantity(ticket.ticketKey)}
                                  className="cursor-pointer m-2"
                                >
                                  <PlusCircleIcon className=" w-8 h-8 text-[#5885AF]" />
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {cartItems.length !== 0 ? (
                    <div
                      ref={cartSection}
                      className="flex flex-col justify-center items-center self-center"
                    >
                      <div className="iconContainer">
                        <ShoppingCartIcon className="iconSize " />
                        <p className="underline">Cart</p>
                      </div>
                      <div className="ticketDetailsSection">
                        {cartItems?.map((ticket: any, i: number) => (
                          <div className="ticketDetailsContainer ">
                            <div className="flex flex-col text-left w-full justify-start items-start self-center">
                              <p className="text-lg leading-none mr-1 align-middle">
                                Name:{" "}
                              </p>
                              <p className="text-lg font-light align-middle ">
                                {ticket.nameofticket}
                              </p>
                            </div>
                            <div className="flex flex-col text-left w-full justify-start items-start self-center ">
                              <p className="text-lg leading-none">Price:</p>
                              {ticket.priceofticket !== 0 ? (
                                <p className="text-lg font-light ">
                                  £{ticket.priceofticket.toFixed(2)}
                                </p>
                              ) : (
                                <p className="text-lg font-light ">Free</p>
                              )}
                            </div>
                            <div className="flex flex-col text-left  w-full justify-start items-start self-center ">
                              <p className="text-lg leading-none">Quantity:</p>
                              <p className="text-lg font-light ">
                                {ticket.quantity}
                              </p>
                            </div>
                            <div className="flex flex-col text-left  w-full justify-start items-start self-center ">
                              <p className="text-lg leading-none">
                                Booking Fee:
                              </p>
                              {ticket.bookingFee !== 0 ? (
                                <p className="text-lg font-light ">
                                  £{ticket.bookingFee.toFixed(2)}
                                </p>
                              ) : (
                                <p className="text-lg font-light ">Free</p>
                              )}
                            </div>
                            <div className="flex flex-col text-right  w-full justify-end items-end self-center border-t-2 border-[#E0E0E0]">
                              {ticket.priceofticket * ticket.quantity +
                                ticket.bookingFee !==
                              0 ? (
                                <div className="flex flex-row text-right  w-full justify-end items-end self-center">
                                  <p className="text-lg font-bold mr-2">
                                    Amount:
                                  </p>
                                  <p className="text-lg font-light">
                                    £
                                    {(
                                      ticket.priceofticket * ticket.quantity +
                                      ticket.bookingFee
                                    ).toFixed(2)}
                                  </p>
                                </div>
                              ) : (
                                <div className="flex flex-row text-right  w-full justify-end items-end self-center">
                                  <p className="text-lg font-bold mr-2">
                                    Amount:
                                  </p>
                                  <p className="text-lg font-light">Free</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center flex-col  items-center">
                        {currentTotal !== 0 ? (
                          <p className="underline text-xl">
                            Current Total: £{currentTotal.toFixed(2)}
                          </p>
                        ) : (
                          <p className="underline text-xl">
                            Current Total: Free
                          </p>
                        )}

                        <div
                          onClick={purchaseTickets}
                          className="eventPurchaseText"
                        >
                          <p>Get Tickets!</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {ticketSelection.length !== 0 ? (
                    <div className="sticky bottom-0 bg-white/80 shadow z-50 rounded-2xl items-center justify-center flex ml-2 mr-2 pt-2">
                      {cartItems.length == 0 ? (
                        <div
                          className="navigationButton"
                          onClick={() => scrollToSection(ticketSection)}
                        >
                          <div className="mr-2">
                            <TicketIcon className="iconSize " />
                          </div>
                          <p>Go to tickets</p>
                        </div>
                      ) : (
                        <div
                          className="navigationButton"
                          onClick={() => scrollToSection(cartSection)}
                        >
                          <div className="mr-2">
                            <ShoppingCartIcon className="iconSize " />
                          </div>
                          <p>Go to cart</p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              ) : cardDetails == true ? (
                <div className="formContainer" ref={cardSection}>
                  <div
                    onClick={() => {
                      handleCloseCardDetails();
                    }}
                    className="flex justify-center items-center text-[#274472] cursor-pointer"
                  >
                    <XMarkIcon className="iconSize m-2" />
                  </div>
                  <p className="underline text-2xl">Payment</p>
                  <p className="text-2xl font-light underline">
                    Please enter your card details below to complete your
                    purchase!
                  </p>
                  <div className="font-normal text-lg m-2">
                    <p>Demo card number: 4242 4242 4242 4242</p>
                    <p>Demo CVV: 000</p>
                    <p>Demo ZIP: 00000</p>
                  </div>
                  <p className="text-md font-bold m-5">
                    Current Total: £{currentTotal.toFixed(2)}
                  </p>

                  <StripeCheckout
                    cartItems={cartItems}
                    clientSecret={clientSecret}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EventListing;
