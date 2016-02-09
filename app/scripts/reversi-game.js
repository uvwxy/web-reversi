var ReversiLogicHelper = {
  _vs: (function () {
    var v = [-1, 0, 1];
    var ret = [];
    for (var row = 0; row < v.length; row++) {
      for (var col = 0; col < v.length; col++) {
        ret.push({row: v[row], col: v[col]});
      }
    }
    return ret;
  })(),
  playerHasMoves: function (state) {
    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        if (state.isMoveValid(row, col, state.player)) {
          return true;
        }
      }
    }
    return false;
  },
  _moveNext: function (curPos, vector) {
    var nPos = {col: curPos.col + vector.col, row: curPos.row + vector.row};
    return (nPos.col >= 8 || nPos.row >= 8 || nPos.col < 0 || nPos.row < 0) ? null : nPos;
  },
  move: function (state, row, col) {
    if (state.isMoveValid(row, col, state.player)) {
      this._doValidMove(state, row, col, state.player);
    }
  },
  _doValidMove: function (state, row, col, player) {
    var start = {row: row, col: col};

    var collected = [];
    collected.push(start);

    for (var i = 0; i < ReversiLogicHelper._vs.length; i++) {
      var v = ReversiLogicHelper._vs[i];

      // walk into every direction
      if (ReversiLogicHelper._isValidVector(state, start, v, player)) {
        var next = this._moveNext(start, v);
        while (next != null && state.data[next.row][next.col] != player) {
          collected.push(next);
          next = this._moveNext(next, v);
        }
      }
    }

    for (var i in collected) {
      var pos = collected[i];
      state.data[pos.row][pos.col] = state.player;
    }

    // change player
    state.player = state.player == 1 ? 2 : 1;


    // change player back if new player had no new moves
    if (!state.isGameOver() && !this.playerHasMoves(state)) {
      state.player = state.player == 1 ? 2 : 1;
    }
  }
  ,
  _isValidVector: function (state, start, curV, playerId) {
    var next = this._moveNext(start, curV);
    var foundOpponent = false;
    while (next != null) {
      // walk direction to end

      var value = state.data[next.row][next.col];
      if (value == 0) {
        // nothing will be flipped
        foundOpponent = false;
        break;
      } else if (value != playerId) {
        // -> continue, found opponents stone
        foundOpponent = true;
        next = this._moveNext(next, curV);
      } else {
        if (foundOpponent) {
          return true;
        } else {
          break;
        }
      }
    }

    return false;
  },
  countPieces: function (state, playerId) {
    var sum = 0;
    state.data.forEach(function (c, i, a) {
      c.forEach(function (cc, ii, aa) {
        if (cc == playerId) {
          sum += 1;
        }
      });
    });
    return sum;
  }
};

var ReversiLogic = {
  getSuccessors: function (max) {
    var succs = [];
    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {

        if (this.isMoveValid(row, col, max ? 1 : 2)) {

          var copiedState = {data: []}
          for (var i = 0; i < this.data.length; i++)
            copiedState.data[i] = this.data[i].slice();
          this._copyFunctions(copiedState);
          copiedState.move = {row: row, col: col};
          ReversiLogicHelper._doValidMove(copiedState, row, col, max ? 1 : 2);
        }
      }
    }
    return succs;
  },
  isMoveValid: function (row, col, playerId) {
    if (this.data[row][col] == 0) {
      // spot is free
      for (var i = 0; i < ReversiLogicHelper._vs.length; i++) {
        // walk into every direction
        if (ReversiLogicHelper._isValidVector(this, {row: row, col: col}, ReversiLogicHelper._vs[i], playerId)) {
          return true;
        }
      }
    }
    return false;
  },
  isGameOver: function () {
    // checks whether any party can move
    for (var row = 0; row < this.data.length; row++) {
      for (var col = 0; col < this.data[row].length; col++) {
        for (var player = 1; player < 3; player++) {
          if (this.isMoveValid(row, col, player)) {
            return false;
          }
        }
      }
    }
    return true;
  },
  getScore: function (playerId) {
    this.score = 0;
    var scoreMap = [
      [100, 0, 50, 2, 2, 50, 0, 100],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [50, 1, 2, 2, 2, 2, 1, 50],
      [2, 1, 2, 2, 2, 2, 1, 2],
      [2, 1, 2, 2, 2, 2, 1, 2],
      [50, 1, 2, 2, 2, 2, 1, 50],
      [0, 0, 2, 2, 2, 2, 0, 0],
      [100, 0, 50, 2, 2, 50, 0, 100]
    ];

    // checks whether any party can move
    for (var row = 0; row < this.data.length; row++) {
      for (var col = 0; col < this.data.length; col++) {
        this.score += this.data[row][col] == playerId ? scoreMap[row][col] : 0;
      }
    }
    return this.score;
  },
  initialize: function () {
    var state = {};
    this._copyFunctions(state);

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

    state.player = 1;

    return state;
  }
};
