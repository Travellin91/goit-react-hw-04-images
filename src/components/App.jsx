import React, { Component } from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGalery.jsx';
import Loader from './Loader/Loader.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';
import './styles.css';
import { getImages } from './Services/getimages.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      images: [],
      error: null,
      searchQuery: '',
      page: 1,
      showModal: false,
      selectedImage: null,
      isLastPage: false,
      isButtonShow: false,
    };
  }


  componentDidUpdate(_prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ page: 1, images: [], isButtonShow: false });
      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = async (nextQuery, nextPage) => {
    this.setState({ isLoading: true, error: false });
    const { hits, totalHits } = await getImages(nextQuery, nextPage);

    const newData = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
    const currentData = [...this.state.images, ...newData];

    this.setState(prevState => ({
      images: [...prevState.images, ...newData],
    }));

    if (!totalHits) {
      this.setState({ isLoading: false, error: true });
      toast.warn(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (currentData.length >= totalHits) {
      this.setState({
        isLoading: false,
        isButtonShow: false,
        error: false,
        isLastPage: true,
      });
      return;
    }

    this.setState({
      isLoading: false,
      isButtonShow: true,
      error: false,
    });
  };

  handleSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage, isLastPage } =
      this.state;

    return (
      <div className="App_div">
        <ToastContainer transition={Flip} />
        <Searchbar onSubmit={this.handleSubmit} />

        {error && <p>Error: {error}</p>}

        <ImageGallery images={images} onItemClick={this.handleImageClick} />

        {isLoading && <Loader />}

        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.onLoadMore} />
        )}

        {showModal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default App;
