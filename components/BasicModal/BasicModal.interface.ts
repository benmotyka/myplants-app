import { ReactElement } from "react";

export interface BasicModalProps {
  showModal: boolean;
  children: ReactElement | ReactElement[];
  toggleModal: (...args: any[]) => void
}
