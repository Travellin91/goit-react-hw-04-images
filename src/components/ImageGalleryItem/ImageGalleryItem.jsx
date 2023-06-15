import React from 'react';
import PropTypes from 'prop-types';
import './imagegalleryitem.css';

const ImageGalleryItem = ({ image, onItemClick }) => {
  const handleClick = () => {
    onItemClick(image);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleClick}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItem_image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;