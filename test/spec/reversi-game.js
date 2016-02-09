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
  });

  it ('should select the next player after each move', function(){
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
    ReversiLogicHelper.move(state,2, 4);
    expect(state.player).toBe(2);
    ReversiLogicHelper.move(state,4, 5);
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


});
