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

    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        expect(state.isMoveValid(y, x, 1)).toEqual(moves[y][x] == 'x');
      }
    }
  });

  it('should detect if game is over', function () {
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

  it('should move correctly', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    var result = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    ReversiLogicHelper.move(state, 3, 5);

    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        expect(result[y][x]).toEqual(state.data[y][x]);
      }
    }

    result = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 1, 2, 1, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    ReversiLogicHelper.move(state, 2, 5);

    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        expect(result[y][x]).toEqual(state.data[y][x]);
      }
    }

    result = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    ReversiLogicHelper.move(state, 2, 4);

    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        expect(result[y][x]).toEqual(state.data[y][x]);
      }
    }
  });

  it('should count pieces correctly', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    expect(ReversiLogicHelper.countPieces(state, 1)).toBe(2);
    expect(ReversiLogicHelper.countPieces(state, 2)).toBe(2);
  });

  it ('should detect whether players have moves', function(){
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    expect(ReversiLogicHelper.playerHasMoves(state)).toBe(true);
    state.player = 2;
    expect(ReversiLogicHelper.playerHasMoves(state)).toBe(true);
    state.data = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 2, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    state.player = 1;
    expect(ReversiLogicHelper.playerHasMoves(state)).toBe(false);
    state.player = 2;
    expect(ReversiLogicHelper.playerHasMoves(state)).toBe(true);

  })


});
