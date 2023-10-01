import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const logined = () => {
    return props.token ? (
      <ul className="navbar-nav justify-content-end w-100">
        <li className="nav-item me-auto">
          <Link className="nav-link" to="/users">
            Пользователи
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/statuses">
            Статусы
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/labels">
            Метки
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">
            Задачи
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={props.exit}>
            Выйти
          </Link>
        </li>
      </ul>
    ) : (
      <ul className="navbar-nav justify-content-end w-100">
        <li className="nav-item me-auto">
          <Link className="nav-link" to="/users">
            Пользователи
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/session/new">
            Вход
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users/new">
            Регистрация
          </Link>
        </li>
      </ul>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Менеджер задач
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
          {logined()}
        </div>
      </div>
    </nav>
  );
};
export default Header;
