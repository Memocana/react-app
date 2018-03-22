import React from 'react';

const UserList = (props) => {
    return (
      <div>
        <div className="title-with-lines">
          <div className="line"></div>
          <div className="title bold">Ev Halkı</div>
          <div className="line"></div>
        </div>
        <table className="people-table">
          <thead>
            <tr>
              <th className="name-surname-column">Adı Soyadı</th>
              <th className="task-count-column">Toplam Görev</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="name-surname-column">user 1</td>
              <td className="task-count-column">10</td>
            </tr>
            <tr>
              <td className="name-surname-column">user 2</td>
              <td className="task-count-column">12</td>
            </tr>
            <tr>
              <td className="name-surname-column">user 3</td>
              <td className="task-count-column">13</td>
            </tr>
            <tr>
              <td className="name-surname-column">user 4</td>
              <td className="task-count-column">15</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default UserList;