import React, { useState, useEffect } from 'react';
import LabelsPage from '../../pages/labels/index';
import NewLabel from '../../pages/labels/newLabel';
import { Routes, Route } from 'react-router';
import { uniqueId } from 'lodash';

const Labels = () => {
  const LOCAL_STORAGE_KEY = 'labels';
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
  useEffect(() => {
    const retriveLabels = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveLabels) setLabels(retriveLabels);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(labels));
  }, [labels]);

  return (
    <Routes>
      <Route
        path="/labels"
        element={<LabelsPage labels={labels} getLabelId={removeLabelHandler} />}
      />
      <Route path="/labels/new" element={<NewLabel addLabelHandler={addLabelHandler} />} />
    </Routes>
  );
};

export default Labels;
