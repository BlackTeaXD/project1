import React from 'react';
import './styles.css';

const Main = () => {
  return (
    <div className="container flex-grow">
      <h1 className="title bold"> </h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body p-5">
                <div className="display bold">Привет от Хекслета!</div>
                <p className="lead">Практические курсы по программированию</p>
                <a className="btn bold" href="https://hexlet.io">
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
