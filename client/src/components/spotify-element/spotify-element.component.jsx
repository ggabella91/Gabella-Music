import React /*{ useState }*/ from 'react';

import './spotify-element.styles.scss';

const SpotifyElement = ({ type, item }) => {
  if (type === 'artist') {
    const { name, images, external_urls } = item;
    return (
      <div className='spotify-element'>
        <img className='artist-image' src={images[0].url} alt={name} />
        <span>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={external_urls.spotify}
          >
            {name}
          </a>
        </span>
      </div>
    );
  } else if (type === 'track') {
    const { album, artists, name, external_urls } = item;
    const artistString =
      artists.length > 1
        ? artists.map((artist) => artist.name).join(', ')
        : artists[0].name;

    return (
      <div className='spotify-element'>
        <img className='album-image' src={album.images[0].url} alt={name} />
        <div className='details-container'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={external_urls.spotify}
          >
            <ul>
              <li className='main-text'>{name}</li>
              <li className='small-text'>{album.name}</li>
              <li className='small-text'>{artistString}</li>
            </ul>
          </a>
        </div>
      </div>
    );
  } else return;
};

export default SpotifyElement;
