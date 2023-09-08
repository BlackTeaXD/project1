import React, { useState } from 'react';
import './styles.css'


const Sign = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = (e) => {
    e.preventDefault();
    console.log(name,lastName,email,password);
  };
  return (
    <div className="col col-md-6 mt-3">
    <form onSubmit={submit}>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_firstName"
          name="data[firstName]"
          value={name}
          placeholder="Имя"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_lastName"
          name="data[lastName]"
          value={lastName}
          placeholder="Фамилия"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_email"
          name="data[email]"
          value={email}
          placeholder="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="data_password"
          name="data[password]"
          value={password}
          placeholder="Пароль"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input className="btn mt-0" type="submit" value="Сохранить" />
    </form>
  </div>
  )
};
export default Sign;
