import React from 'react';
import Login from '../components/login/Login';
import avatar from '../images/avatar.jpg';
import './styles.css';

const LoginPage = () => {
  return (
    <div className="container flex-grow">
      <h1 className="title bold">Вход</h1>
      <div className="row justify-content-center">
        <div className="col col-md-8">
          <div className="card">
            <div className="card-body row p-5">
              <div className="image col col-md-6">
                <img className="rounded-circle" src={avatar} alt="avatar" />
              </div>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
