import React from 'react';
const TaskCard = (props) => {
  const { id, name, description, author, executor, date } = props.task;
  return (
    <tr>
      <td>{id}</td>
      <td>
        <a href="/tasks/1">{name}</a>
      </td>
      <td>{description}</td>
      <td>{author}</td>
      <td>{executor}</td>
      <td>{date}</td>
      <td>
        <div className="d-flex">
          <a className="btn btn-primary me-1" href="/tasks/1/edit">
            Изменить
          </a>
          <form action="/tasks/1" method="post">
            <input name="_method" type="hidden" value="delete" />
            <input className="btn btn-danger" type="submit" value="Удалить" />
          </form>
        </div>
      </td>
    </tr>
  );
};

export default TaskCard;
