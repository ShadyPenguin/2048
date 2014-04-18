var possibleTileValues          = [2, 4],
    possibleTileLocationIndices = ['0', '1', '2', '3'],
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

  $.each($('.grid-cell.tile'), function() {
    $(this).removeClass()
      .addClass('grid-cell');
  });

  $.each(this.tiles, function() {
    this.drawSelf();
  });
}

Game.prototype.setTileValue = function () {
  return possibleTileValues[Math.floor(Math.random() * 2)];
}

Game.prototype.setTileLocation = function () {
  var keys,
      availableLocations = jQuery.extend(true, {}, allPossibleTileLocations);

  // Deletes each 'occupied' tile location of the board from possible options
  $.each(this.tiles, function() {
    delete availableLocations[this.row + '' + this.column]
  })

  // Select a value from a random key in availableLocations array
  keys = Object.keys(availableLocations);
  return keys[keys.length * Math.random() << 0];
}

Game.prototype.enablePlayerControls = function () {
  var self = this;

  $(document).on('keyup', function (e) {
    switch (e.keyCode) {
      case 37:
        self.moveTiles('left');
        self.addNewTile();
        break;
      case 38:
        self.moveTiles('up');
        self.addNewTile();
        break;
      case 39:
        self.moveTiles('right');
        self.addNewTile();
        break;
      case 40:
        self.moveTiles('down');
        self.addNewTile();
        break;
    }
  });
}

Game.prototype.disablePlayerControls = function () {
}


// TODO: Actually make this legible
Game.prototype.moveTiles = function (direction) {
  var incomplete = true,
      tilesMoved,
      nextTile,
      self = this,
      deleteTiles = [];

  this.sortTiles(direction);
  while (incomplete) {
    tilesMoved = 0;

    $.each(this.tiles, function() {
      if (!this.againstWall(direction)) {
        if (this.collision(direction)) {
          nextTile = self.findNextTile(direction, this);
          if (self.mergeTiles(nextTile[0], this)) {
            deleteTiles.push(this);
            tilesMoved += 1;
          }
        } else {
          tilesMoved += this.moveTiles(direction);
        }
        self.updateView();
      }
    });

    $.each(deleteTiles, function () {
      self.tiles.splice(self.tiles.indexOf(this), 1);
    })

    if (tilesMoved === 0) incomplete = false;
    this.updateView();
  }

  $.each(this.tiles, function () {
    this.merged = false;
  })
}

Game.prototype.tilesMatch = function (nextTile, movingTile) {
  return nextTile.value === movingTile.value && nextTile.merged === false
}

Game.prototype.mergeTiles = function (nextTile, movingTile) {
  if (this.tilesMatch(nextTile, movingTile)) {
    nextTile.value *= 2;
    console.log(nextTile)
    nextTile.merged = true;
    return true;
  }
  return false
}

Game.prototype.findNextTile = function(direction, movingTile) {
  return $.grep(this.tiles, function (nextTile) {
    switch (direction) {
      case 'left':
        return nextTile.row === movingTile.row && nextTile.column === movingTile.column - 1;
      case 'up':
        return nextTile.row === movingTile.row - 1 && nextTile.column === movingTile.column;
      case 'right':
        return nextTile.row === movingTile.row && nextTile.column === movingTile.column + 1;
      case 'down':
        return nextTile.row === movingTile.row + 1 && nextTile.column === movingTile.column;
    }

  })
}

Game.prototype.sortTiles = function(direction) {
  this.tiles.sort(function (tile1, tile2) {
    switch (direction) {
      case 'left':
        return tile1.column - tile2.column;
      case 'up':
        return tile1.row - tile2.row;
      case 'right':
        return tile2.column - tile1.column;
      case 'down':
        return tile2.row - tile1.row;
    }
  });
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
  this.row      = parseInt(location[0]);
  this.column   = parseInt(location[1]);
  this.merged   = false;
  this.drawSelf('new');
}

Tile.prototype.drawSelf = function (isNew) {
  this.$view = $('#' + this.row + '' + this.column)
    .addClass('tile')
    .addClass('tile-' + this.value)
    .addClass(isNew)
    .html('<p>' + this.value + '</p>');

  if (this.merged) this.$view.addClass('merged');
}

Tile.prototype.againstWall = function (direction) {
  switch (direction) {
    case 'left':
      return this.column === 0;
    case 'up':
      return this.row === 0;
    case 'right':
      return this.column === 3;
    case 'down':
      return this.row === 3;
  }
}

Tile.prototype.collision = function (direction) {
  switch (direction) {
    case 'left':
      return $('#' + this.row + '' + (this.column - 1)).hasClass('tile');
    case 'up':
      return $('#' + (this.row - 1) + '' + this.column).hasClass('tile');
    case 'right':
      return $('#' + this.row + '' + (this.column + 1)).hasClass('tile');
    case 'down':
      return $('#' + (this.row + 1) + '' + this.column).hasClass('tile');
  }
}

Tile.prototype.moveTiles = function (direction) {
  switch (direction) {
    case 'left':
      this.column -= 1;
      return 1;
    case 'up':
      this.row -= 1;
      return 1;
    case 'right':
      this.column += 1;
      return 1;
    case 'down':
      this.row += 1;
      return 1;
  }
  return 0;
}

// ***** Driver Code *****
$(function() {
  game = new Game();
});
