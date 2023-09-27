import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDate, renderList } from '../../utils';

const NewTask = (props) => {
  const { labels, statuses, users } = props;
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: '',
    description: '',
    status: '',
    executor: '',
    labels: [],
    date: '',
  });
  const submit = (e) => {
    e.preventDefault();
    if (task.name.length < 1) {
      return;
    }
    props.addStatusHandler();
    setTask('');
    navigate('/tasks');
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
            value={task.name}
            placeholder="Наименование"
            type="text"
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, name: e.target.value, date: getDate() }))
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
              setTask((prevState) => ({ ...prevState, description: e.target.value }))
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="data_statusId">Статус</label>
          <select
            className="form-control"
            id="data_statusId"
            name="data[statusId]"
            value={task.status}
            onChange={(e) => setTask((prevState) => ({ ...prevState, status: e.target.value }))}
          >
            <option></option>
            {renderList(statuses)}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="data_executorId">Исполнитель</label>
          <select
            className="form-control"
            id="data_executorId"
            name="data[executorId]"
            value={task.executor}
            onChange={(e) => setTask((prevState) => ({ ...prevState, executor: e.target.value }))}
          >
            <option></option>
            <option>{renderList(users)}</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="data_labels">Метки</label>
          <select
            className="form-control"
            id="data_labels"
            name="data[labels]"
            multiple
            value={task.labels}
            onChange={(e) =>
              setTask((prevState) => ({ ...prevState, labels: [...e.target.value] }))
            }
          >
            {renderList(labels)}
          </select>
        </div>
        <input className="btn btn-primary" type="submit" value="Создать" onClick={submit} />
      </form>
    </div>
  );
};

export default NewTask;
