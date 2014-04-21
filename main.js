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
        self.moveLeft();
        self.addNewTile();
        break;
      case 38:
        self.moveUp();
        self.addNewTile();
        break;
      case 39:
        self.moveRight();
        self.addNewTile();
        break;
      case 40:
        self.moveDown();
        self.addNewTile();
        break;
    }
  });
}

Game.prototype.disablePlayerControls = function () {
}

Game.prototype.moveLeft = function () {
  this.move("column", -1, 0, "Left");
}

Game.prototype.moveUp = function () {
  this.move("row", -1, 0, "Up");
}

Game.prototype.moveRight = function () {
  this.move("column", 1, 3, "Right");
}

Game.prototype.moveDown = function () {
  this.move("row", 1, 3, "Down");
}

Game.prototype.move = function (rowOrColumn, spacesToMove, borderIndex, direction) {
  var collisionFunction = "collision" + direction,
      sortFunction = "sortTiles" + direction,
      incomplete = true,
      tilesMoved,
      nextTile,
      self = this;

  this[sortFunction]();
  while (incomplete) {
    tilesMoved = 0;

    // iterate through each tile on the board
    $.each(this.tiles, function() {
      movingTile = this;

      // If it isn't on the bottom row
      if (this.atBorder(rowOrColumn, borderIndex)) {

        // If it is going to collide with another tile
        if (this[collisionFunction]()) {
          nextTile = $.grep(self.tiles, function (tile) {
            return tile.isNextTile(movingTile.row, movingTile.column, rowOrColumn, spacesToMove);
          })

          // If the moving tile and collided tile have the same value
          if (nextTile[0].value === this.value && nextTile[0].merged === false) {

            // delete from tiles array
            self.tiles.splice(self.tiles.indexOf(this), 1);
            // double static tile value
            nextTile[0].value *= 2;
            nextTile[0].merged = true;
          }
        } else {
          movingTile[rowOrColumn] += spacesToMove; // Negative for left and up
          tilesMoved += 1;
        }
      }
      self.updateView();
    });
    if (tilesMoved === 0) incomplete = false;
    this.updateView();
  }
  $.each(this.tiles, function () {
    this.merged = false;
  })
}

Game.prototype.sortTilesLeft = function() {
  this.tiles.sort(function (tile1, tile2) {
    return tile1.column - tile2.column
  });
}

Game.prototype.sortTilesUp = function() {
  this.tiles.sort(function (tile1, tile2) {
    return tile1.row - tile2.row
  });
}

Game.prototype.sortTilesRight = function() {
  this.tiles.sort(function (tile1, tile2) {
    return tile2.column - tile1.column
  });
}

Game.prototype.sortTilesDown = function() {
  this.tiles.sort(function (tile1, tile2) {
    return tile2.row - tile1.row
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

Tile.prototype.collisionLeft = function () {
  return $('#' + this.row + '' + (this.column - 1) ).hasClass('tile')
}

Tile.prototype.collisionUp = function () {
  return $('#' + (this.row - 1) + '' + this.column).hasClass('tile')
}

Tile.prototype.collisionRight = function () {
  return $('#' + this.row + '' + (this.column + 1) ).hasClass('tile')
}

Tile.prototype.collisionDown = function () {
  return $('#' + (this.row + 1) + '' + this.column).hasClass('tile')
}

Tile.prototype.isNextTile = function (movingTileRow, movingTileColumn, rowOrColumn, spacesToMove) {
  if(rowOrColumn === "row") {
    movingTileRow += spacesToMove;
  } else if (rowOrColumn === "column") {
    movingTileColumn += spacesToMove;
  }

  return this.row === movingTileRow && this.column === movingTileColumn;
}


Tile.prototype.atBorder = function (rowOrColumn, borderIndex) {
  if (borderIndex > 0) {
    return this[rowOrColumn] < borderIndex
  } else {
    return this[rowOrColumn] > borderIndex
  }
}

// ***** Driver Code *****
$(function() {
  game = new Game();
});
