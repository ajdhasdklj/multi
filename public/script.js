// script.js
const socket = io();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let drawing = false;

canvas.addEventListener('mousedown', () => {
  drawing = true;
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', (event) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';

  ctx.lineTo(x, y);
  ctx.stroke();

  // Emit the drawing data to the server
  socket.emit('draw', { x, y });
});

// Listen for drawing data from other clients
socket.on('draw', (data) => {
  ctx.lineTo(data.x, data.y);
  ctx.stroke();
});

// Listen for clearing canvas event from the server
socket.on('clearCanvas', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
