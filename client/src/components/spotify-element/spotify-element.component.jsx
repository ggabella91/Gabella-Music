import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

import './spotify-element.styles.scss';

const spotifyElementStyles = {
  minWidth: '180px',
  width: 'auto',
  maxHeight: '400px',
  letterSpacing: '0.5px',
  lineHeight: '50px',
  padding: '20px 35px',
  fontWeight: 420,
  display: 'flex',
  justifyContent: 'space-evenly',
  borderRadius: '15px',
  backgroundColor: '#ffc107',
  color: 'white',
  border: 'none',
  marginTop: '20px',
  textTransform: 'capitalize',
  textDecoration: 'none',
};

const detailsContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '90%',
  minWidth: '140px',
  maxHeight: '200px',
  marginLeft: '20px',
  overflow: 'hidden',
  whiteSpace: 'pre-wrap',
  textOverflow: 'ellipsis',
};

const SpotifyElement = ({ type, item }) => {
  if (type === 'artist') {
    const { name, images, external_urls } = item;
    return (
      <Paper className='spotify-element' sx={spotifyElementStyles}>
        <img className='artist-image' src={images[0].url} alt={name} />
        <Typography sx={{ marginTop: '5px' }}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={external_urls.spotify}
          >
            {name}
          </a>
        </Typography>
      </Paper>
    );
  } else if (type === 'track') {
    const { album, artists, name, external_urls } = item;
    const nameString =
      name.length > 25 ? `${name.split('').slice(0, 25).join('')}...` : name;
    const artistString =
      artists.length > 1
        ? artists.length > 2
          ? `${artists
              .map((artist) => artist.name)
              .slice(0, 2)
              .join(', ')}...`
          : artists.map((artist) => artist.name).join(', ')
        : artists[0].name;
    const albumString =
      album.name.length > 25
        ? `${album.name.split('').slice(0, 25).join('')}...`
        : album.name;

    return (
      <Paper className='spotify-element' sx={spotifyElementStyles}>
        <img className='album-image' src={album.images[0].url} alt={name} />
        <Grid className='details-container' sx={detailsContainerStyles}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={external_urls.spotify}
          >
            <ul style={{ marginTop: '5px' }}>
              <li className='main-text'>{nameString}</li>
              <li className='small-text'>{albumString}</li>
              <li className='small-text'>{artistString}</li>
            </ul>
          </a>
        </Grid>
      </Paper>
    );
  } else return;
};

export default SpotifyElement;
