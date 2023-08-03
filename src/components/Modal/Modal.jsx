import { Component } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal);
  }
  onCloseModal = e => {
    if (e.target.id) {
      this.props.closeModal();
    }
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const { src, alt } = this.props;
    return (
      <div
        className={style.overlay}
        onClick={this.onCloseModal}
        id="modalWindow"
      >
        <div className={style.modal}>
          <img className={style.img} src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
