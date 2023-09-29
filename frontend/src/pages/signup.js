import React from 'react';
import avatar from '../images/avatar.jpg';
import Sign from '../components/sign/Sign'
const Signup = () => {
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Регистрация</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={avatar} alt="Тут может быть ваша реклама" />
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
