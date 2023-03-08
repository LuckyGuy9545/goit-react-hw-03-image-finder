import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('mount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { selectedImage, tags } = this.props;

    return createPortal(
      <div className="modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="modal__content">
          <img src={selectedImage} alt={tags}></img>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onCLose: PropTypes.func.isRequired,
};
