import React /*{ useState }*/ from 'react';

import './spotify-element.styles.scss';

const SpotifyElement = ({ type, item }) => {
  if (type === 'artist') {
    const { name, images } = item;
    return (
      <div className='spotify-element'>
        <img className='artist-image' src={images[0].url} alt={name} />
        <span>{name}</span>
      </div>
    );
  } else if (type === 'track') {
    const { album, artists, name } = item;
    const artistString =
      artists.length > 1
        ? artists.map((artist) => artist.name).join(', ')
        : artists[0].name;

    return (
      <div className='spotify-element'>
        <img className='album-image' src={album.images[0].url} alt={name} />
        <div className='details-container'>
          <ul>
            <li className='main-text'>{name}</li>
            <li className='small-text'>{album.name}</li>
            <li className='small-text'>{artistString}</li>
          </ul>
        </div>
      </div>
    );
  } else return;
};

export default SpotifyElement;
