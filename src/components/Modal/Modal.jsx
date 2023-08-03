import { useEffect } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ src, alt, closeModal }) => {
  const onCloseModal = e => {
    if (e.target.id === 'modalWindow') {
      closeModal();
    }
  };
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [closeModal]);

  return (
    <div className={style.overlay} onClick={onCloseModal} id="modalWindow">
      <div className={style.modal}>
        <img className={style.img} src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
