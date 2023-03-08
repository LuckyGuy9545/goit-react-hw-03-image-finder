import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import galleryFetch from 'services/galleryFetch';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import '../services/App.css';
import Modal from './Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    currentPage: 1,
    status: 'iddle',
    page: 1,
    selectedImage: null,
    alt: null,
  };
  totalHits = null;

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const prevPage = prevState.currentPage;
    const nextQuery = this.state.searchQuery;
    const nextPage = this.state.currentPage;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      // console.log(this.state.status);
      try {
        const responseFromFetch = await galleryFetch(nextQuery, nextPage);
        this.totalHits = responseFromFetch.total;
        // console.log('this.totalHits', this.totalHits);
        const imageHits = responseFromFetch.hits;
        if (!imageHits.length) {
          toast.warning('We found no results, please try something else');
        }
        this.setState(({ gallery }) => ({
          gallery: [...gallery, ...imageHits],
          status: 'resolved',
        }));
      } catch (error) {
        toast.error(`Sorry, something went wrong. ${error.message}`);
      }
    }
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
    // console.log('this.state', this.state);
  };

  handleOnImageClick = (largeImageURL, tags) => {
    // console.log('largeImageURL', largeImageURL);
    this.setState({
      selectedImage: largeImageURL,
      alt: tags,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      gallery: [],
      currentPage: 1,
      status: 'iddle',
      page: 1,
      showModal: false,
    });
  };

  toggleModal = () => {
    this.setState(() => ({
      selectedImage: null,
    }));
  };

  render() {
    const { status, gallery, selectedImage, tags } = this.state;
    return (
      <div className="app__wrapper">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
        {status === 'pending' && <Loader />}
        <ImageGallery
          gallery={gallery}
          selectedImage={this.handleOnImageClick}
        />
        {gallery.length > 0 && gallery.length !== this.totalHits && (
          <Button onClick={this.loadMore} />
        )}
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
