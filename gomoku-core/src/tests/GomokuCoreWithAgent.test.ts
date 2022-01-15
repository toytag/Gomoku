import GomokuCoreWithAgent from "../index";

it("test", async () => {
  const gomoku = new GomokuCoreWithAgent;
  gomoku.move(7, 7);
  for (let i = 0; i < 3; i += 1) {
    const [row, col] = gomoku.search()!;
    console.log(row, col);
    console.log(gomoku.move(row, col));
  }
  // console.log(gomoku.getBoard());
})