$(function() {
// ***** Game Section *****
  function Game () {
    this.boardView = $('.grid-container');
    this.tilesView = $('.tile-container');
    this.tiles = [];

    this.init();
  } 

  Game.prototype.init = function () {
    this.createBoard();
    this.updateView();
    this.enablePlayerControls();
  }

  Game.prototype.createBoard = function () {
    this.addNewTile();
    this.addNewTile();
  }

  Game.prototype.addNewTile = function () {
    // Create new Tile object and push into game.tiles
    this.updateView();
  }

  Game.prototype.enablePlayerControls = function () { // this name may change
    // Set up some bindings for player interaction
    // Functionality:
    //    arrow keys to edit each tile in game.tiles
    //      this will be the heart of the game 
    //    update view
  } 

  Game.prototype.disablePlayerControls = function () {

  }

  Game.prototype.updateView = function () {
    // Read through game.tiles and populate screen (maybe?)
    // There may be a better way, don't invest too much time into this
  }

  Game.prototype.playerLose = function () {
    // display lose view
  }

  Game.prototype.playerWin = function () {
    // display win view
  }

  Game.prototype.resetBoard = function () {
    this.tiles = [];
    this.tilesView.html('');
    this.init();
  }

// ***** Tiles Section *****
  function Tile (value, location) {
    this.value = value; 
    this.location = location; // Will be an array [row, column] -- ex: tile-position-0-0 (-row-column)
  }

// ***** Driver Code *****
  game = new Game();
});