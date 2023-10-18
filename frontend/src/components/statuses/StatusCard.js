import React from "react";
import { Link } from "react-router-dom";

const StatusCard = (props) => {
  const { id, title, createdAt } = props.status;
  const date = new Date(createdAt);
  return (
    <tr>
      <th>{id}</th>
      <th>{title}</th>
      <th>
        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
      </th>
      <th>
        <div className="d-flex">
          <Link className="btn btn-primary me-1" to={`/statuses/${id}/edit`}>
            Изменить
          </Link>
          <input
            className="btn btn-danger"
            type="button"
            value="Удалить"
            onClick={() => props.clickHandler(id)}
          />
        </div>
      </th>
    </tr>
  );
};

export default StatusCard;
