import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGalery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { getImages } from './Services/getimages';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { hits, totalHits } = await getImages(searchQuery, page);

        const newData = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        }));

        const currentData = [...images, ...newData];
        setImages(currentData);

        if (!totalHits) {
          setIsLoading(false);
          setError(true);
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (currentData.length >= totalHits) {
          setIsLoading(false);
          setIsButtonShow(false);
          setError(false);
          setIsLastPage(true);
          return;
        }

        setIsLoading(false);
        setIsButtonShow(true);
        setError(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError(true);
        toast.error('Oops! Something went wrong. Please try again later.');
      }
    };

    if (searchQuery.trim() !== '') {
      setPage(1);
      setImages([]);
      setIsLastPage(false);
      fetchGalleryItems();
    }
  }, [searchQuery, page, images]);;

  const handleSubmit = newSearchQuery => {
    if (searchQuery === newSearchQuery) {
      return;
    }
    setSearchQuery(newSearchQuery);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && !isLoading && (
        <p className="Error">Oops! Something went wrong. Please try again later.</p>
      )}
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isButtonShow && !isLastPage && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
      <ToastContainer transition={Flip} autoClose={3000} />
    </div>
  );
};

export default App;




















// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isLoading: false,
//       images: [],
//       error: null,
//       searchQuery: '',
//       page: 1,
//       showModal: false,
//       selectedImage: null,
//       isLastPage: false,
//       isButtonShow: false,
//     };
//   }


//   componentDidUpdate(_prevProps, prevState) {
//     const prevQuery = prevState.searchQuery;
//     const nextQuery = this.state.searchQuery;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevQuery !== nextQuery) {
//       this.setState({ page: 1, images: [], isButtonShow: false });
//       if (nextPage === 1) {
//         this.fetchGalleryItems(nextQuery, nextPage);
//       }
//     } else if (prevPage !== nextPage) {
//       this.fetchGalleryItems(nextQuery, nextPage);
//     }
//   }

//   fetchGalleryItems = async (nextQuery, nextPage) => {
//     this.setState({ isLoading: true, error: false });
//     const { hits, totalHits } = await getImages(nextQuery, nextPage);

//     const newData = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
//       id,
//       tags,
//       webformatURL,
//       largeImageURL,
//     }));
//     const currentData = [...this.state.images, ...newData];

//     this.setState(prevState => ({
//       images: [...prevState.images, ...newData],
//     }));

//     if (!totalHits) {
//       this.setState({ isLoading: false, error: true });
//       toast.warn(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }
//     if (currentData.length >= totalHits) {
//       this.setState({
//         isLoading: false,
//         isButtonShow: false,
//         error: false,
//         isLastPage: true,
//       });
//       return;
//     }

//     this.setState({
//       isLoading: false,
//       isButtonShow: true,
//       error: false,
//     });
//   };

//   handleSubmit = searchQuery => {
//     if (this.state.searchQuery === searchQuery) {
//       return;
//     }
//     this.setState({
//       searchQuery: searchQuery,
//       page: 1,
//       images: [],
//       error: null,
//       isLastPage: false,
//     });
//   };

//   handleImageClick = image => {
//     this.setState({ selectedImage: image, showModal: true });
//     document.body.style.overflow = 'hidden';
//   };

//   handleModalClose = () => {
//     this.setState({ selectedImage: null, showModal: false });
//     document.body.style.overflow = 'auto';
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { images, isLoading, error, showModal, selectedImage, isLastPage } =
//       this.state;

//     return (
//       <div className="App_div">
//         <ToastContainer transition={Flip} />
//         <Searchbar onSubmit={this.handleSubmit} />

//         {error && <p>Error: {error}</p>}

//         <ImageGallery images={images} onItemClick={this.handleImageClick} />

//         {isLoading && <Loader />}

//         {!isLoading && images.length > 0 && !isLastPage && (
//           <Button onClick={this.onLoadMore} />
//         )}

//         {showModal && (
//           <Modal image={selectedImage} onClose={this.handleModalClose} />
//         )}
//       </div>
//     );
//   }
// }

// export default App;
