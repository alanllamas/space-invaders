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
	if (cxc == 32 && pressed_s == 0) (pressed_s = 1), player_1.draw_shoot();
	if (cxc == 37 && pressed_l == 0) (pressed_l = 1), player_1.move();
	if (cxc == 38 && pressed_u == 0) (pressed_u = 1), player_1.move();
	if (cxc == 39 && pressed_r == 0) (pressed_r = 1), player_1.move();
	if (cxc == 40 && pressed_d == 0) (pressed_d = 1), player_1.move();
	//alert(cxc);
};
let Up = e => {
	cxc = e.keyCode;
	if (cxc == 32 && pressed_s == 1) (pressed_s = 0), player_1.draw_shoot();
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
		this.laser_amount = 10;
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

		if (pressed_u == 1) {
			up_interval = setInterval(() => {
				if (this.y > margin) {
					this.remove()
					this.y -= this.speed;
					this.draw();
				}
			}, 10);
		}
		if (pressed_d == 1) {
			down_interval = setInterval(() => {
				if (this.y < init_height) {
					this.remove()
					this.y += movement;
					this.draw();
				}
			}, 10);
		}
		if (pressed_l == 1) {
			left_interval = setInterval(() => {
				if (this.x > margin) {
					this.remove()
					this.x -= movement;
					this.draw();
				}
			}, 10);
		}
		if (pressed_r == 1) {
			right_interval = setInterval(() => {
				if (this.x < init_width - margin) {
					this.remove()
					this.x += movement;
					this.draw();
				}
			}, 10);
		}
	}
	draw() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	remove(){
		ctx.clearRect(this.x, this.y, this.width, this.height);
		
	}
	draw_shoot() {
		if (pressed_s == 1) {
			this.shoot_laser()
			shoot_interval = setInterval(() => {
				this.shoot_laser()
			}, 200);
		} else {
			clearInterval(shoot_interval);
		}
	}
	shoot_laser(){
		for (let i = 0; i < this.laser_amount; i++) {
				
			let laser =  new Laser(
				( this.x + (this.width  / (this.laser_amount + 1)  * (i + 1))) - 4 , 
				this.y - this.height);
			laser.shoot();
		}
	}

}

class Laser {
	constructor(x, y) {
		this.image = document.getElementById("laser");
		this.image_hit1 = document.getElementById('hit1')
		this.image_hit2 = document.getElementById('hit2')
		this.height = this.image.height;
		this.width = this.image.width;
		this.x = x;
		this.y = y;
		this.strength = 1;
		this.speed = 4;
		this.shoot_interval;
	}
	draw(image) {
		ctx.drawImage(image, this.x, this.y);
	}
	
	shoot() {
		this.shoot_interval = setInterval(() => {
			// console.log(this.image.height);
			if (this.y >= this.height * -1 -10) {
				// console.log(this.y);

				this.remove(this.image);
				this.draw(this.image);
				this.y -= this.speed;
				player_1.draw();

			} else {
				clearInterval(this.shoot_interval);
			}
			this.hit(this.height + 200)
		}, 15);
	}
	remove(image) {
		// ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
		ctx.clearRect(this.x, this.y - 20, image.width, image.height + 30);
	}
	remove_hit(image) {
		// ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
		ctx.clearRect(this.x - 7, this.y - 20, image.width, image.height);
	}
	draw_hit(image) {		
		ctx.drawImage(image, this.x - 7, this.y, image.height / 2, image.width / 2);
	}
	hit(hit_point){
		if (this.y <= hit_point) {
			clearInterval(this.shoot_interval);
			this.remove(this.image);
			this.draw_hit(this.image_hit1)
	
			setTimeout(() => {
				this.remove_hit(this.image_hit1);
				this.draw_hit(this.image_hit2)
				setTimeout(() => {
					this.remove_hit(this.image_hit2);
				}, 35);
			}, 35);
		} 
		
	}
}
class Rock{
	constructor(rock, name){
		this.name = `rock_${name}`;
		this.image = document.getElementById(`${rock}_rock`)
		this.width = this.image.width
		this.height = this.image.height
		this.x = this.width + Math.floor((Math.random() * (canvas_w - (this.width * 2))) + 1);
		this.y = 0  - this.height
		this.resistance = rock == 'big' ? 4 : rock == 'medium' ? 3 : rock == 'small' ? 2 : rock == 'tiny' ? 1 : null 
		this.interval;
	}
	draw(image) {
		ctx.drawImage(image, this.x, this.y);
	}
	remove(image) {
		// ctx.clearRect(this.x, this.y, canvas_w, canvas_h);
		ctx.clearRect(this.x, this.y - 20, image.width, image.height);
	}
	move(){
		// console.log(this.x);
		
		// this.draw(this.image)
		this.interval = setInterval(() => {
			if (this.y < canvas_h) {
				
				this.remove(this.image)
				this.draw(this.image)
				this.y += 1
				player_1.draw();
				// player_1.draw_shoot(	)

			} else if (this.y == canvas_h) {
				// console.log( this.name + ' ya se paro');
				
				clearInterval(this.interval)
			}
			
		}, 6);

		

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
