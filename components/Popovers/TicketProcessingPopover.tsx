"use client";
import { useState } from "react";
import { TicketIcon } from "@heroicons/react/24/solid";
import Popover from "@mui/material/Popover";

type Props = {};

function TicketProcessingPopover({}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className="popoverContainer">
      <div
        onMouseOver={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className="popoverElement"
      >
        <TicketIcon className="popoverIcon" />
      </div>
      <Popover
        id="ticket-processing-popover"
        sx={{
          pointerEvents: "none",
          m: 1,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div>
          <p className="popoverText ">
            Built in ticket scanner & QR generation
          </p>
        </div>
      </Popover>
      <p className="popoverTitle">Ticket Processing</p>
    </div>
  );
}

export default TicketProcessingPopover;
