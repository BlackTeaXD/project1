import React, { useState, useEffect } from 'react';
import './App.css';
import { uniqueId } from 'lodash';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header/index';
import Main from '../pages/main';
import Users from '../pages/users';
import EditUser from '../pages/editUsers';
import Login from '../pages/loginPage';
import Signup from '../pages/signup';
import Footer from './footer/index';
import Tasks from '../pages/tasks/index';
import NewTask from '../pages/tasks/newTask';
import StatusesPage from '../pages/statuses/index';
import NewStatus from '../pages/statuses/newStatus';
import LabelsPage from '../pages/labels/index';
import NewLabel from '../pages/labels/newLabel';

const tasks = [
  {
    id: uniqueId(),
    name: 'stas',
    description: 'stas',
    status: 'stas',
    author: 'Sanya',
    executor: 'stas',
    labels: ['stas'],
    date: 'stas',
  },
];
function App() {
  const LOCAL_STORAGE_TOKEN = 'token';
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const getToken = (token) => {
    setToken(token);
  };
  const exit = () => {
    setToken('');
    localStorage.setItem(LOCAL_STORAGE_TOKEN, '');
  };
  useEffect(() => {
    const retriveToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN));
    if (retriveToken) setToken(retriveToken);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://localhost:8080/users`);
        const body = await result.json();
        setUsers(body);
      } catch (err) {
        // error handling code
      }
    };
    fetchData();
  }, []);
  const removeUserHandler = async (id) => {
    await fetch(`http://localhost:8080/user/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const newUsers = users.filter((user) => {
      return user.id !== id;
    });
    setUsers(newUsers);
  };
  const updateUserHandler = async (user, id) => {
    const response = await fetch(`http://localhost:8080/user/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    console.log(response);
  };
  const removeStatusHandler = (id) => {
    const newStatus = statuses.filter((status) => {
      return status.id !== id;
    });
    setStatus(newStatus);
  };
  const LOCAL_STORAGE_KEY_STATUSES = 'statuses';
  const [statuses, setStatus] = useState([]);

  const addStatusHandler = (status) => {
    setStatus([...statuses, { id: uniqueId(), ...status }]);
  };
  // useEffect(() => {
  //   const retriveStatus = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_STATUSES));
  //   if (retriveStatus) setStatus(retriveStatus);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY_STATUSES, JSON.stringify(statuses));
  // }, [statuses]);

  const LOCAL_STORAGE_KEY_LABELS = 'labels';
  const [labels, setLabels] = useState([]);
  const removeLabelHandler = (id) => {
    const newLabels = labels.filter((label) => {
      return label.id !== id;
    });
    setLabels(newLabels);
  };
  const addLabelHandler = (label) => {
    setLabels([...labels, { id: uniqueId(), ...label }]);
  };
  // useEffect(() => {
  //   const retriveLabels = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LABELS));
  //   if (retriveLabels) setLabels(retriveLabels);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY_LABELS, JSON.stringify(labels));
  // }, [labels]);

  return (
    <Router>
      <Header token={token} exit={exit} />
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/users" element={<Users users={users} getUserId={removeUserHandler} />} />
        <Route path="/users/edit" element={<EditUser clickHandler={updateUserHandler} />} />
        <Route path="/session/new" element={<Login getToken={getToken} />} />
        <Route path="/users/new" element={<Signup />} />
        <Route
          path="/labels"
          element={<LabelsPage labels={labels} getLabelId={removeLabelHandler} />}
        />
        <Route path="/labels/new" element={<NewLabel addLabelHandler={addLabelHandler} />} />

        <Route
          path="/statuses"
          element={<StatusesPage statuses={statuses} getStatusId={removeStatusHandler} />}
        />
        <Route path="/statuses/new" element={<NewStatus addStatusHandler={addStatusHandler} />} />

        <Route
          path="/tasks"
          element={<Tasks labels={labels} statuses={statuses} users={users} tasks={tasks} />}
        />
        <Route
          path="/tasks/new"
          element={<NewTask labels={labels} statuses={statuses} users={users} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
