import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const TaskPage = (props) => {
  const { token } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    author: "",
    assignee: "",
    labels: [],
    createdAt: "",
  });
  useEffect(() => {
    const getTask = async () => {
      fetch(`http://localhost:8080/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          if (res.status === 404) {
            toast.error("Задача не найдена");
            navigate("/tasks");
          }
        })
        .then((data) =>
          setTask({
            title: data.title,
            description: data.description,
            status: data.status.title,
            author: `${data.author.firstname} ${data.author.lastname}`,
            assignee: `${data.assignee.firstname} ${data.assignee.lastname}`,
            labels: data.labels,
            createdAt: data.createdAt,
          })
        );
    };
    if (token) getTask();
  }, [id, token, navigate]);
  const remove = (e) => {
    e.preventDefault();
    props.clickHandler(id);
    navigate("/tasks");
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">{task.title}</h1>
      <div className="row mt-5 p-5 shadow bg-white">
        <div className="col-12 col-md-8 order-2 order-md-1">
          <div className="lead fw-normal mb-4">{task.description}</div>
        </div>
        <div className="col-12 col-md-4 border-start px-3 order-1 order-md-2 mb-3 mb-md-0">
          <div className="mb-2">
            <span className="me-1 badge bg-danger text-white">
              {task.status}
            </span>
            {task.labels.map((label) => (
              <span className="me-1 badge bg-info text-white" key={label.id}>
                {label.title}
              </span>
            ))}
          </div>
          <div className="d-flex flex-wrap mb-3">
            <span className="text-muted me-2">Автор</span>
            <span>{task.author}</span>
          </div>
          <div className="d-flex flex-wrap mb-3">
            <span className="text-muted me-2">Исполнитель</span>
            <span>{task.assignee}</span>
          </div>
          <div className="d-flex flex-wrap mb-3">
            <span className="text-muted me-2">Дата создания</span>
            <span>{task.createdAt}</span>
          </div>
          <div className="d-flex flex-wrap">
            <Link className="btn btn-primary me-1" to={`/tasks/${id}/edit`}>
              Изменить
            </Link>

            <input
              className="btn btn-danger"
              type="submit"
              value="Удалить"
              onClick={remove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskPage;
