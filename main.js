import { longStackSupport } from "q";
import { init } from "events";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const weight = document.querySelectorAll('.weight');
const weightInside = document.querySelectorAll('.weight-inside');
const cur = document.querySelector('.current');
const red = document.querySelector('.color.red');
const green = document.querySelector('.color.green');
const blue = document.querySelector('.color.blue');
const white = document.querySelector('.color.white');
const black = document.querySelector('.color.black');
const download = document.querySelector('.download-wrapper');
const clear = document.querySelector('.clear-wrapper');
const big = document.querySelector('.size.big');
const small = document.querySelector('.size.small');
canvas.width = 600;
canvas.height = 400;

let x = 0;
let y = 0;
let save = 0;
ctx.lineWidth = 1;
weight[0].style.backgroundColor = 'rgba(26, 140, 255, 0.2)';
weight[0].style.border = '1px solid #1a8cff';
cur.style.backgroundColor = 'black';

weightInside.forEach(function(n, index) {
  var x = 0.3 + (index*0.5);
  n.style.border = `${x}px solid`;
})

big.addEventListener('click', function() {
  var data=ctx.getImageData(0,0,canvas.width,canvas.height);
  var saveWidth = ctx.lineWidth;
  var saveColor = ctx.strokeStyle;
  canvas.width += 6;
  canvas.height += 4;
  ctx.putImageData(data,0,0);
  ctx.lineWidth = saveWidth;
  ctx.strokeStyle = saveColor;
});
small.addEventListener('click', function() {
  var data=ctx.getImageData(0,0,canvas.width,canvas.height);
  var saveWidth = ctx.lineWidth;
  var saveColor = ctx.strokeStyle;
  canvas.width -= 6;
  canvas.height -= 4;
  ctx.putImageData(data,0,0);
  ctx.lineWidth = saveWidth;
  ctx.strokeStyle = saveColor;
});
weight.forEach(function(n, index) {
  n.addEventListener('click', function(e) {
    weight[save].style.backgroundColor = '';
    weight[save].style.border = '';
    save = index;
    n.style.backgroundColor = 'rgba(26, 140, 255, 0.2)';
    n.style.border = '1px solid #1a8cff';
    ctx.lineWidth = 1+(index*3);
  })
})
red.addEventListener('click', function() {
  ctx.strokeStyle = "red";
  cur.style.backgroundColor = 'red';
})
green.addEventListener('click', function() {
  ctx.strokeStyle = "green";
  cur.style.backgroundColor = 'green';
})
blue.addEventListener('click', function() {
  ctx.strokeStyle = "blue";
  cur.style.backgroundColor = 'blue';
})
white.addEventListener('click', function() {
  ctx.strokeStyle = "white";
  cur.style.backgroundColor = 'white';
})
black.addEventListener('click', function() {
  ctx.strokeStyle = "black";
  cur.style.backgroundColor = 'black';
})
download.addEventListener('click', function(e) {
  console.log('click');
  var link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = "image.png";
  document.body.appendChild(link);
  link.click();
})
clear.addEventListener('click', function(e) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
})

canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
  x = offsetX;
  y = offsetY;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  canvas.addEventListener('mousemove', onmousemove);
});
canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', onmousemove);
});

function onmousemove({ offsetX, offsetY }) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
  x = offsetX;
  y = offsetY;
}
