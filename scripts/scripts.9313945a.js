"use strict";angular.module("webReversiApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("webReversiApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("webReversiApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("webReversiApp").directive("ngReversi",function(){return{templateUrl:"views/ng-reversi.html",restrict:"A"}}),angular.module("webReversiApp").controller("NgReversiCtrl",["$scope","$timeout",function(a,b){a.hintsEnabled=!0,a.showOptions=!1,a.ai1Enabled=!1,a.ai2Enabled=!0,a.minDelay=1e3,a.player=1,a.hasHint=function(b,c){return a.hintsEnabled&&a.state.isMoveValid(b,c,a.player)?"hint"+a.player:""},a.$on("reversiClickField",function(c,d,e){a.isGameOver||(a.player=ReversiLogicHelper.move(a.state,d,e,a.player),a.isGameOver=a.state.isGameOver(),a.score1=ReversiLogicHelper.countPieces(a.state,1),a.score2=ReversiLogicHelper.countPieces(a.state,2),a.ai1Enabled&&1==a.player?b(function(){var b=new ABPrune.AlphaBeta(4,a.state).search().move;a.$emit("reversiClickField",b.row,b.col)},a.minDelay):a.ai2Enabled&&2==a.player&&b(function(){var b={data:ReversiLogicHelper.invert(a.state.data)};a.state._copyFunctions(b);var c=new ABPrune.AlphaBeta(4,b).search();a.$emit("reversiClickField",c.move.row,c.move.col)},a.minDelay))}),a.newGame=function(){a.game=new ABPrune.Game(ReversiLogic),a.state=a.game.initialize(),a.isGameOver=!1,a.score1=2,a.score2=2},a.newGame()}]);var ReversiLogicHelper={_vs:function(){for(var a=[-1,0,1],b=[],c=0;c<a.length;c++)for(var d=0;d<a.length;d++)(1!=d||1!=c)&&b.push({row:a[c],col:a[d]});return b}(),invert:function(a){var b=[];return a.forEach(function(a){b.push(a.slice().map(function(a){return 0==a?0:1==a?2:1}))}),b},_moveNext:function(a,b){var c={col:a.col+b.col,row:a.row+b.row};return c.col>=8||c.row>=8||c.col<0||c.row<0?null:c},move:function(a,b,c,d){return a.isMoveValid(b,c,d)?this._doValidMove(a,b,c,d):-1},_doValidMove:function(a,b,c,d){var e={row:b,col:c},f=[];f.push(e);for(var g=0;g<ReversiLogicHelper._vs.length;g++){var h=ReversiLogicHelper._vs[g];if(ReversiLogicHelper._isValidVector(a,e,h,d))for(var i=this._moveNext(e,h);null!=i&&a.data[i.row][i.col]!=d;)f.push(i),i=this._moveNext(i,h)}for(var g in f){var j=f[g];a.data[j.row][j.col]=d}return d=1==d?2:1,a.isGameOver()||a.hasMoves(d)||(d=1==d?2:1),d},_isValidVector:function(a,b,c,d){for(var e=this._moveNext(b,c),f=!1;null!=e;){var g=a.data[e.row][e.col];if(0==g){f=!1;break}if(g==d){if(f)return!0;break}f=!0,e=this._moveNext(e,c)}return!1},countPieces:function(a,b){var c=0;return a.data.forEach(function(a,d,e){a.forEach(function(a,d,e){a==b&&(c+=1)})}),c},getSafeCount:function(a,b){var c=0,d=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],e=[],f=[{row:0,col:0},{row:0,col:7},{row:7,col:0},{row:7,col:7}];for(f.filter(function(c,d,e){return a[c.row][c.col]==b}).forEach(function(a,b,f){e.push(a),d[a.row][a.col]=1,c++});e.length>0;){var g=e.pop(),h=[];ReversiLogicHelper._vs.filter(function(a,b,c){return!(0==a.row&&0==a.col)}).filter(function(b,c,d){return void 0!=a[g.row+b.row]&&void 0!=a[g.row+b.row][g.col+b.col]}).filter(function(c,d,e){return a[g.row+c.row][g.col+c.col]==b}).forEach(function(a,b,c){h.push({row:g.row+a.row,col:g.col+a.col})}),h.filter(function(a,b,c){return!(1==d[a.row][a.col])}).filter(function(a,b,f){var g=[{col:1,row:0},{col:0,row:1},{col:1,row:1},{col:-1,row:1}],h=g.filter(function(b,c,e){return void 0==d[a.row+b.row]||void 0==d[a.row+b.row][a.col+b.col]||1==d[a.row+b.row][a.col+b.col]||void 0==d[a.row-b.row]||void 0==d[a.row-b.row][a.col-b.col]||1==d[a.row-b.row][a.col-b.col]}).length;4==h&&(d[a.row][a.col]=1,e.push(a),c++)})}return c}},ReversiLogic={hasMoves:function(a){for(var b=0;8>b;b++)for(var c=0;8>c;c++)if(this.isMoveValid(b,c,a))return!0;return!1},getSuccessors:function(a){for(var b=[],c=0;8>c;c++)for(var d=0;8>d;d++)if(this.isMoveValid(c,d,a)){var e={data:[]};this.data.forEach(function(a){e.data.push(a.slice())}),this._copyFunctions(e),e.move={row:c,col:d},ReversiLogicHelper._doValidMove(e,c,d,a),b.push(e)}return b},isMoveValid:function(a,b,c){if(0==this.data[a][b])for(var d=0;d<ReversiLogicHelper._vs.length;d++)if(ReversiLogicHelper._isValidVector(this,{row:a,col:b},ReversiLogicHelper._vs[d],c))return!0;return!1},isGameOver:function(){for(var a=0;a<this.data.length;a++)for(var b=0;b<this.data[a].length;b++)for(var c=1;3>c;c++)if(this.isMoveValid(a,b,c))return!1;return!0},getScore:function(a){var b=1==a?2:1;return this.isGameOver()&&ReversiLogicHelper.countPieces(this,a)>ReversiLogicHelper.countPieces(this,b)?this.score=Number.MAX_VALUE:this.score=ReversiLogicHelper.getSafeCount(this.data,a)-ReversiLogicHelper.getSafeCount(this.data,b),this.score},initialize:function(){var a={};return this._copyFunctions(a),a.data=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],a}};angular.module("webReversiApp").run(["$templateCache",function(a){a.put("views/about.html","<p> This is a hobby project to write a reversi game using Bootstrap and AngularJS. </p> <p>ToDo:</p> <ul> <li>Integrage abprune</li> <li>More usability</li> <li>Tests</li> </ul> <p>Done:</p> <ul> <li>A function to calculate a move</li> <li>Library to provide alpha beta pruning (bower install abprune)</li> <li>Some usability</li> <li>Some tests</li> </ul>"),a.put("views/main.html",'<div ng-controller="NgReversiCtrl"> <div ng-reversi></div> </div> <div class="row marketing"> <h4>How to Play</h4> <p> Click on an empty field that enclosed the opponent\'s pieces. More <a target="_blank" href="https://en.wikipedia.org/wiki/Reversi#Rules">Rules</a>. </p> </div>'),a.put("views/ng-reversi.html",'<div class="panel panel-default"> <div class="panel-body"> <div class="ng-reversi-game-panel"> <div ng-repeat="row in state.data track by $index" ng-init="rowidx = $index"> <div class="ng-reversi-board-square" ng-repeat="col in row track by $index" ng-init="colidx = $index" ng-click="$emit(\'reversiClickField\', rowidx, colidx)"> <div class="ng-reversi-board-piece{{col}} ng-reversi-board-piece-{{hasHint(rowidx, colidx)}}"></div> </div> </div> </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <button type="button" class="btn btn-default btn-xs" ng-click="newGame()">New Game</button> <span class="title" ng-show="isGameOver">Game Over!</span> <div class="checkbox pull-right" style="margin-top: 0"> <label> <input type="checkbox" value="" ng-model="hintsEnabled"> Hints </label> </div> <div class="checkbox pull-right" style="margin-top: 0; margin-right:1em"> <label> <input type="checkbox" value="" ng-model="showOptions"> Options </label> </div> </div> <div class="panel-body"> <div class="ng-reversi-status-panel"> <div class="pull-left ng-reversi-status-box"> <div class="ng-reversi-status-active-indicator-1" ng-show="player == 1"></div> </div> <div class="pull-left ng-reversi-status-box ng-reversi-board-piece1 well"></div> <div class="pull-left ng-reversi-status-label"><span class="badge">{{score1}} : {{score2}}</span></div> <div class="pull-left ng-reversi-status-box ng-reversi-board-piece2 well"></div> <div class="pull-left ng-reversi-status-box"> <div class="ng-reversi-status-active-indicator-2" ng-show="player == 2"></div> </div> </div> </div> </div> <div class="panel panel-default" ng-show="showOptions"> <div class="panel-heading"> <h3 class="panel-title">Options</h3> </div> <div class="panel-body"> <div class="checkbox"> <label> <input type="checkbox" value="" ng-model="ai1Enabled"> Let computer play <div class="pull-right ng-reversi-settings-tiny-piece ng-reversi-board-piece1"></div> </label> </div> <div class="checkbox"> <label> <input type="checkbox" value="" ng-model="ai2Enabled"> Let computer play <div class="pull-right ng-reversi-settings-tiny-piece ng-reversi-board-piece2"></div> </label> </div> </div> </div>')}]);