var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var body = document.getElementsByTagName("body")[0];

let margin = 5;

let canvas_w = c.width;
let canvas_h = c.height;

var pressed_l = 0;
var pressed_u = 0;
var pressed_r = 0;
var pressed_d = 0;
var pressed_s = 0;

let ship_data = {
	width: 50,
	height: 38
};

let init_width = canvas_w - ship_data.width;
let init_height = canvas_h - ship_data.height - margin;

let width = Math.ceil(canvas_w / 2 - ship_data.width / 2);
let height = canvas_h - ship_data.height - margin;
let movement = 4;

let up_interval;
let down_interval;
let left_interval;
let right_interval;
let shoot_interval;

let Down = e => {
	cxc = e.keyCode;
	// if (cxc == 32 && pressed_s == 0) (pressed_s = 1), player_1.draw_shoot();
	if (cxc == 37 && pressed_l == 0) (pressed_l = 1), player_1.move();
	if (cxc == 38 && pressed_u == 0) (pressed_u = 1), player_1.move();
	if (cxc == 39 && pressed_r == 0) (pressed_r = 1), player_1.move();
	if (cxc == 40 && pressed_d == 0) (pressed_d = 1), player_1.move();
	//alert(cxc);
};
let Up = e => {
	cxc = e.keyCode;
	// if (cxc == 32 && pressed_s == 1) (pressed_s = 0), player_1.draw_shoot();
	if (cxc == 37 && pressed_l == 1) (pressed_l = 0), player_1.move();
	if (cxc == 38 && pressed_u == 1) (pressed_u = 0), player_1.move();
	if (cxc == 39 && pressed_r == 1) (pressed_r = 0), player_1.move();
	if (cxc == 40 && pressed_d == 1) (pressed_d = 0), player_1.move();
	//alert(cxc);
};

class Ship {
	constructor() {
		this.life = 1;
		this.level = 0;
		this.image = document.getElementById("player");
		this.laser = document.getElementById("laser");
		this.shoot_speed = 1;
		this.shoot_strength = 1;
		this.laser_amount = 3;
		this.speed = 4;
		this.width = 50;
		this.height = 38;
		this.init_x = canvas_w - this.width;
		this.init_y = canvas_h - this.height;
		this.x = this.init_x;
		this.y = this.init_y;
	}
	move() {
		clearInterval(up_interval);
		clearInterval(down_interval);
		clearInterval(left_interval);
		clearInterval(right_interval);
		console.log("x : ", this.x);
		console.log("y : ", this.y);

		if (pressed_u == 1) {
			up_interval = setInterval(() => {
				if (this.y > margin) {
					ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
					this.y -= this.speed;
					this.draw();
				}
			}, 10);
		}
		if (pressed_d == 1) {
			down_interval = setInterval(() => {
				if (this.y < init_height) {
					ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
					this.y += movement;
					this.draw();
				}
			}, 10);
		}
		if (pressed_l == 1) {
			left_interval = setInterval(() => {
				if (this.x > margin) {
					ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
					this.x -= movement;
					this.draw();
				}
			}, 10);
		}
		if (pressed_r == 1) {
			right_interval = setInterval(() => {
				if (this.x < init_width - margin) {
					ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
					this.x += movement;
					this.draw();
				}
			}, 10);
		}
	}
	draw() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	draw_shoot() {
		shoot_interval = setInterval(() => {
			for (let i = 0; i < this.laser_amount; i++) {
				let laser = new Laser(this.x + i * 10, this.y);
				laser.shoot();
			}
		}, 200);
		// if (pressed_s == 1) {
		// } else {
		// 	setTimeout(() => {}, 190);
		// 	clearInterval(shoot_interval);
		// }
	}
}

class Laser {
	constructor(x, y) {
		this.image = document.getElementById("laser");
		this.height = this.image.height;
		this.width = this.image.width;
		this.x = x;
		this.y = y;
		this.strength = 1;
		this.speed = 5;
	}
	draw() {
		ctx.drawImage(this.image, this.x, this.y);
	}
	shoot() {
		let shoot_interval = setInterval(() => {
			// console.log(this.image.height);
			if (this.y >= this.height * -1) {
				// console.log(this.y);

				this.remove();
				this.draw();
				this.y -= 10;
				player_1.draw();
				// this.draw();
			} else {
				clearInterval(shoot_interval);
			}
		}, 30);
	}
	remove() {
		// ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
		ctx.clearRect(this.x, this.y - 20, this.width, this.height + 30);
	}
}

//initial draw ship

player_1 = new Ship();
player_1.draw();
player_1.draw_shoot();


initial_width = width;
initial_height = height;


shoot_center = h => {
	ctx.clearRect(
		initial_width + ship_data.width / 2 - 4,
		h,
		canvas_w,
		canvas_h
	);
	shoot(initial_width + ship_data.width / 2 - 4, h);
};

side_height = 25;
center_height = 55;

make_shoot = () => {
	// shoot_left(init_height - side_height);
	// shoot_right(init_height - side_height);
	// shoot_center(init_height - center_height);
	// side_height += 10;
	// center_height += 10;
	// ctx.drawImage(ship, width, height);
	setInterval(() => {
		shoot_left(initial_height - side_height);
		shoot_right(initial_height - side_height);
		shoot_center(initial_height - center_height);
		ctx.drawImage(ship, width, height, ship_data.width, ship_data.height);
		side_height += 10;
		center_height += 10;
	}, 200);
};

// const element = array[i];
