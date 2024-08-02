export class SnakeMap {
  lenX;
  lenY;
  snake;
  canvas;
  rectCanvas;
  #snakeWidth = 20;
  food;

  constructor(snake, canvas) {
    this.snake = snake;
    this.canvas = canvas.getContext('2d');

    this.rectCanvas = {
      width: canvas.width,
      height: canvas.height,
    };

    this.lenX = Math.floor(canvas.width / this.#snakeWidth) - 1;
    this.lenY = Math.floor(canvas.height / this.#snakeWidth) - 1;

    this.canvas.fillStyle = 'green';
    this.generateFood();
  }

  showMap() {
    this.canvas.clearRect(0, 0, this.rectCanvas.width, this.rectCanvas.height);

    this.showFood();
    this.snake.updateSnakePosition();
    this.snake.move();
    this.isSheFull();
    this.snake.snakeBody.forEach(({ x, y }) => {
      this.canvas.fillStyle = 'red';
      this.canvas.fillRect(
        x * this.#snakeWidth,
        y * this.#snakeWidth,
        this.#snakeWidth,
        this.#snakeWidth
      );
      this.canvas.fillStyle = 'black';
      this.canvas.fillRect(
        x * this.#snakeWidth + 2,
        y * this.#snakeWidth + 2,
        this.#snakeWidth - 4,
        this.#snakeWidth - 4
      );
    });

    // mirror clone
    this.snake.snakeBody.forEach(({ x, y }) => {
      this.canvas.fillStyle = 'red';
      this.canvas.fillRect(
        (this.lenX - x) * this.#snakeWidth,
        (this.lenY - y) * this.#snakeWidth,
        this.#snakeWidth,
        this.#snakeWidth
      );
      this.canvas.fillStyle = 'black';
      this.canvas.fillRect(
        (this.lenX - x) * this.#snakeWidth + 2,
        (this.lenY - y) * this.#snakeWidth + 2,
        this.#snakeWidth - 4,
        this.#snakeWidth - 4
      );
    });
  }

  generateFood() {
    const x = Math.round(Math.random() * this.lenX);
    const y = Math.round(Math.random() * this.lenY);
    this.food = { x, y };
  }

  showFood() {
    this.canvas.fillStyle = 'green';
    this.canvas.fillRect(
      this.food.x * this.#snakeWidth,
      this.food.y * this.#snakeWidth,
      this.#snakeWidth,
      this.#snakeWidth
    );
  }

  isSheFull() {
    // const info = `${this.snake.snakeHead.x}-${this.food.x}\n${this.snake.snakeHead.y}-${this.food.y}`;
    // console.log(info);
    if (
      this.snake.snakeHead.x === this.food.x &&
      this.snake.snakeHead.y === this.food.y
    ) {
      this.generateFood();
      this.snake.increaseSnake();
    }

    if (
      this.lenX - this.snake.snakeHead.x === this.food.x &&
      this.lenY - this.snake.snakeHead.y === this.food.y
    ) {
      this.generateFood();
      this.snake.increaseSnake();
    }
  }

  gameOver() {
    const { x, y } = this.snake.snakeHead;
    if (x < 0) return true;
    if (y < 0) return true;
    if (x > this.lenX) return true;
    if (y > this.lenY) return true;

    return false;
  }

  clearMap() {
    this.canvas.clearRect(0, 0, this.rectCanvas.width, this.rectCanvas.height);
  }
}
