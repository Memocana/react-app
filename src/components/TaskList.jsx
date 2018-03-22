import React from 'react';

const TaskList = (props) => {
  return (
    <div>
      <div className="title-with-lines">
        <div className="line"></div>
        <div className="title bold">İşler</div>
        <div className="line"></div>
      </div>
      <div className="job-list">
        <div>
          <div className="job-item">İş 1</div>
          <div style={{ display: "flex" }}>
            <div className="assignee">
              Assignee
               </div>
            <div className="delete-button">sil</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TaskList;