describe("The Reversi Game", function () {
  it('should provide a game logic', function () {
    var game = new ABPrune.Game(ReversiLogic);
    expect(game).not.toBe(null);
    expect(game).not.toBe(undefined);
  });

  it('should initialize the board', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    expect(state.data).not.toBe(null)
    expect(state.data).not.toBe(undefined);
  });

  it('should detect possible start moves', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();

    var moves = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', 'x', ' ', ' ', ' '],
      [' ', ' ', ' ', '1', '2', 'x', ' ', ' '],
      [' ', ' ', 'x', '2', '1', ' ', ' ', ' '],
      [' ', ' ', ' ', 'x', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ];

    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        expect(state.isMoveValid(y, x, 1)).toEqual(moves[y][x] == 'x');
      }
    }
  });

  it('should detect if game is over', function(){
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    state.data = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    expect(state.isGameOver()).toBe(true);
  });

});
