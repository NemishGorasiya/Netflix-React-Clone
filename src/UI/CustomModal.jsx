import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
const CustomModal = ({
  children,
  shouldCloseOnOutSideClick,
  handleCloseMyCustomModal,
}) => {
  const modalRef = useRef();
  const backDropRef = useRef();

  useEffect(() => {
    const handleESCapeKey = (event) => {
      if (event.key === "Escape") {
        handleCloseMyCustomModal();
      }
    };

    const handleClickToCloseModal = ({ target }) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        backDropRef.current.contains(target)
      ) {
        handleCloseMyCustomModal();
      }
    };
    document.addEventListener("keydown", (event) => handleESCapeKey(event));
    if (shouldCloseOnOutSideClick) {
      document.addEventListener("click", (event) =>
        handleClickToCloseModal(event)
      );
    }

    return () => {
      document.removeEventListener("keydown", (event) =>
        handleESCapeKey(event)
      );
      document.removeEventListener("click", (event) =>
        handleClickToCloseModal(event)
      );
    };
  }, [handleCloseMyCustomModal, shouldCloseOnOutSideClick]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div ref={backDropRef}>
      <div className="modal" ref={modalRef}>
        <button
          className="closeModalBtn"
          onClick={() => {
            handleCloseMyCustomModal();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        {children}
      </div>
      <div className="modalBackdrop"></div>
    </div>,
    document.getElementById("modal")
  );
};

CustomModal.propTypes = {
  children: PropTypes.any,
  shouldCloseOnOutSideClick: PropTypes.bool.isRequired,
  handleCloseMyCustomModal: PropTypes.func.isRequired,
};

export default CustomModal;
