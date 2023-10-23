const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const scoreEl = document.querySelector('.score');
const bestScoreEl = document.querySelector('.best-score');

const navHeight = document.querySelector(".navbar").offsetHeight;

canvas.width = innerWidth;
canvas.height = innerHeight - navHeight;

const playerImg = '/player.png';
const player = new Player(100, 50, playerImg);
player.draw();