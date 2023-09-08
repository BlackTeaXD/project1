import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Менеджер задач
        </Link>

          <Link className="nav-link auto" to="/users">
            Пользователи
          </Link>
          <Link className="nav-link" to="/session/new">
            Вход
          </Link>
          <Link className="nav-link" to="/users/new">
            Регистрация
          </Link>
        </div>

    </nav>
  );
};
export default Header;
