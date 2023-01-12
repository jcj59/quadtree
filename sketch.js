var qtree;

/** Creates canvas */
function setup() {
  var canvas = createCanvas(600, 600);
  var canvas_x = (windowWidth - width) / 2;
  var canvas_y = (windowHeight - height) / 4;
  canvas.position(canvas_x, canvas_y);
  qtree = new Quadtree(4, new Rectangle(0, 0, width, height));
  for (let i = 0; i < NUMBER_OF_POINTS; i++) {
    qtree.insert(new Point(random(width), random(height)))
  }
}

function windowResized() {
  var canvas_x = (windowWidth - width) / 2;
  var canvas_y = (windowHeight - height) / 4;
  canvas.position(canvas_x, canvas_y);
}

function draw() {
  background(255);
  drawBorder();
  qtree.show();
}

function drawBorder() {
  fill(0);
  rect(0, 0, width, 2);
  rect(0, 0, 2, height);
  rect(0, height - 2, width, 2);
  rect(width - 2, 0, 2, height);
}
