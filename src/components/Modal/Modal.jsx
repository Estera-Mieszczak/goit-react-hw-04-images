import PropTypes from 'prop-types';
import "./Modal.css"

export const Modal = ({ alt, src, handleClose }) => {
  const handleClick = event => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleClose} className="Overlay">
      <div onClick={handleClick} className="Modal">
        <img src={src} alt={alt} id="modalImage" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};