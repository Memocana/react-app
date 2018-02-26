import React from 'react';
import PropTypes from 'prop-types';
import NewTaskModal from './NewTaskModal';

const NewTaskButton = (props) => {
  return <div>
    <div className="add-new-button-container">
      <button
        className="add-new-button"
        onClick={() => props.handleChange("showNewTaskModal", true)}>+ Yeni İş</button>
    </div>
    <NewTaskModal
      show={props.showNewTaskModal}
      title={'Yeni İş'}
      taskDescription={props.taskDescription}
      handleChange={props.handleChange}
      addNewTask={props.addNewTask}
      handleClose={props.handleClose}
    />
  </div>;
}
NewTaskButton.propTypes = {
  showNewTaskModal: PropTypes.bool,
  taskDescription: PropTypes.string,
  handleChange: PropTypes.func,
  addNewTask: PropTypes.func,
  handleClose: PropTypes.func
}
export default NewTaskButton;
