var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var img = document.getElementById("player");
var body = document.getElementsByTagName("body")[0];

let ship_size = {
	width: 99,
	height: 75
};
let margin = 5;

let init_width = c.width - ship_size.width;
let init_height = c.height - ship_size.height - margin;

let width = Math.ceil(c.width / 2 - ship_size.width / 2);
let height = c.height - ship_size.height - margin;
let movement = 4;

//initial draw ship
ctx.drawImage(img, width, height);

var pressed_l = 0;
var pressed_u = 0;
var pressed_r = 0;
var pressed_d = 0;

function Down(e) {
	cxc = e.keyCode;
	if (cxc == 37 && pressed_l == 0) (pressed_l = 1), handle_key_press("left");
	if (cxc == 38 && pressed_u == 0) (pressed_u = 1), handle_key_press("up");
	if (cxc == 39 && pressed_r == 0) (pressed_r = 1), handle_key_press("right");
	if (cxc == 40 && pressed_d == 0) (pressed_d = 1), handle_key_press("down");
	//alert(cxc);
}
function Up(e) {
	cxc = e.keyCode;
	if (cxc == 37 && pressed_l == 1) (pressed_l = 0), handle_key_press("left");
	if (cxc == 38 && pressed_u == 1) (pressed_u = 0), handle_key_press("up");
	if (cxc == 39 && pressed_r == 1) (pressed_r = 0), handle_key_press("right");
	if (cxc == 40 && pressed_d == 1) (pressed_d = 0), handle_key_press("down");
	//alert(cxc);
}

let up_interval;
let down_interval;
let left_interval;
let right_interval;
handle_key_press = key => {
	// let key = event.key;
	console.log(key);
	console.log(pressed_u);
	console.log(up_interval);

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
				ctx.drawImage(img, width, height);
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
				ctx.drawImage(img, width, height);
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
				ctx.drawImage(img, width, height);
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
				ctx.drawImage(img, width, height);
			}
		}, 10);
	}
};
