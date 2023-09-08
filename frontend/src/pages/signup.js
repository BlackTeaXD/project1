import React from 'react';
import avatar from '../images/avatar.jpg';
import Sign from '../components/sign/sign';
import './styles.css';

const Signup = () => {
  return (
    <div className="container flex-grow">
      <h1 className="title bold">Регистрация</h1>
      <div className="row justify-content-center">
        <div className="col col-md-8">
          <div className="card">
            <div className="card-body row p-5">
              <div className="image col col-md-6">
                <img className="rounded-circle" src={avatar} alt="avatar" />
              </div>
              <Sign />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
