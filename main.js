$(function() {
  function Game() {
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
    console.log('started')
  }

  Game.prototype.addNewTile = function() {
  }

  function Tile() {
  }

  game = new Game();
});