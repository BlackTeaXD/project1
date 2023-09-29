export function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
export function renderList(list) {
  return list.map((item) => {
    return <option key={item.id}>{item.name}</option>;
  });
}
