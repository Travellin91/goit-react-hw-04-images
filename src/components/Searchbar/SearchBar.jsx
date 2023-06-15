import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineImageSearch } from 'react-icons/md';
import CountryFlag from 'react-country-flag';
import './searchbar.css';
import anthemUkraine from './gimn-ukrainy-Ponomarev.mp3';

class Searchbar extends Component {
  state = {
    searchQuery: '',
    isPlaying: false,
  };

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.searchQuery.trim()) {
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };

  handleFlagClick = () => {
    const { isPlaying } = this.state;

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }

    if (!isPlaying) {
      this.audio = new Audio(anthemUkraine);
      this.audio.play();
    }

    this.setState({ isPlaying: !isPlaying });
  };

  render() {
    const { isPlaying } = this.state;

    return (
      <header className="searchbar">
        <div className="flags">
          <CountryFlag
            countryCode="UA"
            svg
            onClick={this.handleFlagClick}
            style={{ width: '40px', height: '40px' }}
            
          />
          <span onClick={this.handleFlagClick}>{isPlaying ? '' : ''}</span>
        </div>
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm_button">
            <MdOutlineImageSearch className="SearchForm_icon" size={24} onClick={this.handleClearSearch}/>
            <span className="SearchForm_button_label">Пошук</span>
          </button>
          <input
            className="SearchForm_input"
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Пошук зображень та фотографій"
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
