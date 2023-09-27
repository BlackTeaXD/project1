import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDate } from '../../utils';

const NewLabel = (props) => {
  const [label, setLabel] = useState({name:'', date: ''});
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (label.name.length < 1) {
      return;
    }
    props.addLabelHandler(label);
    setLabel('');
    navigate('/labels');
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Создание метки</h1>
      <form action="/labels" method="post">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_name"
            name="data[name]"
            value={label.name}
            placeholder="Наименование"
            type="text"
            onChange={(e) => setLabel({name:e.target.value,date: getDate()})}
          />
          <label htmlFor="data_name">Наименование</label>
        </div>
        <input className="btn btn-primary" type="submit" value="Создать" onClick={submit} />
      </form>
    </div>
  );
};

export default NewLabel;
