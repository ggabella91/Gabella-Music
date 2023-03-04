import React from 'react';

import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';

const modalButtonStyles = {
  width: '120px',
  height: '60px',
  maxWidth: '120px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'black',
  backgroundColor: '#ffc107',
  textTransform: 'capitalize',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#ffc107',
  },
};

const CustomModal = (props) => (
  <Modal {...props} dialogClassName='custom-modal' centered>
    <Modal.Header closeButton>
      <Modal.Title id='contained-modal-title-vcenter'>
        {props.header}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='body-text'>
      <h4>{props.subheader}</h4>
      <p>{props.bodytext}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button sx={modalButtonStyles} onClick={props.onHide}>
        Cancel
      </Button>
      <Button
        sx={{
          ...modalButtonStyles,
          minWidth: '180px',
          marginLeft: '15px',
          color: 'white',
          backgroundColor: '#f44336',
          '&:hover': {
            backgroundColor: '#f44336',
          },
        }}
        onClick={props.handleConfirm}
      >
        {props.actionlabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CustomModal;
