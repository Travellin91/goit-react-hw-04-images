import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './imagegalery.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onItemClick }) => {
  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div className="ImageGallery">
      {memoizedImages.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;
