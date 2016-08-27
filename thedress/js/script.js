var canvas;
var ctx;

var images = ['thedress.jpg'];
var iActiveImage = 0;

$(function(){

    // drawing active image
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }
    image.src = images[iActiveImage];

    // creating canvas object
    canvas = document.getElementById('panel');
    ctx = canvas.getContext('2d');



    $('#panel').mousemove(function(e) { // mouse move handler
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);

        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;

        var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
        $('body').css('backgroundColor', pixelColor);

        changeBackground( '#' + dColor.toString(16) );
    });

    $('#panel').click(function(e) { // mouse click handler
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);

        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;

        $('#rVal').val(pixel[0]);
        $('#gVal').val(pixel[1]);
        $('#bVal').val(pixel[2]);

        $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);
        $('#rgbaVal').val(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3]);
        var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
        $('#hexVal').val( '#' + dColor.toString(16) );
    });





    // Set up touch events for mobile, etc
    canvas.addEventListener("touchstart", function (e) {
            mousePos = getTouchPos(canvas, e);
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchend", function (e) {
      var mouseEvent = new MouseEvent("mouseup", {});
      canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchmove", function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);

    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchend", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);




    $('#swImage').click(function(e) { // switching images
        iActiveImage++;
        if (iActiveImage >= 10) iActiveImage = 0;
        image.src = images[iActiveImage];
    });
});
