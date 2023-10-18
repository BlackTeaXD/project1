import React from "react";
import { Link } from "react-router-dom";
const TaskCard = (props) => {
  const { id, title, status, author, assignee, createdAt } = props.task;
  const date = new Date(createdAt);
  return (
    <tr>
      <td>{id}</td>
      <td>
        <a href={`/tasks/${id}`}>{title}</a>
      </td>
      <td>{status}</td>
      <td>
        {author.firstname} {author.lastname}
      </td>
      <td>
        {assignee.firstname} {assignee.lastname}
      </td>
      <td>
        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
      </td>
      <td>
        <div className="d-flex">
          <Link className="btn btn-primary me-1" to={`/tasks/${id}/edit`}>
            Изменить
          </Link>
          <form>
            <input
              className="btn btn-danger"
              type="submit"
              value="Удалить"
              onClick={() => props.clickHandler(id)}
            />
          </form>
        </div>
      </td>
    </tr>
  );
};

export default TaskCard;
