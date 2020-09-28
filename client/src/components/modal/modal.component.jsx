import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from '../button/button.component';

const CustomModal = (props) => (
  <Modal {...props} dialogClassName='custom-modal' centered>
    <Modal.Header closeButton>
      <Modal.Title id='contained-modal-title-vcenter'>
        {props.header}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='body-text'>
      <h4>{props.subHeader}</h4>
      <p>{props.bodyText}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button className='button modal-button' onClick={props.onHide}>
        Cancel
      </Button>
      <Button
        className='button modal-button delete-button'
        onClick={props.handleConfirm}
      >
        {props.actionLabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CustomModal;
