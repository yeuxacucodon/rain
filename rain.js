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
		ctx.rotate(+this.direction);
	}
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

const allRains = [];
const RainWidth = 2;
const RainHeight = 15;
const maximumRainCount = 500;
const maximumRainInitializationInOneFrame = 5;
const fps = 60;

function randomColors() {
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);
	const a = 1 - Math.random();
	const color = `rgba(${r}, ${g}, ${b}, ${a})`;
	return color;
}

show = () => {
	update();
	draw();
};

const speedMultiplier = 10;
update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let rainInitCountInThisFrame = 0;
	// rome-ignore format: easier to read
	while (allRains.length < maximumRainCount && maximumRainInitializationInOneFrame > rainInitCountInThisFrame) {
		const distanceFromCam = Math.random();
		// rome-ignore format: easier to read
    const color = randomColors();
		const rain = new Rain(
			RainWidth * (2 - distanceFromCam),
			RainHeight * (2 - distanceFromCam),
			Math.random() / 20,
			Math.random() * canvas.width,
			-100,
			((2 - distanceFromCam) * 5 * speedMultiplier) / 10,
			color,
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
