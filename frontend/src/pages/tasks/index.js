import React, { useState } from "react";
import { Link } from "react-router-dom";
import TaskCard from "../../components/tasks/TaskCard";
import Select from "react-select";
import { options } from "../../utils";

const Tasks = (props) => {
  const { labels, statuses, users, tasks } = props;
  const [searchTerm, setSearchTerm] = useState({
    label: "",
    status: "",
    assignee: "",
    author: false,
  });
  const renderTaskList = tasks.map((task) => {
    return (
      <TaskCard task={task} key={task.id} clickHandler={props.getTaskId} />
    );
  });
  const titledUsers = users.map((user) => ({
    ...user,
    title: `${user.firstname} ${user.lastname}`,
  }));
  const searchSubmit = (e) => {
    e.preventDefault();
    props.search(searchTerm);
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Задачи</h1>
      <Link className="btn btn-primary mb-5" to="/tasks/new">
        Создать задачу
      </Link>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form id="search">
            <div className="row">
              <div className="col-12 col-md">
                <div className="input-group mb-3">
                  <label htmlFor="data_status" className="input-group-text">
                    Статус
                  </label>
                  <Select
                    placeholder=""
                    options={options(statuses)}
                    className="basic-single"
                    classNamePrefix="select"
                    inputId="data_status"
                    value={searchTerm.status}
                    isClearable={true}
                    onChange={(e) =>
                      setSearchTerm((prevState) => ({
                        ...prevState,
                        status: e,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md">
                <div className="input-group mb-3">
                  <label htmlFor="data_assignee" className="input-group-text">Исполнитель</label>
                  <Select
                    placeholder=""
                    options={options(titledUsers)}
                    className="basic-single"
                    classNamePrefix="select"
                    inputId="data_assignee"
                    value={searchTerm.assignee}
                    isClearable={true}
                    onChange={(e) =>
                      setSearchTerm((prevState) => ({
                        ...prevState,
                        assignee: e,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md">
                <div className="input-group mb-3">
                  <label htmlFor="data_labels" className="input-group-text">Метка</label>
                  <Select
                    placeholder=""
                    options={options(labels)}
                    className="basic-single"
                    classNamePrefix="select"
                    inputId="data_labels"
                    value={searchTerm.label}
                    isClearable={true}
                    onChange={(e) =>
                      setSearchTerm((prevState) => ({
                        ...prevState,
                        label: e,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                className="form-check-input"
                id="data_isCreatorUser"
                type="checkbox"
                name="isCreatorUser"
                onChange={() =>
                  setSearchTerm((prevState) => ({
                    ...prevState,
                    author: !prevState.author,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="data_isCreatorUser">
                Только мои задачи
              </label>
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value="Показать"
              onClick={searchSubmit}
            />
          </form>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless table-striped mt-5 bg-white">
          <thead>
            <tr>
              <th className="py-3">ID</th>
              <th className="py-3">Наименование</th>
              <th className="py-3">Статус</th>
              <th className="py-3">Автор</th>
              <th className="py-3">Исполнитель</th>
              <th className="py-3">Дата создания</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTaskList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
