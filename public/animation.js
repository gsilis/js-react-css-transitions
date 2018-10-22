function Animation01(ball, start, stop, reset) {
  this.ball = ball;
  this.start = start;
  this.stop = stop;
  this.reset = reset;

  this.bindListeners();
}

Animation01.prototype.bindListeners = function() {
  this.start.addEventListener('click', this.clickStart.bind(this));
  this.stop.addEventListener('click', this.clickStop.bind(this));
  this.reset.addEventListener('click', this.clickReset.bind(this));
  this.ball.addEventListener('animationstart', this.animationStart.bind(this));
  this.ball.addEventListener('animationend', this.animationEnd.bind(this));
};

Animation01.prototype.clickStart = function(event) {
  this.ball.className = 'ball run-right';
};

Animation01.prototype.clickStop = function(event) {
  this.ball.className = 'ball run-left';
};

Animation01.prototype.clickReset = function(event) {
  console.log('reset');
  this.ball.className = 'ball';
};

Animation01.prototype.animationStart = function() {
  console.log('animation start');
};

Animation01.prototype.animationEnd = function() {
  console.log('animation end');

  if (this.ball.className === 'ball run-right') {
    this.ball.className = 'ball finished';
  } else {
    this.ball.className = 'ball';
  }
};

function setup() {
  var ball = document.getElementById('ball');
  var start = document.getElementById('start-button');
  var stop = document.getElementById('stop-button');
  var reset = document.getElementById('reset-button');

  window.removeEventListener('DOMContentLoaded', setup);

  console.log('Running');
  new Animation01(ball, start, stop, reset);
}

console.log('Adding window listener');
window.addEventListener('DOMContentLoaded', setup);
