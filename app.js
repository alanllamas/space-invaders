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
let movement = 5;

//initial draw ship
ctx.drawImage(img, width, height);

handle_key_press = event => {
	let key = event.key;
	// console.log(event);
	switch (key) {
		case "ArrowUp":
			if (height > margin) {
				ctx.clearRect(width, height, c.width, c.height);
				height -= movement;
				ctx.drawImage(img, width, height);
			}
			break;
		case "ArrowDown":
			if (height < init_height) {
				ctx.clearRect(width, height, c.width, c.height);
				height += movement;
				ctx.drawImage(img, width, height);
			}
			break;
		case "ArrowLeft":
			if (width > margin) {
				ctx.clearRect(width, height, c.width, c.height);
				width -= movement;
				ctx.drawImage(img, width, height);
			}

			break;
		case "ArrowRight":
			if (width < init_width - margin) {
				ctx.clearRect(width, height, c.width, c.height);
				width += movement;
				ctx.drawImage(img, width, height);
			}

			break;
		case " ":
			break;
		default:
			break;
	}
};
