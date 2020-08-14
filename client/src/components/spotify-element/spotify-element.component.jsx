import React /*{ useState }*/ from 'react';

import './spotify-element.styles.scss';

const SpotifyElement = ({ artist }) => (
  <div className='spotify-element'>{artist}</div>
);

export default SpotifyElement;
