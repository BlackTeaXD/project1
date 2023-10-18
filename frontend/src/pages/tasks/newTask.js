import React, { useState } from "react";
import Select from "react-select";
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
  const submit = (e) => {
    e.preventDefault();
    const data = {
      title: task.title,
      description: task.description,
      statusId: task.status.value,
      labelIds: task.labels.map((label) => label.value),
      assigneeId: task.assignee.value,
    };
    const post = async () => {
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
              toast.error("Task already exists");
              return;
            }
            if (res.status === 201) {
              toast.success("Task successfully added");
              return res.json();
            }
          })
          .then((data) => {
            if (data) props.addTaskHandler(data);
            navigate("/tasks");
          });
      } catch (error) {
        console.error("Error:", error);
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
            className="form-control"
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
          <label htmlFor="data_name">Наименование</label>
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
          <label htmlFor="data_statusId">Статус</label>
          <Select
            placeholder=""
            options={options(statuses)}
            className="basic-single"
            classNamePrefix="select"
            value={task.status}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, status: e }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="data_executorId">Исполнитель</label>
          <Select
            placeholder=""
            options={options(titledUsers)}
            className="basic-single"
            classNamePrefix="select"
            value={task.assignee}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, assignee: e }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="data_labels">Метки</label>
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
          value="Создать"
          onClick={submit}
        />
      </form>
    </div>
  );
};

export default NewTask;
