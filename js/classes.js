//Create a sprite with the common attributes and methods
class Entity {
  constructor() {
    this.sprite = 'images/'
    this.x = 2; //x offset for player start
    this.y = 5; //y offset for player start
  }

//This method defines variables that willl be used to prevent
// the sprites from going out of bounds.
  update(dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

//This method renders the sprites.
  render() {
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
	}

//This method returns true if the player sprite has collided with an enemy
// sprite and false wotherwise.
  checkCollisions(playerOrEnemy){
		if(this.y === playerOrEnemy.y) {
			if(this.x >= playerOrEnemy.x -0.5 && this.x <= playerOrEnemy.x + 0.5) {
				return true;
			}
		}
		else{
			return false;
		}
	}
}

//This creates the class Player and defines its variables and methods.
class Player extends Entity {
	constructor() {
		super();
		this.sprite += 'char-cat-girl.png';
		this.moving = false;
		this.win = false;
	}

//This method handles winning.
	update(dt){
		super.update();
		if(this.isOutOfBoundsY && !this.moving &&  !this.win) {
			alert("win");
      this.win = true;
    }
	}

//This method renders the player on the game board.
	render(){
		super.render();
		this.moving = false;
	}

//This method handles moving the player on the gameboard and
// keeping the player in bounds.
	handleInput(moveType){
		switch (moveType) {
			case 'left':
				this.x = this.x > 0 ? this.x - 1 : this.x;
				break;
			case 'up':
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case 'down':
        this.y = this.y < 5 ? this.y + 1 : this.y;
        break;
      default:
        break;
		}
    this.moving = true;
	}
}

//This creates the Enemy class.
class Enemy extends Entity {
	constructor(x, y) {
		super();
		this.sprite += 'enemy-bug.png';
		this.x = x;
		this.y = y;
	}

//This creates the enemy loop and controls the speed of the enemies.
	update(dt){
		super.update();
		if(this.isOutOfBoundsX){
			this.x = -1;
		}
		else{
			this.x += dt * (Math.random() * 5);
		}
	}
}
