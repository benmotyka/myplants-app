import { ReactElement } from "react";

export interface BasicModalProps {
  children: ReactElement | ReactElement[];
  toggleModal: (...args: any[]) => void
}
