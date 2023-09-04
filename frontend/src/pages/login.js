import React from 'react';

const Login = () => {
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Вход</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src="/images/avatar.jpg" alt='avatar'/>
              </div>
              <div className="col-12 col-md-6 mt-3 mt-mb-0">
                <form action="/session" method="post">
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="data_email"
                      name="data[email]"
                      value=""
                      placeholder="Email"
                      type="text"
                    />
                    <label for="data_email">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="data_password"
                      name="data[password]"
                      value=""
                      placeholder="Пароль"
                      type="password"
                    />
                    <label for="data_password">Пароль</label>
                  </div>
                  <input className="btn btn-primary" type="submit" value="Войти" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
