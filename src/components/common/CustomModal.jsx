import { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const CustomModal = ({ children, handleCloseMyCustomModal }) => {
	const modalRef = useRef();

	const handleEscapeKey = useCallback(
		(event) => {
			if (event.key === "Escape") {
				handleCloseMyCustomModal();
			}
		},
		[handleCloseMyCustomModal]
	);

	const handleClickOutside = useCallback(
		(event) => {
			if (!modalRef.current.contains(event.target)) {
				handleCloseMyCustomModal();
			}
		},
		[handleCloseMyCustomModal, modalRef]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);

		if (document.body.scrollHeight > window.innerHeight) {
			document.body.classList.add("has-scroll-bar");
		}

		return () => {
			document.body.classList.remove("has-scroll-bar");
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [handleClickOutside, handleEscapeKey]);

	return createPortal(
		<div className="modalContainer">
			<div className="modal" ref={modalRef}>
				<button className="closeModalBtn" onClick={handleCloseMyCustomModal}>
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
	handleCloseMyCustomModal: PropTypes.func.isRequired,
};

export default CustomModal;
