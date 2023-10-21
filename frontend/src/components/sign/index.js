import React, { useState } from "react";
import toast from "react-hot-toast";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

const Sign = (props) => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Неправильный формат email");
  const input = cn("form-control", { "is-invalid": isError });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8080/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status === 201) {
            setIsError(false);
            return res.json();
          } 

          if (res.status === 400) {
            toast.error("Неправильный формат email");
            setErrorMessage("Неправильный формат email")
          }

          if (res.status === 409)
            toast.error("Такой пользователь уже существует");
          if (res.status === 500) toast.error("Что-то пошла не так");
          setIsError(true);
        })
        .then((data) => {
          if (data) {
            props.register(data.user);
            toast.success("Пользователь успешно зарегистрирован");
            navigate("/");
          }
        });
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div className="col-12 col-md-6 mt-3 mt-mb-0">
      <form onSubmit={submit}>
        <div className="form-floating mb-3">
          <input
            className={input}
            id="data_firstName"
            name="data[firstName]"
            value={data.firstname}
            placeholder="Имя"
            type="text"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                firstname: e.target.value,
              }))
            }
          />
          <label htmlFor="data_firstName">Имя</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className={input}
            id="data_lastName"
            name="data[lastName]"
            value={data.lastname}
            placeholder="Фамилия"
            type="text"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                lastname: e.target.value,
              }))
            }
          />
          <label htmlFor="data_lastName">Фамилия</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className={input}
            id="data_email"
            name="data[email]"
            value={data.email}
            placeholder="Email"
            type="text"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <label htmlFor="data_email">Email</label>
          {isError ? (
            <div className="error-message">
              {errorMessage}
            </div>
          ) : null}
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control "
            id="data_password"
            name="data[password]"
            value={data.password}
            placeholder="Пароль"
            type="password"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
          <label htmlFor="data_password">Пароль</label>
        </div>
        <input className="btn btn-primary" type="submit" value="Сохранить" />
      </form>
    </div>
  );
};
export default Sign;
