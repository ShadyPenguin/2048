$(function() {
// ***** Game Section *****
  function Game() {
    this.boardView = $('.grid-container');
    this.tiles = [];
    this.tilesView = $('.tile-container');

    this.init();
  } 

  Game.prototype.init = function() {
    this.createBoard();
  }

  Game.prototype.createBoard = function () {
    // Add 2 starter tiles
  }

  Game.prototype.addStarterTile = function () {
    // Create a Tile object and throw it into the game.tiles array
    // update view
  }

  Game.prototype.updateView = function() {
    // Read through game.tiles and populate screen
  }

  Game.prototype.addNewTile = function() {
    // Add tile to game.tiles
    // update view
  }

  Game.prototype.resetBoard = function () {
    this.tiles = [];
    this.tilesView.html('');
    this.init();
  }

// ***** Tiles Section *****
  function Tile() {
    // value
    // location
  }

// ***** Driver Code *****
  game = new Game();
});