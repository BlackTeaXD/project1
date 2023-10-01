import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
const EditUser = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id, firstname, lastname, email } = state.user;
  const [user, setUser] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: '',
  });
  const edit = (e) => {
    e.preventDefault();
    props.clickHandler(user, id);
    setUser({ firstname: '', lastname: '', email: '', password: '' });
    navigate('/users');
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Изменение пользователя</h1>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_firstName"
          name="data[firstName]"
          value={user.firstname}
          placeholder="Имя"
          type="text"
          onChange={(e) => setUser((prevState) => ({ ...prevState, firstname: e.target.value }))}
        />
        <label htmlFor="data_firstName">Имя</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_lastName"
          name="data[lastName]"
          value={user.lastname}
          placeholder="Фамилия"
          type="text"
          onChange={(e) => setUser((prevState) => ({ ...prevState, lastname: e.target.value }))}
        />
        <label htmlFor="data_lastName">Фамилия</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_email"
          name="data[email]"
          value={user.email}
          placeholder="Email"
          type="text"
          onChange={(e) => setUser((prevState) => ({ ...prevState, email: e.target.value }))}
        />
        <label htmlFor="data_email">Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_password"
          name="data[password]"
          value={user.password}
          placeholder="Пароль"
          type="password"
          onChange={(e) => setUser((prevState) => ({ ...prevState, password: e.target.value }))}
        />
        <label htmlFor="data_password">Пароль</label>
      </div>
      <input className="btn btn-primary" type="submit" value="Изменить" onClick={edit} />
    </div>
  );
};
export default EditUser;
