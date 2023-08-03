import { Component } from 'react';
import style from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return <ul className={style.ul}>{this.props.children}</ul>;
  }
}

export default ImageGallery;
