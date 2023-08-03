import style from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return <ul className={style.ul}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
