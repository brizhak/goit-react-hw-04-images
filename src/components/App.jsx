import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import fetchImages from '../api/api';
import style from './App.module.css';

class App extends Component {
  state = {
    isLoading: false,
    isError: false,
    searchQuery: '',
    data: [],
    page: 1,
    totalHits: 0,
    isOpenModal: false,
    modalImage: '',
  };
  onSubmit = inputValue => {
    this.setState(prevState => {
      if (prevState.searchQuery !== inputValue) {
        return { searchQuery: inputValue, page: 1 };
      } else {
        return prevState.searchQuery;
      }
    });
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ isLoading: true });

      try {
        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page
        );

        this.setState({
          data: images.data.hits.map(image => ({
            id: image.id,
            largeURL: image.largeImageURL,
            webURL: image.webformatURL,
          })),
          totalHits: images.data.totalHits,
        });
      } catch (error) {
        alert(error);
        this.setState({ isError: true, error });
      } finally {
        this.setState({ isLoading: false });
      }
    } else if (this.state.page !== prevState.page) {
      try {
        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page
        );
        this.setState(prevState => ({
          data: [
            ...prevState.data,
            ...images.data.hits.map(image => ({
              id: image.id,
              largeURL: image.largeImageURL,
              webURL: image.webformatURL,
            })),
          ],
        }));
      } catch (error) {
        this.setState({ isError: true, error });
        alert(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onClickImage = url => {
    this.setState({ modalImage: url, isOpenModal: true });
  };

  onClickBtn = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  closeModal = () => {
    this.setState({ isOpenModal: false });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            {!this.state.totalHits ? (
              <div className={style.div}>
                <p>There are no images</p>
              </div>
            ) : (
              <ImageGallery>
                {this.state.data.map(image => (
                  <ImageGalleryItem
                    href={image.largeURL}
                    src={image.webURL}
                    alt={this.state.searchQuery}
                    id={image.id}
                    key={image.id}
                    onClickImage={this.onClickImage}
                  />
                ))}
              </ImageGallery>
            )}
            {this.state.data.length <
              this.state.totalHits / this.state.page && (
              <Button onClick={this.onClickBtn} />
            )}
          </>
        )}
        {this.state.isOpenModal && (
          <Modal
            src={this.state.modalImage}
            alt={this.state.searchQuery}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

export default App;
