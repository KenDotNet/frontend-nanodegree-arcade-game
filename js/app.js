// Global property to hold the speedMulitplier. Speed increases if the player wins.
var speedMultiplier = 10;

// Enemies our player must avoid
var Enemy = function(startingY, initialSpeed) {
  // All enemies start on the left side of the canvas
  // Row is determined by the starting Y position
  // Speed is varied according to the speed parameter
  this.sprite = 'images/enemy-bug.png';
  this.x = 1;
  this.y = startingY * 83 - 20;
  this.speed = initialSpeed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = (this.x + (dt * speedMultiplier * this.speed)) % 505;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 404;
}

// Player update, required method for game. This is where we check
// for either a collision or a win.
Player.prototype.update = function() {
  if(!this.hasCollision()) {
    this.checkSuccess();
  }
}

// Check to see if the enemy is in the player's row, then
// check to see if the enemy is in the player's column.
Player.prototype.hasCollision = function() {
  var playerLeft = this.x;
  var playerRight = this.x + 101;
  var playerTop = this.y;
  var playerBottom = this.y + 83;
  allEnemies.forEach(function(enemy) {
    var enemyCenterY = enemy.y + 41.5;
    var enemyRight = enemy.x + 101;
    if ((enemyCenterY > playerTop && enemyCenterY < playerBottom) && // The enemy is in our row
      ((enemy.x > playerLeft && enemy.x < playerRight) || (enemyRight > playerLeft && enemyRight < playerRight))) { // The enemy is in our column
      resetParticipants();
      return true;
    } else {
      return false;
    }
  });
}

// Did we make it to the water and win?
Player.prototype.checkSuccess = function() {
  if(this.y < 72) {
    resetParticipants();
    speedMultiplier *= 2;
  }
}

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move the Player in response to keyboard entry, required method for game
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case "up":
      if (this.y > 0) {
        this.y -= 83;
      }
      break;
    case "down":
      if (this.y < 385) {
        this.y += 83;
      }
      break;
    case "right":
      if (this.x < 404) {
        this.x += 101;
      }
      break;
    case "left":
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    default:
      console.log('Unrecognized direction: ' + direction);
  }
}

// Global objects to hold the participants
var allEnemies = [new Enemy(1, Math.floor((Math.random() * 20) + 1)), new Enemy(2, Math.floor((Math.random() * 20) + 1)), new Enemy(3, Math.floor((Math.random() * 20) + 1))];
var player = new Player();

// This method resets all the participants. It's called
// when player either wins or loses.
var  resetParticipants = function () {
  allEnemies.forEach(function(enemy) {
    enemy.x = 0;
  });
  player = new Player();
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


