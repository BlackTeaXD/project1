import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "./header/index";
import Main from "../pages/main";
import Users from "../pages/users/users";
import Login from "../pages/loginPage";
import Signup from "../pages/signup";
import EditUser from "../pages/users/editUser";
import EditStatus from "../pages/statuses/editStatus";
import EditLabels from "../pages/labels/editLabels";
import EditTasks from "../pages/tasks/editTask";
import NewTask from "../pages/tasks/newTask";
import NewStatus from "../pages/statuses/newStatus";
import NewLabel from "../pages/labels/newLabel";
import Tasks from "../pages/tasks/index";
import TaskPage from "../pages/tasks/taskPage";
import LabelsPage from "../pages/labels/index";
import StatusesPage from "../pages/statuses/index";
import Footer from "./footer/index";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const LOCAL_STORAGE_DATA_TOKEN = "data";
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({ accessToken: "", id: "" });
  const [labels, setLabels] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const logined = !!userData.accessToken;

  useEffect(() => {
    const retriveData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_DATA_TOKEN)
    );
    const fetchUsers = async () => {
      try {
        fetch(`http://localhost:8080/users`)
          .then((res) => res.json())
          .then((data) => setUsers(data));
      } catch (err) {}
    };
    if (retriveData) {
      setUserData(retriveData);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`http://localhost:8080/statuses`, {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 401) {
              exit();
              return;
            }
            if (res.status === 200) return res.json();
          })
          .then((data) => setStatuses(data));
        fetch(`http://localhost:8080/labels`, {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 401) {
              exit();
              return;
            }
            if (res.status === 200) return res.json();
          })
          .then((data) => setLabels(data));
        fetch(`http://localhost:8080/tasks`, {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 401) {
              exit();
              return;
            }
            if (res.status === 200) return res.json();
          })
          .then((data) => setTasks(data));
      } catch (err) {}
    };

    if (logined) {
      localStorage.setItem(LOCAL_STORAGE_DATA_TOKEN, JSON.stringify(userData));
      fetchData();
    }
  }, [userData, logined]);

  const exit = () => {
    setUserData({});
    localStorage.removeItem(LOCAL_STORAGE_DATA_TOKEN);
  };

  const login = (data) => setUserData(data);

  // User function

  const removeUserHandler = async (id) => {
    fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    }).then((res) => {
      if (res.status === 403)
        toast.error("Невозможно удалить этого пользователя");
      if (res.status === 401) toast.error("Несанкционированный доступ");
      if (res.status === 200) {
        toast.success("Удалено");
        const newUsers = users.filter((user) => {
          return user.id !== id;
        });
        setUsers(newUsers);
      }
    });
  };

  const updateUserHandler = async (data) => {
    const { id } = data;
    setUsers(
      users.map((user) => {
        return user.id === id ? { ...data } : user;
      })
    );
  };

  const addUserHandler = (user) => setUsers([...users, { ...user }]);

  // Status functions

  const updateStatusHandler = async (data) => {
    const { id } = data;
    setStatuses(
      statuses.map((status) => {
        return status.id === id ? { ...data } : status;
      })
    );
  };

  const removeStatusHandler = async (id) => {
    fetch(`http://localhost:8080/statuses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Удалено");
        const newStatus = statuses.filter((status) => {
          return status.id !== id;
        });
        setStatuses(newStatus);
      }
      if (res.status === 401) toast.error("Несанкционированный доступ");
    });
  };

  const addStatusHandler = (status) =>
    setStatuses([...statuses, { ...status }]);

  //  Labels functions

  const updateLabelsHandler = async (data) => {
    const { id } = data;
    setLabels(
      labels.map((label) => {
        return label.id === id ? { ...data } : label;
      })
    );
  };

  const removeLabelHandler = async (id) => {
    fetch(`http://localhost:8080/labels/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Удалено");
        const newLabels = labels.filter((label) => {
          return label.id !== id;
        });
        setLabels(newLabels);
      }
      if (res.status === 401) toast.error("Несанкционированный доступ");
    });
  };

  const addLabelHandler = (label) => setLabels([...labels, { ...label }]);
  // Task functions

  const updateTasksHandler = async (data) => {
    const { id } = data;
    setTasks(
      tasks.map((task) => {
        return task.id === +id ? data : task;
      })
    );
  };

  const removeTaskHandler = async (id) => {
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Удалено");
        const newTasks = tasks.filter((task) => {
          return task.id !== +id;
        });
        setTasks(newTasks);
      }
      if (res.status === 401) toast.error("Несанкционированный доступ");
    });
  };

  const addTaskHandler = (task) => setTasks([...tasks, { ...task }]);

  const search = (searchTerm) => {
    const assignee = searchTerm.assignee.value
      ? `assignee=${searchTerm.assignee.value}`
      : null;
    const status = searchTerm.status.value
      ? `status=${searchTerm.status.value}`
      : null;
    const labels = searchTerm.label.value
      ? `labels=${searchTerm.label.value}`
      : null;
    const author = searchTerm.author ? `selfAuthored=true` : null;
    const queryParams = [assignee, status, labels, author]
      .filter((element) => element)
      .join("&");
    fetch(`http://localhost:8080/tasks?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) toast.error("Ничего не найдено");
        return setSearchResult(data);
      });
  };

  return (
    <Router>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#fff",
            },
          },
        }}
      />
      <Header logined={logined} exit={exit} />
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/session/new" element={<Login login={login} />} />

        {/* Users route*/}

        <Route
          path="/users"
          element={
            <Users
              users={users}
              getUserId={removeUserHandler}
              currentUser={userData.id}
            />
          }
        />
        <Route
          path="/users/new"
          element={<Signup register={addUserHandler} />}
        />
        <Route
          path="/users/:id/edit"
          element={
            <ProtectedRoute logined={logined}>
              <EditUser
                clickHandler={updateUserHandler}
                token={userData.accessToken}
              />
            </ProtectedRoute>
          }
        />

        {/* Labels route */}

        <Route
          path="/labels"
          element={
            <ProtectedRoute logined={logined}>
              <LabelsPage labels={labels} getLabelId={removeLabelHandler} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labels/new"
          element={
            <ProtectedRoute logined={logined}>
              <NewLabel
                addLabelHandler={addLabelHandler}
                token={userData.accessToken}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labels/:id/edit"
          element={
            <ProtectedRoute logined={logined}>
              <EditLabels
                clickHandler={updateLabelsHandler}
                token={userData.accessToken}
              />
            </ProtectedRoute>
          }
        />

        {/* Statuses route */}

        <Route
          path="/statuses"
          element={
            <ProtectedRoute logined={logined}>
              <StatusesPage
                statuses={statuses}
                getStatusId={removeStatusHandler}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statuses/new"
          element={
            <ProtectedRoute logined={logined}>
              <NewStatus
                addStatusHandler={addStatusHandler}
                token={userData.accessToken}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statuses/:id/edit"
          element={
            <ProtectedRoute logined={logined}>
              <EditStatus
                clickHandler={updateStatusHandler}
                token={userData.accessToken}
              />
            </ProtectedRoute>
          }
        />

        {/* Tasks route */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute logined={logined}>
              <Tasks
                labels={labels}
                statuses={statuses}
                users={users}
                tasks={searchResult.length !== 0 ? searchResult : tasks}
                getTaskId={removeTaskHandler}
                token={userData.accessToken}
                search={search}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <ProtectedRoute logined={logined}>
              <NewTask
                labels={labels}
                statuses={statuses}
                users={users}
                token={userData.accessToken}
                addTaskHandler={addTaskHandler}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            <ProtectedRoute logined={logined}>
              <EditTasks
                labels={labels}
                statuses={statuses}
                users={users}
                clickHandler={updateTasksHandler}
                token={userData.accessToken}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute logined={userData.accessToken}>
              <TaskPage
                clickHandler={removeTaskHandler}
                token={userData.accessToken}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
