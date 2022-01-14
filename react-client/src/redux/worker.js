onmessage = function search(e) {
  const { gomoku } = e.data;
  const move = gomoku.search();
  postMessage(move);
};
