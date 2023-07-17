"use client";
import { useState } from "react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid";
import Popover from "@mui/material/Popover";
type Props = {};

const CrossPlatformPopover = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
        <DevicePhoneMobileIcon className="popoverIcon" />
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
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div>
          <p className="popoverText ">Available for both mobile app and web</p>
        </div>
      </Popover>
      <p className="popoverTitle">Cross-Platform</p>
    </div>
  );
};

export default CrossPlatformPopover;
