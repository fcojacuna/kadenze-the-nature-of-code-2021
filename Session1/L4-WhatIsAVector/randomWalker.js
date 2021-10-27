///We store the walkers here
let walkers = [];

//Parameters
const BACKGROUND_COLOR = 25;
const DEFAULT_NUMBER_OF_WALKERS = 5;
const DEFAULT_SIZE = 10;
const DEFAULT_TRANSPARENCY_PERCENTAGE = 0;
const DEFAULT_VELOCITY = DEFAULT_SIZE * 0.8;

//Sliders
const sliders = {
  velocity: createSlider(0, 50, DEFAULT_VELOCITY),
  transparency: createSlider(0, 100, DEFAULT_TRANSPARENCY_PERCENTAGE),
  size: createSlider(0, 50, DEFAULT_SIZE),
  quantity: createSlider(1, 50, DEFAULT_NUMBER_OF_WALKERS),
};

//Reset button creator
function createResetButton() {
  button = createButton("Reset");
  button.position(20, 20);
  button.mousePressed(() => {
    background(BACKGROUND_COLOR);
    walkers.forEach((w) => {
      w.x = width / 2;
      w.y = height / 2;
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
    w.walk();
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
    this.pos = createVector(width / 2, height / 2);
  }

  //Walking method
  walk() {
    this.velocity = createVector(
      random(-sliders.velocity.value(), sliders.velocity.value()),
      random(-sliders.velocity.value(), sliders.velocity.value())
    );
    this.pos = this.pos.add(this.velocity);

    //Check bounds for x
    if (this.pos.x > width || this.pos.x < 0) {
      this.pos.x = width / 2;
    }

    //Check bounds for y
    if (this.pos.y > height || this.pos.y < 0) {
      this.pos.y = height / 2;
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
