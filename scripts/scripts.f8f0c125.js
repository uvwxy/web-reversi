"use strict";angular.module("webReversiApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("webReversiApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("webReversiApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("webReversiApp").directive("ngReversi",function(){return{templateUrl:"views/ng-reversi.html",restrict:"A"}}),angular.module("webReversiApp").controller("NgReversiCtrl",["$scope",function(a){a.game=new ABPrune.Game(ReversiLogic),a.state=a.game.initialize(),a.score1=2,a.score2=2,a.game.initialize(),a.$on("reversiClickField",function(b,c,d){ReversiLogicHelper.move(a.state,c,d),a.isGameOver=a.state.isGameOver(),a.score1=ReversiLogicHelper.countPieces(a.state,1),a.score2=ReversiLogicHelper.countPieces(a.state,2)})}]);var ReversiLogicHelper={_vs:function(){for(var a=[-1,0,1],b=[],c=0;c<a.length;c++)for(var d=0;d<a.length;d++)b.push({row:a[c],col:a[d]});return b}(),playerHasMoves:function(a){for(var b=0;8>b;b++)for(var c=0;8>c;c++)if(a.isMoveValid(b,c,a.player))return!0;return!1},_moveNext:function(a,b){var c={col:a.col+b.col,row:a.row+b.row};return c.col>=8||c.row>=8||c.col<0||c.row<0?null:c},move:function(a,b,c){a.isMoveValid(b,c,a.player)&&this._doValidMove(a,b,c,a.player)},_doValidMove:function(a,b,c,d){var e={row:b,col:c},f=[];f.push(e);for(var g=0;g<ReversiLogicHelper._vs.length;g++){var h=ReversiLogicHelper._vs[g];if(ReversiLogicHelper._isValidVector(a,e,h,d))for(var i=this._moveNext(e,h);null!=i&&a.data[i.row][i.col]!=d;)f.push(i),i=this._moveNext(i,h)}for(var g in f){var j=f[g];a.data[j.row][j.col]=a.player}!a.isGameOver()&&this.playerHasMoves(a)&&(a.player=1==a.player?2:1)},_isValidVector:function(a,b,c,d){for(var e=this._moveNext(b,c),f=!1;null!=e;){var g=a.data[e.row][e.col];if(0==g){f=!1;break}if(g==d){if(f)return!0;break}f=!0,e=this._moveNext(e,c)}return!1},countPieces:function(a,b){var c=0;return a.data.forEach(function(a,d,e){a.forEach(function(a,d,e){a==b&&(c+=1)})}),c}},ReversiLogic={getSuccessors:function(a){for(var b=[],c=0;8>c;c++)for(var d=0;8>d;d++)if(this.isMoveValid(c,d,a?1:2)){for(var e={data:[]},f=0;f<this.data.length;f++)e.data[f]=this.data[f].slice();this._copyFunctions(e),e.move={row:c,col:d},ReversiLogicHelper._doValidMove(e,c,d,a?1:2)}return b},isMoveValid:function(a,b,c){if(0==this.data[a][b])for(var d=0;d<ReversiLogicHelper._vs.length;d++)if(ReversiLogicHelper._isValidVector(this,{row:a,col:b},ReversiLogicHelper._vs[d],c))return!0;return!1},isGameOver:function(){for(var a=0;a<this.data.length;a++)for(var b=0;b<this.data[a].length;b++)for(var c=1;3>c;c++)if(this.isMoveValid(a,b,c))return!1;return!0},getScore:function(a){this.score=0;for(var b=[[100,0,50,2,2,50,0,100],[0,0,1,1,1,1,0,0],[50,1,2,2,2,2,1,50],[2,1,2,2,2,2,1,2],[2,1,2,2,2,2,1,2],[50,1,2,2,2,2,1,50],[0,0,2,2,2,2,0,0],[100,0,50,2,2,50,0,100]],c=0;c<this.data.length;c++)for(var d=0;d<this.data.length;d++)this.score+=this.data[c][d]==a?b[c][d]:0;return this.score},initialize:function(){var a={};return this._copyFunctions(a),a.data=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],a.player=1,a}};angular.module("webReversiApp").run(["$templateCache",function(a){a.put("views/about.html",'<p> This is a hobby project to write a reversi game using Bootstrap and AngularJS. </p> <p> ToDo: <ul> <li>A function to calculate a move</li> <li>Game Logic based on MiniMax and apha-beta pruning see <a href="https://github.com/uvwxy/2048/blob/ai2k/js/ai2k.js" target="_blank">here</a> for an example</li> <li>More usability</li> <li>Tests</li> </ul> </p>'),a.put("views/main.html",'<div class="jumbotron"> <div ng-controller="NgReversiCtrl"> <div ng-reversi></div> </div> </div> <div class="row marketing"> <h4>How to Play</h4> <p> Click on an empty field that enclosed the opponent\'s pieces. More <a target="_blank" href="https://en.wikipedia.org/wiki/Reversi#Rules">Rules</a>. </p> </div>'),a.put("views/ng-reversi.html",'<div class="ng-reversi-game-panel"> <div ng-repeat="row in state.data track by $index" ng-init="rowidx = $index"> <div class="ng-reversi-board-square" ng-repeat="col in row track by $index" ng-init="colidx = $index" ng-click="$emit(\'reversiClickField\', rowidx, colidx)"> <div class="ng-reversi-board-piece{{col}}"></div> </div> </div> </div> <!-- Status/Score Panel --> <div class="ng-reversi-status-panel"> <div class="ng-reversi-status-box"> <div class="ng-reversi-status-active-indicator-1" ng-show="state.player == 1"></div> </div> <div class="ng-reversi-status-box ng-reversi-board-piece1"></div> <div class="ng-reversi-status-label"> {{score1}} : {{score2}}</div> <div class="ng-reversi-status-box ng-reversi-board-piece2"></div> <div class="ng-reversi-status-box"> <div class="ng-reversi-status-active-indicator-2" ng-show="state.player == 2"></div> </div> </div>')}]);