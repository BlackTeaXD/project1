import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
const EditStatus = (props) => {
  const { id } = useParams();
  const { token } = props;
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    title: '',
    id: '',
  });
  useEffect(() => {
    const getStatus = async () => {
      fetch(`http://localhost:8080/statuses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setStatus(data));
    };
    if(token) getStatus();
  },[id, token]);
  const edit = (e) => {
    e.preventDefault();
    props.clickHandler(status);
    setStatus({});
    navigate("/statuses");
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Изменение статуса</h1>
      <form>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_name"
            name="data[name]"
            value={status.title}
            placeholder="Наименование"
            type="text"
            onChange={(e) =>
              setStatus((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            } 
          />
          <label htmlFor="data_name">Наименование</label>
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value="Изменить"
          onClick={edit}
        />
      </form>
    </div>
  );
};
export default EditStatus;
