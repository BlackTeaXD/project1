import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDate } from '../../utils';

const NewStatus = (props) => {
  const [status, setStatus] = useState({ name: '', date: '' });
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (status.name.length < 1) {
      return;
    }
    props.addStatusHandler(status);
    setStatus('');
    navigate('/statuses');
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Создание статуса</h1>
      <form action="/statuses" method="post">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_name"
            name="data[name]"
            value={status.name}
            placeholder="Наименование"
            type="text"
            onChange={(e) => setStatus({ name: e.target.value, date: getDate() })}
          />
          <label htmlFor="data_name">Наименование</label>
        </div>
        <input className="btn btn-primary" type="submit" value="Создать" onClick={submit} />
      </form>
    </div>
  );
};
export default NewStatus;
