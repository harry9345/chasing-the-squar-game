let $ = document;

let circle = $.getElementById("movingCircle");
let controler = $.getElementById("controler");
let gameFloor = $.getElementById("gameFloor");

let deltaX = 0;
let deltaY = 0;
let keys = [];
let loc;
let locTop;
let locLeft;

controler.insertAdjacentHTML(
  "afterbegin",
  `
    <div class="row">
         <button type="button" class="btn btn-outline-warning" onclick="topArrow()" >Up</button>
    </div>
    <div class="row justify-content-start">
         <div class="col-6"> 
            <button type="button" class="btn btn-outline-warning" onclick="leftArrow()" >Left</button>
         </div>
        <div class="col-8">
           <button type="button" class="btn btn-outline-warning" onclick="rightArrow()" >Right</button>
        </div>
    </div>
    <div class="row">
         <button type="button" class="btn btn-outline-warning" onclick="downArrow()" >Down</button>
    </div>
`
);

// --------  the Moving target----

let inter = setInterval(movingCircle, 1000);
function movingCircle() {
  circle.style.top = Math.floor(Math.random() * gameFloorHeight) + "px";
  circle.style.left = Math.floor(Math.random() * gameFloorWidth) + "px";
}

// ---- finding the exact location of target in every 100 ms-----
setInterval(() => {
  loc = circle.getBoundingClientRect();
  locTop = Math.floor(loc.top);
  locLeft = Math.floor(loc.right);
}, 100);

//----- calculating the conflict -------
function checklocation(movingY, movingX) {
  if (
    (movingX - locLeft < 10 && movingX - locLeft > 0) ||
    (movingY - locTop < 10 && movingY - locTop > 0)
  ) {
    clearInterval(inter);
    circle.style.left = movingX;
    circle.style.top = movingY;
  }
}
// --------- drawing the vehicle -------

let canvas = $.getElementById("hitingBall");
let context = canvas.getContext("2d");

window.addEventListener("keydown", keyPress);
window.addEventListener("keyup", keysReleased);

let gameFloorWidth = gameFloor.clientWidth;
let gameFloorHeight = gameFloor.clientHeight;

canvas.width = gameFloorWidth;
canvas.height = gameFloorHeight;

function drawVehicle() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();

  if (deltaX < 0) {
    deltaX = 0;
  }

  if (deltaY < 0) {
    deltaY = 0;
  }
  checklocation(deltaY, deltaX);

  context.fillRect(deltaX, deltaY, 20, 20);

  context.lineWidth = 3;
  context.strokeStyle = "rgba(255, 204, 0, 1)";
  context.stroke();

  context.fillStyle = "rgba(255, 204, 0, 1)";
  context.fill();
}
drawVehicle();

// ---- moving vehicle ------

function keyPress(e) {
  keys[e.keyCode] = true;

  if (keys[37]) {
    leftArrow();
  }
  if (keys[39]) {
    rightArrow();
  }
  if (keys[38]) {
    topArrow();
  }
  if (keys[40]) {
    downArrow();
  }

  e.preventDefault();
  drawVehicle();
}

function keysReleased(e) {
  keys[e.keyCode] = false;
}

function topArrow() {
  deltaY -= 10;
  drawVehicle();
}
function leftArrow() {
  deltaX -= 10;
  drawVehicle();
}
function rightArrow() {
  deltaX += 10;
  drawVehicle();
}
function downArrow() {
  deltaY += 10;
  drawVehicle();
}
