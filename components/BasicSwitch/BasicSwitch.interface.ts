export interface BasicSwitchProps {
    label: string;
    leftItemLabel: string;
    rightItemLabel: string;
    onClickLeftItem: () => void;
    onClickRightItem: () => void;
    activeItem: "left" | "right";
  }