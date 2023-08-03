import { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import style from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={style.div}>
        <TailSpin
          margin="0 auto"
          height="80"
          width="80"
          color="#4C8891"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
      </div>
    );
  }
}

export default Loader;
