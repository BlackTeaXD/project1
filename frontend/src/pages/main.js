import React from "react";

const Main = () => {
  return (
    <div className="container wrapper flex-grow-1">
      <h1 className="display-4 fw-bold mt-4"> </h1>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card shadow bg-white rounded-3">
              <div className="card-body p-5">
                <div className="display-4 fw-bold mb-0">
                  Привет от BlackTeaXD!
                </div>
                <p className="lead">Менеджер задач</p>
                <a
                  className="btn btn-primary btn-lg px-4 mt-3 fw-bold"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Узнать Больше
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
