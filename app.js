var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var ship = document.getElementById("player");
var laser = document.getElementById("laser");
var body = document.getElementsByTagName("body")[0];
// ship.style.width = "50px";
// ship.style.height = "38px";

let ship_data = {
	width: 50,
	height: 38
};

let margin = 5;

let init_width = c.width - ship_data.width;
let init_height = c.height - ship_data.height - margin;

let width = Math.ceil(c.width / 2 - ship_data.width / 2);
let height = c.height - ship_data.height - margin;
let movement = 4;

let up_interval;
let down_interval;
let left_interval;
let right_interval;

var pressed_l = 0;
var pressed_u = 0;
var pressed_r = 0;
var pressed_d = 0;

//initial draw ship
ctx.drawImage(ship, width, height, ship_data.width, ship_data.height);

function Down(e) {
	console.log(e);

	cxc = e.keyCode;
	if (cxc == 32) make_shoot();
	if (cxc == 37 && pressed_l == 0) (pressed_l = 1), handle_movement("left");
	if (cxc == 38 && pressed_u == 0) (pressed_u = 1), handle_movement("up");
	if (cxc == 39 && pressed_r == 0) (pressed_r = 1), handle_movement("right");
	if (cxc == 40 && pressed_d == 0) (pressed_d = 1), handle_movement("down");
	//alert(cxc);
}
function Up(e) {
	cxc = e.keyCode;
	if (cxc == 37 && pressed_l == 1) (pressed_l = 0), handle_movement("left");
	if (cxc == 38 && pressed_u == 1) (pressed_u = 0), handle_movement("up");
	if (cxc == 39 && pressed_r == 1) (pressed_r = 0), handle_movement("right");
	if (cxc == 40 && pressed_d == 1) (pressed_d = 0), handle_movement("down");
	//alert(cxc);
}

handle_movement = key => {
	// let key = event.key;
	// console.log(key);
	// console.log(pressed_u);
	// console.log(up_interval);

	clearInterval(up_interval);
	clearInterval(down_interval);
	clearInterval(left_interval);
	clearInterval(right_interval);

	if (pressed_u == 0) {
	} else if (pressed_u == 1) {
		up_interval = setInterval(() => {
			if (height > margin) {
				ctx.clearRect(width, height, c.width, c.height);
				height -= movement;
				ctx.drawImage(
					ship,
					width,
					height,
					ship_data.width,
					ship_data.height
				);
			}
		}, 10);
	}
	if (pressed_d == 0) {
		clearInterval(down_interval);
	} else if (pressed_d == 1) {
		down_interval = setInterval(() => {
			if (height < init_height) {
				ctx.clearRect(width, height, c.width, c.height);
				height += movement;
				ctx.drawImage(
					ship,
					width,
					height,
					ship_data.width,
					ship_data.height
				);
			}
		}, 10);
	}
	if (pressed_l == 0) {
		clearInterval(left_interval);
	} else if (pressed_l == 1) {
		left_interval = setInterval(() => {
			if (width > margin) {
				ctx.clearRect(width, height, c.width, c.height);
				width -= movement;
				ctx.drawImage(
					ship,
					width,
					height,
					ship_data.width,
					ship_data.height
				);
			}
		}, 10);
	}
	if (pressed_r == 0) {
		clearInterval(right_interval);
	} else if (pressed_r == 1) {
		right_interval = setInterval(() => {
			if (width < init_width - margin) {
				ctx.clearRect(width, height, c.width, c.height);
				width += movement;
				ctx.drawImage(
					ship,
					width,
					height,
					ship_data.width,
					ship_data.height
				);
			}
		}, 10);
	}
};

shoot = (w, h) => {
	// ctx.clearRect(w, h, c.width, c.height);
	ctx.drawImage(laser, w, h);
};

shoot_left = h => {
	ctx.clearRect(initial_width, h, c.width, c.height);
	shoot(initial_width, h);
};

initial_width = width;
initial_height = height;
shoot_right = h => {
	ctx.clearRect(initial_width + ship_data.width - 8, h, c.width, c.height);
	shoot(initial_width + ship_data.width - 8, h);
};

shoot_center = h => {
	ctx.clearRect(
		initial_width + ship_data.width / 2 - 4,
		h,
		c.width,
		c.height
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
