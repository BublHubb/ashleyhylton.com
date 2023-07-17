"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TicketProcessingPopover from "./Popovers/TicketProcessingPopover";
import EventFeedPopover from "./Popovers/EventFeedPopover";
import SecurityPopover from "./Popovers/SecurityPopover";
import WalletPopover from "./Popovers/WalletPopover";
import MessagingPopover from "./Popovers/MessagingPopover";
import StatisticsPopover from "./Popovers/StatisticsPopover";
import NotificationsPopover from "./Popovers/NotificationsPopover";
import OrganiserPopover from "./Popovers/OrganiserPopover";
import CrossPlatformPopover from "./Popovers/CrossPlatformPopover";
import MarketingPopover from "./Popovers/MarketingPopover";
import { motion } from "framer-motion";

type Props = {};

function FeaturesGrid({}: Props) {
  const iconURL =
    "https://firebasestorage.googleapis.com/v0/b/bubl-hubb-2-0.appspot.com/o/Iphone%20Mockup-min.png?alt=media&token=f3f372a9-7951-48cc-8b6e-fd3bc19e70f3";

  return (
    <div className="relative  flex justify-center items-center container max-w-xl p-2 overflow-y-visable">
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
      >
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <TicketProcessingPopover />
            </Grid>
            <Grid item xs={4}>
              <EventFeedPopover />
            </Grid>
            <Grid item xs={4}>
              <SecurityPopover />
            </Grid>
            <Grid item xs={4}>
              <WalletPopover />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <MessagingPopover />
            </Grid>
            <Grid item xs={4}>
              <StatisticsPopover />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <NotificationsPopover />
            </Grid>
            <Grid item xs={4}>
              <OrganiserPopover />
            </Grid>
            <Grid item xs={4}>
              <CrossPlatformPopover />
            </Grid>
            <Grid item xs={4}>
              <MarketingPopover />
            </Grid>
          </Grid>
        </Box>
      </motion.div>
      <img
        src={iconURL}
        className="absolute w-36   mx-auto object-cover z-50 "
      />
    </div>
  );
}

export default FeaturesGrid;
