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
    <Modal.Body bsPrefix='body-text'>
      <h3>{props.subHeader}</h3>
      <p>{props.bodyText}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Cancel</Button>
      <Button onClick={props.handleConfirm}>{props.actionLabel}</Button>
    </Modal.Footer>
  </Modal>
);

export default CustomModal;
