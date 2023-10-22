import React from "react";
import { Link } from "react-router-dom";
import LabelCard from "../../components/labels/LabelCard";

const Labels = (props) => {
  const deleteLabelHandler = (id) => {
    props.getLabelId(id);
  };
  const renderLabelList = props.labels.map((label) => {
    return (
      <LabelCard
        label={label}
        key={label.id}
        clickHandler={deleteLabelHandler}
      />
    );
  });
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Метки</h1>
      <Link className="btn btn-primary mb-5" to="/labels/new">
        Создать метку
      </Link>
      {props.labels.length === 0 ? (
        <p className="lead fw-bold">Здесь пока ничего нет</p>
      ) : (
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
            <tbody>{renderLabelList}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Labels;
