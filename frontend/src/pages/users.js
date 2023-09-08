import React from 'react';
import './styles.css';
import './table.css'

const Login = () => {
  return (
    <div className="container flex-grow">
      <h1 className="title bold">Пользователи</h1>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>ID</th>
              <th>Полное имя</th>
              <th>Email</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
export default Login;
