import { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const CustomModal = ({ children, handleClose }) => {
  const modalRef = useRef();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (!modalRef.current.contains(event.target)) {
        handleClose();
      }
    },
    [handleClose, modalRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    if (document.body.scrollHeight > window.innerHeight) {
      document.body.classList.add("has-scroll-bar");
    }

    return () => {
      document.body.classList.remove("has-scroll-bar");
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return createPortal(
    <div className="modalContainer">
      <div className="modal" ref={modalRef}>
        <button className="closeModalBtn" onClick={handleClose}>
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
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
};

export default CustomModal;
