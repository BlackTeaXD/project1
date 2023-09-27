import React from 'react';

const LabelCard = (props) => {
  const { id, name, date } = props.label;
  const change = (e) => {
    e.preventDefault();
  };
  return (
    <tr>
      <th>{id}</th>
      <th>{name}</th>
      <th>{date}</th>
      <th>
        <div className="d-flex">
          <input className="btn btn-primary me-1" type="button" value="Изменить" onClick={change} />
          <input
            className="btn btn-danger"
            type="button"
            value="Удалить"
            onClick={() => props.clickHandler(id)}
          />
        </div>
      </th>
    </tr>
  );
};

export default LabelCard;
