var ReversiLogic = {
  getSuccessors: function (max) {
    var succs = [];
    // TODO: calculate successors
    return succs;
  },
  isMoveValid: function (row, col, playerId) {
    var v = [-1, 0, 1];
    var vs = [];
    for (var x = 0; x < v.length; x++) {
      for (var y = 0; y < v.length; y++) {
        vs.push({x: v[x], y: v[y]});
      }
    }

    var moveNext = function (curPos, vector) {
      var nPos = {x: curPos.x + vector.x, y: curPos.y + vector.y};
      return (nPos.x >= 8 || nPos.y >= 8 || nPos.x < 0 || nPos.y < 0) ? null : nPos;
    };

    if (this.data[row][col] == 0) {
      // spot is free
      for (var i = 0; i < vs.length; i++) {
        // walk into every direction
        var curV = vs[i];
        var next = moveNext({x: col, y: row}, curV);
        var foundOpponent = false;
        while (next != null) {
          // walk direction to end

          var value = this.data[next.y][next.x];
          if (value == 0) {
            // nothing will be flipped
            foundOpponent = false;
            break;
          } else if (value != playerId) {
            // -> continue, found opponents stone
            foundOpponent = true;
            next = moveNext(next, curV);
          } else {
            if (foundOpponent) {
              return true;
            } else {
              break;
            }
          }
        }

      }
    }
    return false;
  },
  isGameOver: function () {
    // checks whether any party can move
    for (var r = 0; r < this.data.length; r++) {
      for (var c = 0; c < this.data[r].length; c++) {
        for (var p = 1; p < 3; p++) {
          if (this.isMoveValid(r, c, p)) {
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
    for (var r = 0; r < this.data.length; r++) {
      for (var c = 0; c < this.data.length; c++) {
        this.score += this.data[r][c] == playerId ? scoreMap[r][c] : 0;
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
  },

  move: function (row, col) {
    this.data[row][col] = this.player;

    // TODO: flip opponents pieces

    // TODO: check who is next and set next player
    this.player = this.player == 1 ? 2 : 1;
  }

};
