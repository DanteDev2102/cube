//constants
const { sin, cos, PI } = Math;
const COLOR_BG = '#000';
const COLOR_CUBE = '#f00e0e';
const SPEED_X = 0.05; //rps = rotations per second
const SPEED_Y = 0.15; //rps
const SPEED_Z = 0.1; //rps
const POINT3D = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};
//set up the canvas and context
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

//dimensions
let h = document.documentElement.clientHeight;
let w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

//colors and lines
ctx.fillStyle = COLOR_BG;
ctx.strokeStyle = COLOR_CUBE;
ctx.lineWidth = w / 200;
ctx.lineCap = 'round';

//cube parameter
let cx = w / 2;
let cy = h / 2;
let cz = 0;
let size = h / 8;
let vertices = [
	new POINT3D(cx - size, cy - size, cz - size),
	new POINT3D(cx + size, cy - size, cz - size),
	new POINT3D(cx + size, cy + size, cz - size),
	new POINT3D(cx - size, cy + size, cz - size),
	new POINT3D(cx - size, cy - size, cz + size),
	new POINT3D(cx + size, cy - size, cz + size),
	new POINT3D(cx + size, cy + size, cz + size),
	new POINT3D(cx - size, cy + size, cz + size)
];
let edges = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 0], // back face
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 4], // front face
	[0, 4],
	[1, 5],
	[2, 6],
	[3, 7] // connecting sides
];

//set up animation loop
let timeDelta;
let timeLast = 0;

requestAnimationFrame(loop);

function loop(timeNow) {
	//calculate the time difference
	timeDelta = timeNow - timeLast;
	timeLast = timeNow;

	//background
	ctx.fillRect(0, 0, w, h);

	//rotate the cube along the z axis
	let angle = timeDelta * 0.001 * SPEED_Z * PI * 2;
	for (let v of vertices) {
		const dx = v.x - cx;
		const dy = v.y - cy;
		let x = dx * cos(angle) - dy * sin(angle);
		let y = dx * sin(angle) + dy * cos(angle);
		v.x = x + cx;
		v.y = y + cy;
	}

	//rotate the cube along the x axis
	angle = timeDelta * 0.001 * SPEED_X * PI * 2;
	for (let v of vertices) {
		const dy = v.y - cy;
		const dz = v.z - cz;
		let y = dy * cos(angle) - dz * sin(angle);
		let z = dy * sin(angle) + dz * cos(angle);
		v.y = y + cy;
		v.z = z + cz;
	}

	//rotate the cube along the y axis
	angle = timeDelta * 0.001 * SPEED_Y * PI * 2;
	for (let v of vertices) {
		const dx = v.x - cx;
		const dz = v.z - cz;
		let x = dz * sin(angle) + dx * cos(angle);
		let z = dz * cos(angle) - dx * sin(angle);
		v.x = x + cx;
		v.z = z + cz;
	}
	//draw each edge
	for (let edge of edges) {
		ctx.beginPath();
		ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
		ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
		ctx.stroke();
	}

	//call the next frame
	requestAnimationFrame(loop);
}
