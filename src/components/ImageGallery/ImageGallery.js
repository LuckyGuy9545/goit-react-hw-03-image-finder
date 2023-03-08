import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import './ImageGallery.css';

export default function ImageGallery({ gallery, selectedImage }) {
  return (
    <ul className="image-gallery">
      {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          previewImg={webformatURL}
          tags={tags}
          selectedImage={() => selectedImage(largeImageURL, tags)}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  selectedImage: PropTypes.func.isRequired,
};
