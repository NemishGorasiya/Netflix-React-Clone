import { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
const CustomModal = ({
  children,
  shouldCloseOnOutSideClick = false,
  handleCloseMyCustomModal,
}) => {
  const modalRef = useRef();
  const backDropRef = useRef();

  const handleESCapeKey = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handleCloseMyCustomModal();
      }
    },
    [handleCloseMyCustomModal]
  );

  const handleClickToCloseModal = useCallback(
    ({ target }) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        backDropRef.current.contains(target)
      ) {
        handleCloseMyCustomModal();
      }
    },
    [handleCloseMyCustomModal]
  );
  useEffect(() => {
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
  }, [
    handleClickToCloseModal,
    handleCloseMyCustomModal,
    handleESCapeKey,
    shouldCloseOnOutSideClick,
  ]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return createPortal(
    <div ref={backDropRef} className="modalContainer">
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
