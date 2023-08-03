import { Component } from 'react';
import style from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    inputValue: '',
  };

  handleInput = e => {
    const inputValue = e.target.value;

    this.setState({ inputValue: inputValue });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.inputValue) {
      alert('Please enter your request');
    } else {
      this.props.onSubmit(this.state.inputValue);
      this.setState({ inputValue: '' });
    }
  };
  render() {
    return (
      <header className={style.header}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button className={style.button} type="submit">
            Search
          </button>

          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
