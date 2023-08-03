import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ onClickImage, href, src, alt, id }) => {
  const onClick = e => {
    e.preventDefault();

    onClickImage(e.currentTarget.href);
  };

  return (
    <li id={id}>
      <a href={href} onClick={onClick}>
        <img className={style.img} src={src} alt={alt} width="300" />
      </a>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClickImage: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default ImageGalleryItem;
