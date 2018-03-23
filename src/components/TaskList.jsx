import React from 'react';
import _ from 'lodash';

const TaskList = (props) => {
  const { tasks, users } = this.props;
  return (
    <div>
      <div className="title-with-lines">
        <div className="line"></div>
        <div className="title bold">İşler</div>
        <div className="line"></div>
      </div>
      <div className="job-list">

      {_(tasks).map((t, i) => {
        let user = _.find(users, { id: t.userId });
        return <div
          key={i}
          className={"job-container "}
          >
          <div className="job-item">{t.description}</div>
          <div style={{ display: "flex" }}>
            <div className="assignee">
              {
                t.userId
                  ? _.get(user, "firstname") + " " + _.get(user, "lastname")
                  : "Kimse atanmadı"
              }
              </div>
            <div className="delete-button" onClick={(e) => props.onClickTaskDelete(t.id)}>sil</div>
          </div>
        </div>
      })}


      </div>
    </div>
  )
}
export default TaskList;