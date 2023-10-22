import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewLabel = (props) => {
  const [label, setLabel] = useState({ title: "" });
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const post = async () => {
      try {
        fetch("http://localhost:8080/labels", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(label),
        })
          .then((res) => {
            if (res.status === 409) {
              toast.error("Такая метка уже существует");
              return;
            }
            if (res.status === 201) {
              toast.success("Метка добавлена");
              return res.json();
            }
          })
          .then((data) => {
            if (data) props.addLabelHandler(data);
            navigate("/labels");
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    post();
  };
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4">Создание метки</h1>
      <form>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_name"
            name="data[name]"
            value={label.title}
            placeholder="Наименование"
            type="text"
            onChange={(e) => setLabel({ title: e.target.value })}
          />
          <label htmlFor="data_name">Наименование</label>
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value="Создать"
          onClick={submit}
        />
      </form>
    </div>
  );
};

export default NewLabel;
