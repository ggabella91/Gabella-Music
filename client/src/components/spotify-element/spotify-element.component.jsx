import React /*{ useState }*/ from 'react';

import './spotify-element.styles.scss';

const SpotifyElement = ({ type, item }) => {
  if (type === 'artist') {
    const { name, external_urls, images } = item;
    return (
      <div className='spotify-element'>
        <img className='artist-image' src={images[0].url} />
        <span>{name}</span>
      </div>
    );
  } else if (type === 'track') {
    const { album, artists, name, preview_url } = item;
    const artistString =
      artists.length > 1
        ? artists.map((artist) => artist.name).join(', ')
        : artists[0].name;

    return (
      <div className='spotify-element'>
        <img className='album-image' src={album.images[0].url} />
        <div className='details-container'>
          <span className='main-text'>{name}</span>
          <span className='small-text'>{album.name}</span>
          <span className='small-text'>{artistString}</span>
        </div>
      </div>
    );
  } else return;
};

export default SpotifyElement;
