describe("The Reversi Game", function () {
  it('should provide a game logic', function () {
    var game = new ABPrune.Game(ReversiLogic);
    expect(game).not.toBe(null);
    expect(game).not.toBe(undefined);
  });

  it('should initialize the board', function () {
    var game = new ABPrune.Game(ReversiLogic);
    var state = game.initialize();
    expect(state.data[0][0]).toBe(0);
  });

});
