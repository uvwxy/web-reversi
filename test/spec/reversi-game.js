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

    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        expect(state.isMoveValid(row, col, 1)).toEqual(moves[row][col] == 'x');
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

    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        expect(result[row][col]).toEqual(state.data[row][col]);
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

    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        expect(result[row][col]).toEqual(state.data[row][col]);
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

    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        expect(result[row][col]).toEqual(state.data[row][col]);
      }
    }
  });

  it('should count pieces correctly', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    expect(ReversiLogicHelper.countPieces(state, 1)).toBe(2);
    expect(ReversiLogicHelper.countPieces(state, 2)).toBe(2);
  });

  it('should detect whether players have moves', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    expect(state.hasMoves(1)).toBe(true);
    expect(state.hasMoves(2)).toBe(true);
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
    expect(state.hasMoves(1)).toBe(false);
    expect(state.hasMoves(2)).toBe(true);
  });

  it('should select the next player after each move', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    state.data = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    ReversiLogicHelper.move(state, 2, 4);
    expect(state.player).toBe(2);
    ReversiLogicHelper.move(state, 4, 5);
    expect(state.player).toBe(1);

    // data from issue #1
    state.data = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 2, 0],
      [0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 2, 2, 2, 2],
      [0, 0, 1, 2, 2, 2, 2, 2],
      [0, 0, 0, 2, 2, 2, 2, 2]
    ];
    state.player = 1;
    ReversiLogicHelper.move(state, 3, 7); // move 1 bad position ;)
    expect(state.player).toBe(2);
    ReversiLogicHelper.move(state, 2, 7); // move 2 into good position
    expect(state.player).toBe(2); // so we can move again
    ReversiLogicHelper.move(state, 2, 6);
    expect(state.player).toBe(2); // and again
    ReversiLogicHelper.move(state, 2, 5);
    expect(state.player).toBe(1); // and now its 1's turn again

  });

  it('should return the successors', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    var succs = state.getSuccessors(state);
    expect(succs.length).toBe(4);
  });

  it('should invert the game', function () {
    var data = [
      [0, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var invert = [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    expect(ReversiLogicHelper.invert(data)).toEqual(invert);
  });

  it('should move for player two', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    state.data = [
      [2, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var copiedState = {data: ReversiLogicHelper.invert(state.data)};
    state._copyFunctions(copiedState);
    var result = new ABPrune.AlphaBeta(4, copiedState).search();
    expect(result.move).toEqual({row: 0, col: 2});
  });

  it('should work with the second move', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    ReversiLogicHelper.move(state, 3, 5);

    var copiedState = {data: ReversiLogicHelper.invert(state.data)};
    state._copyFunctions(copiedState);
    var result = new ABPrune.AlphaBeta(4, copiedState).search();
    expect(result.move).not.toBe(undefined);
  });


  it('should search for the first move', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    var resultAlphaBeta = new ABPrune.AlphaBeta(4, state).search();
    var resultMinMax = new ABPrune.MinMax(4, state).search();

    expect(resultMinMax.move).not.toBe(null);
    expect(resultMinMax.move).not.toBe(undefined);
    expect(resultAlphaBeta.move).not.toBe(null);
    expect(resultAlphaBeta.move).not.toBe(undefined);

    expect(resultAlphaBeta.score).toBe(resultMinMax.score);

  });

  it('should calculate how many pieces can not be taken away', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    state.data = [
      [1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    expect(ReversiLogicHelper.getSafeCount(1, state.data)).toBe(5);
  });


});
