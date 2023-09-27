// import React, { useState, useEffect } from 'react';
// import StatusesPage from '../../pages/statuses/index';
// import NewStatus from '../../pages/statuses/newStatus';
// import { uniqueId } from 'lodash';
// import { Routes, Route } from 'react-router';

// const Statuses = () => {
//   const LOCAL_STORAGE_KEY_STATUSES = 'statuses';
//   const [statuses, setStatus] = useState([]);
//   const removeStatusHandler = (id) => {
//     const newStatus = statuses.filter((status) => {
//       return status.id !== id;
//     });
//     setStatus(newStatus);
//   };
//   const addStatusHandler = (status) => {
//     setStatus([...statuses, { id: uniqueId() , ...status }]);
//   };
//   useEffect(() => {
//     const retriveStatus = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_STATUSES));
//     if (retriveStatus) setStatus(retriveStatus);
//   }, []);
//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY_STATUSES, JSON.stringify(statuses));
//   }, [statuses]);

//   return (
//     <Routes>
//       <Route
//         path="/statuses"
//         element={<StatusesPage statuses={statuses} getStatusId={removeStatusHandler} />}
//       />
//       <Route path="/statuses/new" element={<NewStatus addStatusHandler={addStatusHandler} />} />
//     </Routes>
//   );
// };

// export default Statuses;
