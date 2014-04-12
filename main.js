// Currently Working On:
//    make the tiles appear on the view

$(function() {
  var possibleTileValues          = ['2','4'],
      possibleTileLocationIndices = ['0', '1', '2', '3'],
      allPossibleTileLocations    = {};

// ***** Game Section *****
  function Game () {
    this.boardView = $('.grid-container');
    this.tilesView = $('.tile-container');
    this.tiles = [];

    this.fillAllPossibleTileLocations();
    this.init();
  }

  Game.prototype.fillAllPossibleTileLocations = function () {
    var row, column;
    for (row in possibleTileLocationIndices) {
      for (column in possibleTileLocationIndices) {
        allPossibleTileLocations[row + column] = row + column;
      }
    }
  }

  Game.prototype.init = function () {
    this.victory = false;
    this.createBoard();
    // this.updateView();
    // this.enablePlayerControls();
  }

  Game.prototype.createBoard = function () {
    this.addNewTile();
    this.addNewTile();
  }

  Game.prototype.addNewTile = function () {
    var value    = this.setTileValue(),
        location = this.setTileLocation();

    this.tiles.push(new Tile(value, location));
    // this.updateView();
  }

  Game.prototype.setTileValue = function () {
    return possibleTileValues[Math.floor(Math.random() * 2)];
  }

  Game.prototype.setTileLocation = function () {
    var keys,
      availableLocations = allPossibleTileLocations;

    // Deletes each 'occupied' tile location of the board from possible options
    this.tiles.forEach(function (tile) {
      delete availableLocations[tile.location]
    })
    
    // Select a value from a random key in availableLocations array
    var keys = Object.keys(availableLocations);
    return keys[ keys.length * Math.random() << 0];
  }

/*
  Game.prototype.enablePlayerControls = function () { // Make it something to easily reset -- don't get attached to the name
    // Set up some bindings for player interaction
    // Functionality:
    //    arrow keys to edit each tile in game.tiles

    // this.checkGameEndingConditions();
    // this.updateView();
  }

  Game.prototype.disablePlayerControls = function () {
  }

  Game.prototype.updateView = function () {
    // Read through game.tiles and populate screen (maybe?)
    // There may be a better way -- don't invest too much time into this right now
  }

  Game.prototype.anyMovesLeft = function () {
    // return boolean value
  }

  Game.prototype.checkForPossibleMoves = function () {
    // more core game logicsss
  }

  Game.prototype.checkGameEndingConditions = function () {
    if (this.tiles.length == 16 && !this.anyMovesLeft()) {
      this.gameOver();
    }
    for (tile in this.tiles) {
      if (tile.value === 2048 && !this.victory) {
        this.playerWins();
      }
    }
  }

  Game.prototype.gameOver = function () {
     // display lose view
  }

  Game.prototype.playerWins = function () {
    this.victory = true;
    // display win view
  }

  Game.prototype.resetBoard = function () {
    this.tiles = [];
    this.tilesView.html('');
    this.init();
  }
*/

// ***** Tiles Section *****
  function Tile (value, location) {
    this.value    = value;
    this.location = location;
    console.log(location);
  }


// ***** Driver Code *****
  game = new Game();
});
