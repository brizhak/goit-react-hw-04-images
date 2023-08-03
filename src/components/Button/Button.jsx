import { Component } from 'react';
import style from './Button.module.css';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };
  render() {
    const { onClick } = this.props;
    return (
      <div className={style.div}>
        <button className={style.button} type="button" onClick={onClick}>
          Load more
        </button>
      </div>
    );
  }
}

export default Button;
