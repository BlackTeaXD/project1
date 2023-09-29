import React from 'react';
import { Link } from 'react-router-dom';
import { renderList } from '../../utils';
import TaskCard from '../../components/tasks/TaskCard';

const Tasks = (props) => {
  const { labels, statuses, users, tasks } = props;
  const renderTaskList = tasks.map((task) => {
    return <TaskCard task={task} key={task.id} />;
  });
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Задачи</h1>
      <Link className="btn btn-primary mb-5" to="/tasks/new">
        Создать задачу
      </Link>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form action="/tasks" method="get">
            <div className="row">
              <div className="col-12 col-md">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="data_status">
                    Статус
                  </label>
                  <select className="form-select" id="data_status" name="status">
                    <option></option>
                    {renderList(statuses)}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="data_executor">
                    Исполнитель
                  </label>
                  <select className="form-select" id="data_executor" name="executor">
                    <option></option>
                    {renderList(users)}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="data_label">
                    Метка
                  </label>
                  <select className="form-select" id="data_label" name="label">
                    <option></option>
                    {renderList(labels)}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                className="form-check-input"
                id="data_isCreatorUser"
                type="checkbox"
                name="isCreatorUser"
              />
              <label className="form-check-label" htmlFor="data_isCreatorUser">
                Только мои задачи
              </label>
            </div>
            <input className="btn btn-primary" type="submit" value="Показать" />
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
