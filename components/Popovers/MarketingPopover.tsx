"use client";
import { useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import Popover from "@mui/material/Popover";

type Props = {};

function MarketingPopover({}: Props) {
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
        <PlayCircleIcon className="popoverIcon" />
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
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div>
          <p className="popoverText ">
            Generate cross-platform links for organisers
          </p>
        </div>
      </Popover>
      <p className="popoverTitle">Marketing</p>
    </div>
  );
}

export default MarketingPopover;
