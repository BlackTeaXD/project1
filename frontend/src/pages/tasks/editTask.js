import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import cn from "classnames";
import Select from "react-select";
import { options } from "../../utils";

const EditTask = (props) => {
  const { token, labels, statuses, users } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "" });
  const [isError, setIsError] = useState(false);
  const errorMessage = "Заполните поле";
  const required = (className) => cn(className, { "is-invalid": isError });
  const titledUsers = users.map((user) => ({
    ...user,
    title: `${user.firstname} ${user.lastname}`,
  }));

  useEffect(() => {
    const getTask = async () => {
      fetch(`http://localhost:8080/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) =>
          setTask({
            title: data.title,
            description: data.description,
            status: { value: data.status.id, label: data.status.title },
            assignee: {
              value: data.assignee.id,
              label: `${data.assignee.firstname} ${data.assignee.lastname}`,
            },
            labels: data.labels.reduce((acc, { id, title }) => {
              return [...acc, { value: id, label: title }];
            }, []),
          })
        );
    };
    if (token) getTask();
  }, [id, token]);

  const edit = (e) => {
    e.preventDefault();
    if (!task.title || !task.status || !task.assignee) {
      setIsError(true);
      return;
    }
    const data = {
      id: id,
      title: task.title,
      description: task.description,
      statusId: task.status.value,
      labelIds: task.labels.map((label) => label.value),
      assigneeId: task.assignee.value,
    };
    try {
      fetch(`http://localhost:8080/tasks/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 409) {
          toast.error("Такая задача уже существует");
          return;
        }
        if (res.status === 200) {
          toast.success("Обновлено");
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          props.clickHandler(data);
          navigate("/tasks");
        }
      });
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Изменение задачи</h1>
      <form>
        <div className="form-floating mb-3">
          <input
            className={required("form-control")}
            id="data_name"
            name="data[name]"
            value={task.title}
            placeholder="Наименование"
            type="text"
            onChange={(e) =>
              setTask((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
          <label htmlFor="data_name">
            Наименование<span className="text-danger fw-bold">*</span>
          </label>
          {isError && !task.title ? (
            <div className="error-message">{errorMessage}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="data_description">Описание</label>
          <textarea
            className="form-control"
            id="data_description"
            name="data[description]"
            rows="3"
            value={task.description}
            onChange={(e) =>
              setTask((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label>
            Статус<span className="text-danger fw-bold">*</span>
          </label>
          <Select
            options={options(statuses)}
            className={required("basic-single")}
            classNamePrefix="select"
            value={task.status}
            isClearable={true}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, status: e }))
            }
          />
          {isError && !task.status ? (
            <div className="error-message">{errorMessage}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label>
            Исполнитель<span className="text-danger fw-bold">*</span>
          </label>
          <Select
            placeholder=""
            options={options(titledUsers)}
            className={required("basic-single")}
            classNamePrefix="select"
            isClearable={true}
            value={task.assignee}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, assignee: e }))
            }
          />
          {isError && !task.assignee ? (
            <div className="error-message">{errorMessage}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label>Метки</label>
          <Select
            isMulti
            placeholder=""
            options={options(labels)}
            className="basic-multi-select"
            classNamePrefix="select"
            value={task.labels}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, labels: e }))
            }
          />
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value="Изменить"
          onClick={edit}
        />
      </form>
    </div>
  );
};
export default EditTask;
