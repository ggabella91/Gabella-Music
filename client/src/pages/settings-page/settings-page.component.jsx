import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsConnected } from '../../redux/spotify/spotify.selectors';
import { disconnectStart } from '../../redux/spotify/spotify.actions.js';

import Button from '../../components/button/button.component';
import './settings-page.styles.scss';

const SettingsPage = ({ isConnected, disconnectStart }) => {
  const handleRenderDisconnectButton = () =>
    isConnected ? (
      <Button className='button submit-button' onClick={disconnectStart}>
        Disconnect From Spotify
      </Button>
    ) : null;

  return (
    <div>
      <div>{handleRenderDisconnectButton()}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isConnected: selectIsConnected,
});

const mapDispatchToProps = (dispatch) => ({
  disconnectStart: () => dispatch(disconnectStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
