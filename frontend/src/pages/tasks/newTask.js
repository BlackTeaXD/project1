import React, { useState } from "react";
import Select from "react-select";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { options } from "../../utils";
import toast from "react-hot-toast";

const NewTask = (props) => {
  const navigate = useNavigate();
  const { labels, statuses, users } = props;
  const titledUsers = users.map((user) => ({
    ...user,
    title: `${user.firstname} ${user.lastname}`,
  }));
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    assignee: "",
    labels: [],
  });
  const [isError, setIsError] = useState(false);
  const errorMessage = "Заполните поле";
  const required = (className) => cn(className, { "is-invalid": isError });

  const submit = (e) => {
    e.preventDefault();
    if (!task.title || !task.status || !task.assignee) {
      setIsError(true);
      return;
    }
    const post = async () => {
      const data = {
        title: task.title,
        description: task.description,
        statusId: task.status.value,
        labelIds: task.labels.map((label) => label.value),
        assigneeId: task.assignee.value,
      };
      try {
        fetch("http://localhost:8080/tasks", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.status === 409) {
              setIsError(true);
              toast.error("Такая задача уже существует");
              return;
            }
            if (res.status === 201) {
              toast.success("Задача успешно добавлена");
              return res.json();
            }
          })
          .then((data) => {
            if (data) {
              setIsError(false);
              props.addTaskHandler(data);
              navigate("/tasks");
            }
          });
      } catch (error) {
      }
    };
    post();
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Создание задачи</h1>
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
          <label htmlFor="data_status">
            Статус<span className="text-danger fw-bold">*</span>
          </label>
          <Select
            placeholder=""
            options={options(statuses)}
            className={required("basic-single")}
            classNamePrefix="select"
            inputId="data_status"
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
          <label htmlFor="data_assignee">
            Исполнитель<span className="text-danger fw-bold">*</span>
          </label>
          <Select
            placeholder=""
            options={options(titledUsers)}
            className={required("basic-single")}
            classNamePrefix="select"
            inputId="data_assignee"
            value={task.assignee}
            isClearable={true}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, assignee: e }))
            }
          />
          {isError && !task.assignee ? (
            <div className="error-message">{errorMessage}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="data_labels">Метки</label>
          <Select
            isMulti
            placeholder=""
            options={options(labels)}
            className="basic-multi-select"
            classNamePrefix="select"
            inputId="data_labels"
            value={task.labels}
            isClearable={true}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, labels: e }))
            }
          />
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value="Создать"
          onClick={submit}
        />
      </form>
    </div>
  );
};

export default NewTask;
