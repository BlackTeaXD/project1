import React from 'react';

const Signup = () => {
  return (
    <div class="container wrapper flex-grow-1">
      <h1 class="display-4 fw-bold mt-4">Регистрация</h1>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <div class="card shadow-sm">
            <div class="card-body row p-5">
              <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img class="rounded-circle" src="/assets/avatar.jpg" alt="avatar" />
              </div>
              <div class="col-12 col-md-6 mt-3 mt-mb-0">
                <form action="/users" method="post">
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="data_firstName"
                      name="data[firstName]"
                      value=""
                      placeholder="Имя"
                      type="text"
                    />
                    <label for="data_firstName">Имя</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="data_lastName"
                      name="data[lastName]"
                      value=""
                      placeholder="Фамилия"
                      type="text"
                    />
                    <label for="data_lastName">Фамилия</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="data_email"
                      name="data[email]"
                      value=""
                      placeholder="Email"
                      type="text"
                    />
                    <label for="data_email">Email</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      id="data_password"
                      name="data[password]"
                      value=""
                      placeholder="Пароль"
                      type="password"
                    />
                    <label for="data_password">Пароль</label>
                  </div>
                  <input class="btn btn-primary" type="submit" value="Сохранить" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
