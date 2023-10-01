import React from 'react';
const UserCard = (props) => {
  const { id , firstname, lastname, email} = props.user;
  return (
    <tr>
      <td>{id}</td>
      <td>{firstname} {lastname}</td>
      <td>{email}</td>
      <td></td>
      <td>
        <div className="d-flex flex-wrap">
          <a className="btn btn-primary me-1" href="/users/1/edit">
            Изменить
          </a>
          <form action="/users/1" method="post">
            <input name="_method" type="hidden" value="delete" />
            <input className="btn btn-danger" type="submit" value="Удалить" />
          </form>
        </div>
      </td>
    </tr>
  );
};
export default UserCard;
