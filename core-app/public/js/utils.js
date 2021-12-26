const formatDate = (d) => {
  const date = new Date(d);

  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
};
