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
		canvasContext.rotate(-this.direction);
		canvasContext.fillStyle = this.color;
		canvasContext.fillRect(this.posX, this.posY, this.width, this.height);
		canvasContext.rotate(+this.direction);
	}
}

const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

createRect = (x, y, width, height, color) => {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
};

const allRains = [];
let RainWidth = 2;
let RainHeight = 15;
let maximumRainCount = 500;
const maximumRainInitializationInOneFrame = 5;
const fps = 60;
const color = "#F40FFF";

show = () => {
	update();
	draw();
};

let speedMultiplier = 10;
update = () => {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	let rainInitCountInThisFrame = 0;
	while (
		allRains.length < maximumRainCount &&
		maximumRainInitializationInOneFrame > rainInitCountInThisFrame
	) {
		const distanceFromCam = Math.random();
		// rome-ignore format: easier to read
		const c = `rgba(${parseInt(color.substring(1, 3), 16)},${parseInt(color.substring(3, 5),16)},${parseInt(color.substring(5, 7), 16)},${1 - distanceFromCam})`;
		const rain = new Rain(
			RainWidth * (2 - distanceFromCam),
			RainHeight * (2 - distanceFromCam),
			Math.random() / 20,
			Math.random() * canvas.width,
			-100,
			((2 - distanceFromCam) * 5 * speedMultiplier) / 10,
			c,
		);
		allRains.push(rain);
		++rainInitCountInThisFrame;
	}

	for (let i = 0; i < allRains.length; ++i) {
		allRains[i].move();
		if (allRains[i].posY > canvas.height || allRains[i].posX > canvas.width) {
			allRains.splice(i, 1);
		}
	}
};

draw = () => {
	allRains.forEach((rain) => {
		rain.draw();
	});
};

window.addEventListener("resize", () => {
	cw = window.innerWidth;
	ch = window.innerHeight;
	canvas.width = cw;
	canvas.height = ch;
});

setInterval(show, 1000 / fps);
