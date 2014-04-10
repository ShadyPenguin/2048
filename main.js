// Currently Working On:
//    Game.getTileLocation


$(function() {
  var possibleTileValues = ['2','4'],
    possibleTileLocations = ['0', '1', '2', '3'];

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
    var value = this.setTileValue(),
      location = this.setTileLocation();

    this.tiles.push(new Tile(value, location));
    this.updateView();
  }

  Game.prototype.setTileValue = function () {
    return possibleTileValues[this.getPossibleTileIndex('value')]
  }

  Game.prototype.setTileLocation = function () {
    var row,
      column;

    // First tile of game
    if (this.tiles.length === 0) {
      row = possibleTileLocations[this.getPossibleTileIndex('location')];
      column = possibleTileLocations[this.getPossibleTileIndex('location')];
      return [row, column]
    }

    // All other tiles
    
    return ['1', '2']; // just tester code
  }

  Game.prototype.getPossibleTileIndex = function (type) {
    var value;
    if (type === 'location') {
      value = 4;
    } else if (type === 'value') {
      value = 2;
    }
    return Math.floor(Math.random() * value);
  }

  Game.prototype.enablePlayerControls = function () { // Make it something to easily reset -- don't get attached to the name
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
    this.location = location; // Will be an array [row, column] -- ex: class will be tile-position-0-0 (-row-column)
    console.log(this.location);
  }

// ***** Driver Code *****
  game = new Game();
});