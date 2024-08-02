import { Snake } from './snake';
import { SnakeMap } from './map';

const refs = {
  canvas: document.querySelector('.js-canvas'),
  startBtn: document.querySelector('.js-start-btn'),
};

const options = {
  idInterval: null,
  fps: 100,
};

const snake = new Snake(25);
const map = new SnakeMap(snake, 39, 34, refs.canvas);

refs.startBtn.addEventListener('click', e => {
  if (options.idInterval) {
    clearInterval(options.idInterval);
    options.idInterval = null;
  } else {
    options.idInterval = setInterval(() => {
      if (!map.gameOver()) {
        map.showMap();
      } else {
        map.clearMap();
        clearInterval(options.idInterval);
        options.idInterval = null;
        snake.resetSnake();
        alert('GAME OVER');
      }
    }, options.fps);
  }
});

document.addEventListener('keydown', e => {
  snake.cahngeDirection(e.code);
});
