import React /*{ useState }*/ from 'react';

import './spotify-element.styles.scss';

const SpotifyElement = ({ item }) => {
  const { name, external_urls, images } = item;

  return (
    <div className='spotify-element'>
      <img className='artist-image' src={images[0].url} />
      <span>{name}</span>
    </div>
  );
};

export default SpotifyElement;
