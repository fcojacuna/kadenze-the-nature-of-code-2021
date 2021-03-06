///We store the walkers here
let walkers = [];

//Parameters
const BACKGROUND_COLOR = 25;
const DEFAULT_NUMBER_OF_WALKERS = 10;
const DEFAULT_SIZE = 10;
const DEFAULT_TRANSPARENCY_PERCENTAGE = 10;
const DEFAULT_ACCELERATION = 10;
const MAX_VELOCITY = 100;

//Sliders
const sliders = {
  transparency: createSlider(0, 100, DEFAULT_TRANSPARENCY_PERCENTAGE),
  size: createSlider(0, 50, DEFAULT_SIZE),
  quantity: createSlider(1, 50, DEFAULT_NUMBER_OF_WALKERS),
  acceleration: createSlider(0, 1, DEFAULT_ACCELERATION, 0.1),
};

//Reset button creator
function createResetButton() {
  button = createButton("Reset");
  button.position(20, 20);
  button.mousePressed(() => {
    background(BACKGROUND_COLOR);
    Object.values(sliders).forEach((slider) => {
      slider.value(10);
    });
  });
}

//Number of elements handler
function nElementsHandler() {
  //Ensure number of elements matches slider number
  while (sliders.quantity.value() !== walkers.length) {
    if (sliders.quantity.value() > walkers.length) {
      //Theres not enough elements, add one more
      walkers.push(new Walker());
    } else {
      //There are too many elements, remove one of them
      walkers.pop();
    }
  }
}

function setup() {
  //Crate Canvcas
  createCanvas(width, height);

  //Set background color
  background(BACKGROUND_COLOR);

  //Create sliders
  Object.values(sliders).forEach((slider, index) => {
    slider.position(20, 20 * (index + 1) + 20);
    slider.style("width", "80px");
  });

  //Create walkers
  for (let i = 0; i < DEFAULT_NUMBER_OF_WALKERS; i++) {
    walkers.push(new Walker());
  }

  //Reset button
  createResetButton();
}

function draw() {
  nElementsHandler();
  walkers.forEach((w) => {
    w.update();
    w.display();
  });
}

/**
 * Class because we are classy
 */
class Walker {
  //Walker constructor
  constructor() {
    //Walker Properties
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.pos = createVector(random(0, width), random(0, height));
  }

  //Walking method
  update() {
    this.acceleration = p5.Vector.random2D();

    this.acceleration.setMag(sliders.acceleration.value());

    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);

    console.log(this.velocity.mag());

    //Upper velocity limit
    this.velocity.limit(MAX_VELOCITY);

    //Check bounds for x
    if (this.pos.x > width || this.pos.x < 0) {
      this.velocity.mult(-1, 0);
    }

    //Check bounds for y
    if (this.pos.y > height || this.pos.y < 0) {
      this.velocity.mult(0, -1);
    }
  }

  //Display Method
  display() {
    const [transparency, size] = [
      sliders.transparency.value(),
      sliders.size.value(),
    ];
    stroke(0, 0, 0, map(transparency, 0, 100, 255, 0));
    fill(
      map(this.pos.x, 0, width, 0, 255),
      0,
      map(this.pos.y, 0, height, 0, 255),
      map(transparency, 0, 100, 255, 0)
    );
    ellipse(this.pos.x, this.pos.y, size, size);
  }
}
