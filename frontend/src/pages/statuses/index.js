import React from "react";
import { Link } from "react-router-dom";
import StatusCard from "../../components/statuses/StatusCard";

const Statuses = (props) => {
  const deleteStatusHandler = (id) => {
    props.getStatusId(id);
  };
  const renderStatusList = props.statuses.map((status) => {
    return (
      <StatusCard
        status={status}
        key={status.id}
        clickHandler={deleteStatusHandler}
      />
    );
  });
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Статусы</h1>
      <Link className="btn btn-primary" to="/statuses/new">
        Создать статус
      </Link>
      <div className="table-responsive">
        <table className="table table-borderless table-striped mt-5 bg-white">
          <thead>
            <tr>
              <th className="py-3">ID</th>
              <th className="py-3">Наименование</th>
              <th className="py-3">Дата создания</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderStatusList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Statuses;
