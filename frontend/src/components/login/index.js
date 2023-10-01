import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = (props) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Success:', result);
      props.getToken(result.accessToken);
      setData('');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="col-12 col-md-6 mt-3 mt-mb-0">
      <form>
        <div className="form-floating mb-3 field">
          <input
            className="form-control"
            id="data_email"
            value={data.email}
            placeholder="Email"
            type="text"
            onChange={(e) => setData((prevState) => ({ ...prevState, email: e.target.value }))}
          />
          <label htmlFor="data_email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_password"
            value={data.password}
            placeholder="Пароль"
            type="password"
            onChange={(e) => setData((prevState) => ({ ...prevState, password: e.target.value }))}
          />
          <label htmlFor="data_password">Пароль</label>
        </div>
        <input className="btn btn-primary" type="button" value="Войти" onClick={submit} />
      </form>
    </div>
  );
};

export default Login;
