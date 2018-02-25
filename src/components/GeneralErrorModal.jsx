import React  from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

 const  GeneralErrorModal = (props) => {
	return(<div>
	<Modal dialogClassName="static-modal" show={props.show} onHide={props.handleClose}>
		<Modal.Dialog>
		<Modal.Header>
			<Modal.Title>{props.title}</Modal.Title>
		</Modal.Header>

		<Modal.Body>{props.body}</Modal.Body>

		<Modal.Footer>
		<Button onClick={props.handleClose}>Close</Button>
		</Modal.Footer>
		</Modal.Dialog>
	</Modal>
  </div>);
}
GeneralErrorModal.propTypes={
	show:PropTypes.bool,
	title:PropTypes.string,
	body:PropTypes.string,
	handleClose:PropTypes.func
}
export default GeneralErrorModal;
