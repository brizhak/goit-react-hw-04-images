import { useState } from 'react';
import style from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    const value = e.target.value;

    setInputValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue) {
      alert('Please enter your request');
    } else {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={handleSubmit}>
        <button className={style.button} type="submit">
          Search
        </button>

        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
