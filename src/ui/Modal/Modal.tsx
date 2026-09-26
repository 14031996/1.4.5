import type { ReactNode } from "react";
import Style from "./Modal.style.module.scss";

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className={Style.modal}>
      <div className={Style["modal-content"]}>{children}</div>
    </div>
  );
};

export default Modal;
