import React from "react";
import { AnimatePresence } from "moti";
import { Ionicons } from "@expo/vector-icons";

import { IconWrapper, ReminderAnimationWrapper } from "./ReminderIcon.styles";
import { ReminderIconProps } from "./ReminderIcon.interface";
import { ICON_SIZE_PX } from "config";

const ReminderIcon = ({ showReminder }: ReminderIconProps): JSX.Element => {
  return (
    <AnimatePresence>
      {showReminder ? (
        <ReminderAnimationWrapper
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <IconWrapper>
            <Ionicons name="alert" size={ICON_SIZE_PX} color="white" />
          </IconWrapper>
        </ReminderAnimationWrapper>
      ) : null}
    </AnimatePresence>
  );
};

export default ReminderIcon;
