import PropTypes from 'prop-types';
import './Button.css';

export default function LoadMoreButton({ onClick }) {
  return (
    <button className="gallery-button" type="button" onClick={onClick}>
      Load More
    </button>
  );
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
