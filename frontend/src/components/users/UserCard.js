import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  const { id, firstname, lastname, email, createdAt } = props.user;
  const date = new Date(createdAt);
  const deleteButton = cn("btn", "btn-danger", {
    disabled: id === props.currentUser || !props.currentUser,
  });
  const editButton = cn("btn", "btn-primary", "me-1", {
    disabled: !props.currentUser,
  });
  return (
    <tr>
      <td>{id}</td>
      <td>
        {firstname} {lastname}
      </td>
      <td>{email}</td>
      <td>
        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
      </td>
      <td>
        <div className="d-flex flex-wrap">
          <Link className={editButton} to={`/users/${id}/edit`}>
            Изменить
          </Link>
          <button
            className={deleteButton}
            onClick={() => props.clickHandler(id)}
          >
            Удалить
          </button>
        </div>
      </td>
    </tr>
  );
};
export default UserCard;
