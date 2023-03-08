import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({ tags, previewImg, selectedImage }) {
  return (
    <li className="image-gallery__item">
      <img
        className="image-gallery__image"
        src={previewImg}
        alt={tags}
        onClick={selectedImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  selectedImage: PropTypes.func.isRequired,
};
