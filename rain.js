const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

window.addEventListener("resize", () => {
	cw = window.innerWidth;
	ch = window.innerHeight;
	canvas.width = cw;
	canvas.height = ch;
});

class Rain {
	constructor(width, height, direction, posX, posY, speed, color) {
		this.width = width;
		this.height = height;
		this.direction = direction;
		this.posX = posX;
		this.posY = posY;
		this.speed = speed;
		this.color = color;
	}

	move() {
		this.posX += Math.sin((this.direction * Math.PI) / 2) * this.speed;
		this.posY += Math.cos((this.direction * Math.PI) / 2) * this.speed;
	}

	draw() {
		ctx.rotate(-this.direction);
		ctx.fillStyle = this.color;
		ctx.fillRect(this.posX, this.posY, this.width, this.height);
		ctx.rotate(this.direction);
	}
}

const allRains = [];
const RainWidth = 2;
const RainHeight = 15;
const maxRainCount = 500;
const maxRainInOneFrame = 5;
const speed = 10;

function randomColors() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	const a = 1 - Math.random();
	const color = `rgba(${r}, ${g}, ${b}, ${a})`;
	return color;
}

function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let rainCountInThisFrame = 0;
	// rome-ignore format: easier to read
	while (allRains.length < maxRainCount && rainCountInThisFrame < maxRainInOneFrame) {
		const rain = new Rain(
			RainWidth * (2 - Math.random()),
			RainHeight * (2 - Math.random()),
			Math.random() / 10,
			Math.random() * canvas.width,
			0,
			((2 - Math.random()) * 5 * speed) / 10,
			randomColors(),
		);
		allRains.push(rain);
		++rainCountInThisFrame;
	}

	allRains.forEach((element, index) => {
		element.move();
		if (element.posX > canvas.width || element.posY > canvas.height) {
			allRains.splice(index, 1);
		}
	});
}

window.onload = function show() {
	requestAnimationFrame(show);
	update();
	allRains.forEach((rain) => {
		rain.draw();
	});
};
