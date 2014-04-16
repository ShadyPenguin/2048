// ***** Tasks *******
//
// improve tile movement intelligence
//  
// ***** ----- *******
var possibleTileValues          = [2, 4],
    possibleTileLocationIndices = [0, 1, 2, 3],
    allPossibleTileLocations    = {};

// ***** Game Section *****
function Game () {
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
  this.updateView();
  this.enablePlayerControls();
}

Game.prototype.createBoard = function () {
  this.addNewTile();
  this.addNewTile();
}

Game.prototype.addNewTile = function () {
  var value    = this.setTileValue(),
      location = this.setTileLocation();

  this.tiles.push(new Tile(value, location));
}

Game.prototype.updateView = function () {
  var i,
    tile;

  $('p').remove();
  $.each(this.tiles, function(index, tile) {
    tile.clearView();
    tile.updateView();
  });
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

Game.prototype.enablePlayerControls = function () {
  var self = this;

  $(document).on('keyup', function (e) {
    if (e.keyCode == 37) {
      self.moveLeft();
    }
    else if (e.keyCode == 38) {
      console.log("up");
    }
    else if (e.keyCode == 39) {
      console.log("right");
    }
    else if (e.keyCode == 40) {
      console.log("down");
    }
    game.updateView();
  })
}

Game.prototype.disablePlayerControls = function () {
}

Game.prototype.moveLeft = function (direction) {
  $.each(this.tiles, function(index, tile) {
    tile.column -= 1;
  })
}

Game.prototype.checkForPossibleMoves = function () {
  // more core game logicsss
}

Game.prototype.anyMovesLeft = function () {
  // return boolean value
}

/*
Game.prototype.checkGameEndingConditions = function () {
  $.each(this.tiles, function(index, tile) {
    if (tile.value === 2048 && !this.victory) {
      this.playerWins();
    }
  })
  
  if (this.tiles.length == 16 && !this.anyMovesLeft()) {
   this.gameOver();
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
  $.each(this.tiles, function(index, tile) {
    tile.clearView();
  })
  this.tiles = [];
  this.init();
}
*/

// ***** Tiles Section *****
function Tile (value, location) {
  this.value    = value;
  this.row      = location[0];
  this.column   = location[1];
  this.updateView();
}

Tile.prototype.updateView = function () {
  this.$view = $('#' + this.row + '' + this.column)
    .addClass('tile-' + this.value)
    .html('<p>' + this.value + '</p>');
}

Tile.prototype.clearView = function () {
  this.$view
    .removeClass()
    .addClass('grid-cell')
    .html('');
}

// ***** Driver Code *****
$(function() {
  game = new Game();
});
