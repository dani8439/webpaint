var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
let color = "#000";
let brushthickness = 7;
document.querySelector(".color-btn div").style.backgroundColor = color;

const erase = () => (ctx.globalCompositeOperation = "destination-out");

/* Toggle Brush Size Dropdown */
function sizeList() {
    document.querySelector(".size-list").classList.toggle("show-list");
}

/* Set Brush Size */
function brushSize() {
    var brushSet = document.getElementsByClassName("size");
    Array.prototype.forEach.call(brushSet, function(element) {
        element.addEventListener("click", function() {
            brushthickness = element.getAttribute("style").substr(11, 2);
        });
    });
}

/* Set Color */

function setActiveColor() {
    document.querySelector(".color-btn div").style.backgroundColor = color
    ctx.strokeStyle = color;
    ctx.globalCompositeOperation = "source-over";
}

function setColor() {
    var palette = document.getElementsByClassName("color");
    Array.prototype.forEach.call(palette, function(element) {
        element.addEventListener("click", function() {
            color = element.getAttribute("style").split("--set-color:")[1];
            setActiveColor();
        });
    });
}

function colorPick(){
    color = document.getElementById("color-picker").value;
    setActiveColor();
}

/* Draw */

function draw(e) {
    if (e.buttons !==1) return; // if the mouse is not clicked, don't go further 

    ctx.beginPath(); // begin the drawing path 
    ctx.lineWidth = brushthickness; // width of the line 
    ctx.linecap = "rount"; // rounded end cap 
    ctx.strokeStyle = color; // hex color of the line 
    ctx.moveTo(pos.x, pos.y); // from position 
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to position 
    ctx.closePath();
    ctx.stroke(); // draw it. 😃
}

//*************************************************************************************************
//******************************************* RESIZE CANVAS ***************************************
//*************************************************************************************************

function resize() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

resize();

//*************************************************************************************************
//************************************** DOWNLOAD CANVAS ******************************************
//*************************************************************************************************

function onSave() {
  const link = document.createElement('a');
  link.download = 'sketch.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

//*************************************************************************************************
//***************************************** EVENT LISTENERS ***************************************
//*************************************************************************************************

// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);