import { useState } from "react";
import { Button, Modal as AModal } from "antd";

const Modal = ({ content }: { content?: JSX.Element; isOpen: boolean }) => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AModal
      title="Basic Modal"
      open={isOpen}
      onOk={closeModal}
      onCancel={closeModal}
    >
      {content ? (
        content
      ) : (
        <div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      )}
    </AModal>
  );
};

export default Modal;
