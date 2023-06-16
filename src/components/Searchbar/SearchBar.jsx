import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineImageSearch } from 'react-icons/md';
import CountryFlag from 'react-country-flag';
import './searchbar.css';
import YouTube from 'react-youtube';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    onSubmit(searchQuery);
  };

  const handleFlagClick = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
    setIsVideoPlaying(prevIsPlaying => !prevIsPlaying);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsVideoPlaying(false);
  };

  const youtubeOpts = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="searchbar-container">
      <header className="searchbar">
        <div className="flags">
          <CountryFlag
            countryCode="UA"
            svg
            onClick={handleFlagClick}
            style={{ width: '40px', height: '40px' }}
          />
          {isPlaying ? '' : ''}
        </div>
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm_button">
            <MdOutlineImageSearch className="SearchForm_icon" size={24} />
            <span className="SearchForm_button_label">Пошук</span>
          </button>
          <input
            className="SearchForm_input"
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Пошук зображень та фотографій"
            value={searchQuery}
          />
        </form>
      </header>
      {isVideoPlaying && (
        <div className="video-container">
          <YouTube
            videoId="zNFUqradyV4"
            opts={youtubeOpts}
            onEnd={handleVideoEnded}
          />
        </div>
      )}
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

// class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//     isPlaying: false,
//   };

//   handleChange = event => {
//     this.setState({ searchQuery: event.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (!this.state.searchQuery.trim()) {
//       return;
//     }
//     this.props.onSubmit(this.state.searchQuery);
//   };

//   handleFlagClick = () => {
//     const { isPlaying } = this.state;

//     if (this.audio) {
//       this.audio.pause();
//       this.audio.currentTime = 0;
//       this.audio = null;
//     }

//     if (!isPlaying) {
//       this.audio = new Audio(anthemUkraine);
//       this.audio.play();
//     }

//     this.setState({ isPlaying: !isPlaying });
//   };

//   render() {
//     const { isPlaying } = this.state;

//     return (
//       <header className="searchbar">
//         <div className="flags">
//           <CountryFlag
//             countryCode="UA"
//             svg
//             onClick={this.handleFlagClick}
//             style={{ width: '40px', height: '40px' }}

//           />
//           <span onClick={this.handleFlagClick}>{isPlaying ? '' : ''}</span>
//         </div>
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm_button">
//             <MdOutlineImageSearch className="SearchForm_icon" size={24} onClick={this.handleClearSearch}/>
//             <span className="SearchForm_button_label">Пошук</span>
//           </button>
//           <input
//             className="SearchForm_input"
//             onChange={this.handleChange}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Пошук зображень та фотографій"
//             value={this.state.searchQuery}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default Searchbar;
