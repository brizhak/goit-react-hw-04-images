import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import fetchImages from '../api/api';
import style from './App.module.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSubmit = inputValue => {
    if (query !== inputValue) {
      setQuery(inputValue);
      setPage(1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const images = await fetchImages(query, page);
        const newImages = images.data.hits.map(image => ({
          id: image.id,
          largeURL: image.largeImageURL,
          webURL: image.webformatURL,
        }));
        if (page === 1) {
          setData(newImages);
        } else {
          setData(prevData => [...prevData, ...newImages]);
        }

        setTotalHits(images.data.totalHits);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '' && page > 0) {
      fetchData();
    }
  }, [query, page]);

  const onClickImage = url => {
    setCurrentImage(url);
    setModalIsOpen(true);
  };

  const onClickBtn = e => {
    setPage(page + 1);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {!totalHits ? (
            <div className={style.div}>
              <p>There are no images</p>
            </div>
          ) : (
            <ImageGallery>
              {data.map(image => (
                <ImageGalleryItem
                  href={image.largeURL}
                  src={image.webURL}
                  alt={query}
                  id={image.id}
                  key={image.id}
                  onClickImage={onClickImage}
                />
              ))}
            </ImageGallery>
          )}
          {data.length < totalHits / page && <Button onClick={onClickBtn} />}
        </>
      )}
      {modalIsOpen && (
        <Modal src={currentImage} alt={query} closeModal={closeModal} />
      )}
    </>
  );
};

export default App;
