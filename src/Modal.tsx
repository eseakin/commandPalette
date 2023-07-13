import { useState } from "react";
import { Modal as AModal } from "antd";

const Modal = ({
  content,
  title,
}: {
  content?: JSX.Element;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AModal
      title={`Add ${title}`}
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
