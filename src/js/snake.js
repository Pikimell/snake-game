const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export class Snake {
  direction = DIRECTIONS.RIGHT;
  speed = 1;
  snakeBody = [];
  snakeHead = new Point();
  lengthSnake = 1;

  constructor(snakeLen) {
    this.snakeBody.push(this.snakeHead);
    for (let i = 0; i < snakeLen; i++) {
      this.snakeBody.push(new Point());
      this.lengthSnake++;
    }
  }

  updateSnakePosition() {
    const lastElem = this.snakeBody.pop();
    lastElem.x = this.snakeHead.x;
    lastElem.y = this.snakeHead.y;
    this.snakeBody.splice(1, 0, lastElem);
  }

  move() {
    const direction = this.direction;
    switch (direction) {
      case DIRECTIONS.UP:
        this.snakeHead.y -= this.speed;
        break;
      case DIRECTIONS.DOWN:
        this.snakeHead.y += this.speed;
        break;
      case DIRECTIONS.RIGHT:
        this.snakeHead.x += this.speed;
        break;
      case DIRECTIONS.LEFT:
        this.snakeHead.x -= this.speed;
        break;
    }
  }

  cahngeDirection(keyCode) {
    switch (keyCode) {
      case 'KeyW':
        if (this.direction != DIRECTIONS.DOWN) this.direction = DIRECTIONS.UP;
        break;

      case 'KeyS':
        if (this.direction != DIRECTIONS.UP) this.direction = DIRECTIONS.DOWN;
        break;

      case 'KeyA':
        if (this.direction != DIRECTIONS.RIGHT)
          this.direction = DIRECTIONS.LEFT;
        break;

      case 'KeyD':
        if (this.direction != DIRECTIONS.LEFT)
          this.direction = DIRECTIONS.RIGHT;
        break;

      case 'ArrowDown':
        if (this.direction != DIRECTIONS.DOWN) this.direction = DIRECTIONS.UP;
        break;

      case 'ArrowUp':
        if (this.direction != DIRECTIONS.UP) this.direction = DIRECTIONS.DOWN;
        break;

      case 'ArrowRight':
        if (this.direction != DIRECTIONS.RIGHT)
          this.direction = DIRECTIONS.LEFT;
        break;

      case 'ArrowLeft':
        if (this.direction != DIRECTIONS.LEFT)
          this.direction = DIRECTIONS.RIGHT;
        break;
    }
  }

  resetSnake() {
    this.direction = DIRECTIONS.RIGHT;
    this.snakeHead = new Point();
    this.snakeBody = [];
    this.snakeBody.push(this.snakeHead);
    for (let i = 0; i < 5; i++) {
      this.snakeBody.push(new Point());
    }
  }

  increaseSnake() {
    const lastElem = { ...this.snakeBody[this.lengthSnake - 1] };
    this.snakeBody.push(lastElem);
    this.lengthSnake++;
  }
}

class Point {
  x;
  y;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
