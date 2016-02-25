var ReversiLogicHelper = {
  _vs: (function () {
    var v = [-1, 0, 1];
    var ret = [];
    for (var row = 0; row < v.length; row++) {
      for (var col = 0; col < v.length; col++) {
        if (!(col == 1 && row == 1)) {
          ret.push({row: v[row], col: v[col]});
        }
      }
    }
    return ret;
  })(),
  invert: function (data) {
    var inverted = [];
    data.forEach(function (row) {
      inverted.push(row.slice().map(function (col) {
        return col == 0 ? 0 : col == 1 ? 2 : 1;
      }));
    });
    return inverted;
  },
  _moveNext: function (curPos, vector) {
    var nPos = {col: curPos.col + vector.col, row: curPos.row + vector.row};
    return (nPos.col >= 8 || nPos.row >= 8 || nPos.col < 0 || nPos.row < 0) ? null : nPos;
  },
  move: function (state, row, col, playerId) {
    if (state.isMoveValid(row, col, playerId)) {
      return this._doValidMove(state, row, col, playerId);
    }
    else {
      return -1;
    }
  },
  _doValidMove: function (state, row, col, playerId) {
    var start = {row: row, col: col};

    var collected = [];
    collected.push(start);

    for (var i = 0; i < ReversiLogicHelper._vs.length; i++) {
      var v = ReversiLogicHelper._vs[i];

      // walk into every direction
      if (ReversiLogicHelper._isValidVector(state, start, v, playerId)) {
        var next = this._moveNext(start, v);
        while (next != null && state.data[next.row][next.col] != playerId) {
          collected.push(next);
          next = this._moveNext(next, v);
        }
      }
    }

    for (var i in collected) {
      var pos = collected[i];
      state.data[pos.row][pos.col] = playerId;
    }

    // change player
    playerId = playerId == 1 ? 2 : 1;


    // change player back if new player had no new moves
    if (!state.isGameOver() && !state.hasMoves(playerId)) {
      playerId = playerId == 1 ? 2 : 1;
    }

    return playerId;
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
  },
  getSafeCount: function (data, playerId) {
    var score = 0;

    // safe map required to track detected safe stones
    var safeMap = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // a list of safe stones who's neighbors have not been checked
    var tempStack = [];

    var corners = [{row: 0, col: 0}, {row: 0, col: 7}, {row: 7, col: 0}, {row: 7, col: 7}];
    corners.filter(function (c, i, a) {
      return data[c.row][c.col] == playerId;
    }).forEach(function (c, i, a) {
      tempStack.push(c);
      safeMap[c.row][c.col] = 1;
      score++;
    });

    // check each element in stack if it produces more safe stones
    while (tempStack.length > 0) {
      var current = tempStack.pop();

      // get valid neighbors that are on the map and belong to playerId
      var neighbors = [];
      ReversiLogicHelper._vs.filter(function (c, i, a) {
        return !(c.row == 0 && c.col == 0);
      }).filter(function (c, i, a) {
        return data[current.row + c.row] != undefined && data[current.row + c.row][current.col + c.col] != undefined;
      }).filter(function (c, i, a) {
        return data[current.row + c.row][current.col + c.col] == playerId;
      }).forEach(function (c, i, a) {
        neighbors.push({row: current.row + c.row, col: current.col + c.col});
      });

      // check neighbors that are not safe yet
      neighbors.filter(function (c, i, a) {
        return !(safeMap[c.row][c.col] == 1);
      }).filter(function (c, i, a) {
        // a stone is safe if it can not be taken via each line
        // -c -a -d
        // -b  m +b
        // +d +a +c

        // a, b, c, d
        var lines = [{col: 1, row: 0}, {col: 0, row: 1}, {col: 1, row: 1}, {col: -1, row: 1}];

        var safeLineCount = lines.filter(function (line, i, a) {
          return safeMap[c.row + line.row] == undefined //
            || safeMap[c.row + line.row][c.col + line.col] == undefined //
            || safeMap[c.row + line.row][c.col + line.col] == 1 //
            || safeMap[c.row - line.row] == undefined //
            || safeMap[c.row - line.row][c.col - line.col] == undefined //
            || safeMap[c.row - line.row][c.col - line.col] == 1;
        }).length;

        if (safeLineCount == 4) {
          safeMap[c.row][c.col] = 1;
          tempStack.push(c);
          score++;
        }
      });
    }
    return score;
  }
};

var ReversiLogic = {
  hasMoves: function (playerId) {
    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        if (this.isMoveValid(row, col, playerId)) {
          return true;
        }
      }
    }
    return false;
  },
  getSuccessors: function (playerId) {
    var succs = [];
    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {

        if (this.isMoveValid(row, col, playerId)) {

          var copiedState = {data: []};
          this.data.forEach(function (row) {
            copiedState.data.push(row.slice())
          });
          this._copyFunctions(copiedState);
          copiedState.move = {row: row, col: col};
          ReversiLogicHelper._doValidMove(copiedState, row, col, playerId);
          succs.push(copiedState);
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
    this.score = ReversiLogicHelper.getSafeCount(this.data,playerId)
      - ReversiLogicHelper.getSafeCount(this.data, playerId == 1 ? 2 : 1);
    //this.data.forEach(function(c,i,a){console.log(c)});
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

    return state;
  }
};
