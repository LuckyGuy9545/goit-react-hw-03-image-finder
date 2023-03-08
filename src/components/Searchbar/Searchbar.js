import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.css';

export default class Searchbar extends Component {
  state = {
    seacrhQuery: '',
  };

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.state.seacrhQuery.trim() === '') {
      return toast.error('Please, enter something');
    }

    this.props.onSubmit(this.state.seacrhQuery);
    this.setState({ seacrhQuery: '' });
  };

  handleInpuChange = e => {
    this.setState({ seacrhQuery: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchbar-form" onSubmit={this.handleFormSubmit}>
          <button type="submit" className="searchbar-form__button">
            <BsSearch />
          </button>

          <input
            className="searchbar-form__input"
            type="text"
            value={this.state.seacrhQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInpuChange}
          />
        </form>
      </header>
    );
  }
}
