$(function() {
  function Game() {
    this.board = $('.grid-container');
    this.tiles = [];
    this.tilesView = $('.tile-container');
    this.init();
  } 

  Game.prototype.init = function() {
    this.createBoard();
  }

  Game.prototype.createBoard = function () {
    this.addStarterTile();
    this.addStarterTile();
  }

  Game.prototype.addStarterTile = function () {
  }

  Game.prototype.addNewTile = function() {
  }

  Game.prototype.resetBoard = function () {
    this.tiles = [];
    this.tilesView.html('');
  }

  Game.prototype.updateView = function() {
    kkk
  }

  function Tile() {
  }

  game = new Game();
});