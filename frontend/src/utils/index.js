export const options = (array) => {
  return array.reduce((acc, { id, title }) => {
    return [...acc, { value: id, label: title }];
  }, []);
};
