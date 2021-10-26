///We store the walkers here
let walkers = [];

//Parameters
const BACKGROUND_COLOR = 25;
const NUMBER_OF_ELEMENTS = 5;
const DEFAULT_SIZE = 10;
const DEFAULT_TRANSPARENCY_PERCENTAGE = 0;
const DEFAULT_SPEED = DEFAULT_SIZE * 2;

//Sliders
const sliders = {
  speed: createSlider(0, 50, DEFAULT_SPEED),
  transparency: createSlider(0, 100, DEFAULT_TRANSPARENCY_PERCENTAGE),
  size: createSlider(0, 50, DEFAULT_SIZE),
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
  for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
    walkers.push(new Walker());
  }

  //Reset button
  createResetButton();
}

function draw() {
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
    this.x = width / 2;
    this.y = height / 2;
  }

  //Walking method
  walk() {
    this.x += random(-sliders.speed.value(), sliders.speed.value());
    this.y += random(-sliders.speed.value(), sliders.speed.value());

    //Check bounds for x
    if (this.x > width || this.x < 0) {
      this.x = width / 2;
    }

    //Check bounds for y
    if (this.y > height || this.y < 0) {
      this.y = height / 2;
    }
  }

  //Display Method
  display() {
    fill(
      map(this.x, 0, width, 0, 255),
      0,
      map(this.y, 0, height, 0, 255),
      map(sliders.transparency.value(), 0, 100, 255, 0)
    );
    ellipse(this.x, this.y, sliders.size.value(), sliders.size.value());
  }
}
