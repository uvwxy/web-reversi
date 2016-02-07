var ReversiLogic = {
  getSuccessors: function (max) {
    var succs = [];
    // TODO: calculate successors
    return succs;
  },
  isMoveValid: function (row, col, playerId) {
    var v = [-1, 0, 1];
    var checkDirections = [];
    for (var x = 0; x < v.length; x++) {
      for (var y = 0; y < v.length; y++) {
        checkDirections.push({x: v[x], y: v[y]});
      }
    }
    var moveNext = function (curPos, vector) {
      var nextPos = {x: curPos.x + vector.x, y: curPos.y + vector.y};
      return (nextPos.x >= 8 || nextPos.y >= 8) ? null : nextPos;
    };

    if (this.data[row][col] == 0) {
      // TODO: check if this flips any other stones
      // TODO: create 8 traversals
      for (var i = 0; i < checkDirections; i++) {
        var nextField = moveNext({x: col, y: row}, checkDirections[i]);
        while (nextField != null) {
          var value = this.data[nextField.y][nextField.x];
          if (value == 0) {
            // nothing will be flipped
          } else if (value != playerId) {
            // -> continue, found opponents stone
            nextField = moveNext(nextField, checkDirections[i]);
          } else {
            return true;
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
            return true;
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

    state.data =[];
    for (var row = 0; row < 8; row++) {
      var newRow = [];
      for (var col = 0; col < 8; col++) {
        newRow[col] = 0;
      }
      state.data[row] = newRow;
    }

    state.data[3][3] = 1;
    state.data[4][4] = 1;
    state.data[3][4] = 2;
    state.data[4][3] = 2;
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
