import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";
const EditLabel = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = props;
  const [label, setLabel] = useState({ title: "" });

  useEffect(() => {
    const getLabel = async () => {
      fetch(`http://localhost:8080/labels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setLabel(data));
    };
    if (token) getLabel();
  }, [id, token]);

  const edit = (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:8080/labels/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
      })
        .then((res) => {
          if (res.status === 409) {
            toast.error("Такая метка уже существует");
            return;
          }
          if (res.status === 200) {
            toast.success("Обновлено");
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            props.clickHandler(label);
            navigate("/labels");
          }
        });
    } catch (error) {}
  };

  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Изменение метки</h1>
      <form>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_name"
            name="data[name]"
            value={label.title}
            placeholder="Наименование"
            type="text"
            onChange={(e) =>
              setLabel((prevState) => ({ ...prevState, title: e.target.value }))
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
export default EditLabel;
