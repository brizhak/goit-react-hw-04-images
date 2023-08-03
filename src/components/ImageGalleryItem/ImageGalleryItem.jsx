import { Component } from 'react';
import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    onClickImage: PropTypes.func,
    href: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };
  onClick = e => {
    e.preventDefault();

    this.props.onClickImage(e.currentTarget.href);
  };
  render() {
    const { href, src, alt, id } = this.props;

    return (
      <li id={id}>
        <a href={href} onClick={this.onClick}>
          <img className={style.img} src={src} alt={alt} width="300" />
        </a>
      </li>
    );
  }
}

export default ImageGalleryItem;
