import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = (props) => {
  const { id, firstname, lastname, email, createdAt } = props.user;
  return (
    <tr>
      <td>{id}</td>
      <td>
        {firstname} {lastname}
      </td>
      <td>{email}</td>
      <td>{createdAt}</td>
      <td>
        <div className="d-flex flex-wrap">
          <Link className="btn btn-primary me-1" to={'/users/edit'} state={{ user: props.user }}>
            Изменить  
          </Link>
          <input
            className="btn btn-danger"
            type="submit"
            value="Удалить"
            onClick={() => props.clickHandler(id)}
          />
        </div>
      </td>
    </tr>
  );
};
export default UserCard;
