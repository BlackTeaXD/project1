import React from 'react';
import UserCard from '../components/users/UserCard';

const Users = (props) => {
  const { users, getUserId } = props;
  const deleteUserHandler = (id) => {
    getUserId(id);
  };
  const renderUsersList = users.map((user) => {
    return <UserCard user={user} key={user.id} clickHandler={deleteUserHandler} />;
  });
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Пользователи</h1>
      <div className="table-responsive">
        <table className="table table-borderless table-striped mt-5 bg-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Полное имя</th>
              <th>Email</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>{renderUsersList}</tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
