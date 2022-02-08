const canvas = document.getElementById('c');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const buttonBrush = document.getElementById('brush');
const buttonRect = document.getElementById('rect');
const buttonEraser = document.getElementById('eraser');
const sizeRange = document.getElementById('size-range');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const ctx = canvas.getContext('2d');

let currentMode = 'brush';

let size = 5;
let color = 'black';
let isPressed = false;
let x;
let y;
let tmpX;
let tmpY;
canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        if (currentMode === 'brush') {
            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);
            x = x2;
            y = y2;
        } else if (currentMode === 'rect') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawRect(x, y, x2 - x, y2 - y);
        } else if (currentMode === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);
            x = x2;
            y = y2;
            ctx.globalCompositeOperation = 'source-over';
        }
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function drawRect(x1, y1, width, height) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x1, y1, width, height);
}

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

function adjustSize() {
    size = sizeRange.value;
    updateSizeOnScreen();
}

increaseBtn.addEventListener('click', () => {
    size += 1;
    if (size > 50) {
        size = 50;
    }
    updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
    size -= 1;
    if (size < 5) {
        size = 5;
    }
    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => (color = e.target.value));

buttonBrush.addEventListener('click', () => {
    currentMode = 'brush';
});

buttonRect.addEventListener('click', () => {
    currentMode = 'rect';
});

buttonEraser.addEventListener('click', () => {
    currentMode = 'eraser';
});

clearEl.addEventListener('click', () =>
    ctx.clearRect(0, 0, canvas.width, canvas.height)
);
