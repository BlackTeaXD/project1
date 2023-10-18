import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditUser = (props) => {
  const { id } = useParams();
  const { token } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const getUser = async () => {
      fetch(`http://localhost:8080/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) =>
          setUser({
            id: id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: "",
          })
        );
    };
    if (token) getUser();
  }, [id, token]);
  const edit = (e) => {
    e.preventDefault();
    props.clickHandler(user);
    navigate("/users");
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
          onChange={(e) =>
            setUser((prevState) => ({
              ...prevState,
              firstname: e.target.value,
            }))
          }
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
          onChange={(e) =>
            setUser((prevState) => ({ ...prevState, lastname: e.target.value }))
          }
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
          onChange={(e) =>
            setUser((prevState) => ({ ...prevState, email: e.target.value }))
          }
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
          onChange={(e) =>
            setUser((prevState) => ({ ...prevState, password: e.target.value }))
          }
        />
        <label htmlFor="data_password">Пароль</label>
      </div>
      <input
        className="btn btn-primary"
        type="submit"
        value="Изменить"
        onClick={edit}
      />
    </div>
  );
};
export default EditUser;
