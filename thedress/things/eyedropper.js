var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var eyedropperIsActive = false;

drawTestColors(20, 20, "red");
drawTestColors(100, 20, "green");
drawTestColors(180, 20, "blue");

function drawTestColors(x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, 50, 50);
    ctx.fill();
}


function getPixelColor(x, y) {
    var pxData = ctx.getImageData(x, y, 1, 1);
    return ("rgb(" + pxData.data[0] + "," + pxData.data[1] + "," + pxData.data[2] + ")");
}


function handleMouseMove(e) {

    if (!eyedropperIsActive) {
        return;
    }

    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var eyedropColor = getPixelColor(mouseX, mouseY);
    $("#results").css("backgroundColor", getPixelColor(mouseX, mouseY));

}

$("#canvas").click(function (e) {
    eyedropperIsActive = false;
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#startDropper").click(function (e) {
    eyedropperIsActive = true;
});