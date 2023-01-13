var qtree;
var region;
var result;
var slider;
var canvas;
var button_query;
var button_nn;
var mode = true;
var point = undefined;

/** Creates canvas */
function setup() {
  canvas = createCanvas(600, 600);
  var canvas_x = (windowWidth - width) / 2;
  var canvas_y = (windowHeight - height) / 4;
  canvas.position(canvas_x, canvas_y);
  slider = createSlider(0, width / 2, REGION_DIAMETER);
  button_query = createButton('Query');
  button_query.mousePressed(makeQuery);
  button_nn = createButton('Nearest Neighbor');
  button_nn.mousePressed(makeNearestNeighbor);
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
  qtree.show();
  if (region && mode) {
    region = new Circle(region.x, region.y, slider.value(), slider.value());
    region.show();
    result = qtree.query(region);
    for (let p of result) {
      stroke('rgb(0,255,0)');
      fill('rgb(0,255,0)');
      ellipse(p.x, p.y, POINT_DIAMETER);
    }
    stroke(0);
  } else if (typeof (point) == 'object' && !mode) {
    stroke('rgb(255,0,0)');
    fill('rgb(255,0,0)');
    ellipse(point.x, point.y, POINT_DIAMETER * 2);
    var p = nearestNeighbor(qtree, point);
    stroke('rgb(0,255,0)');
    fill('rgb(0,255,0)');
    ellipse(p.x, p.y, POINT_DIAMETER * 2);
  }

  stroke(0);
  noFill();
  drawBorder();
}

function drawBorder() {
  fill(0);
  rect(0, 0, width, 2);
  rect(0, 0, 2, height);
  rect(0, height - 2, width, 2);
  rect(width - 2, 0, 2, height);
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height && mode) {
    region = new Circle(mouseX, mouseY, slider.value(), slider.value());
  } else if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height && !mode) {
    point = new Point(mouseX, mouseY);
  }
}

function makeQuery() {
  mode = true;
}

function makeNearestNeighbor() {
  mode = false;
}

function nearestNeighbor(qt, p) {
  console.log(p);
  let test = [];
  let i = 1;
  var d;
  var min_d;
  var closest;
  while (test.length == 0) {
    console.log(test);
    test = qt.query(new Circle(p.x, p.y, i * NN_SEARCH_REGION, i * NN_SEARCH_REGION));
    i++;
  }
  for (let t of test) {
    d = Math.pow(p.x - t.x, 2) + Math.pow(p.y - t.y, 2);
    if (min_d) {
      if (d < min_d) {
        min_d = d; closest = t;
      }
    } else { min_d = d; closest = t; }
  }
  return closest;
}