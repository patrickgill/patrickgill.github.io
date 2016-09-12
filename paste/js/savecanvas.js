/**
 *    Ken Fyrstenberg Nilsen
 *    Abidas Software
*/
var canvas = document.getElementById('thecanvas'),
    ctx = canvas.getContext('2d');

/**
 * This is the function that will take care of image extracting and
 * setting proper filename for the download.
 * IMPORTANT: Call it from within a onclick event.
*/
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

/** 
 * The event handler for the link's onclick event. We give THIS as a
 * parameter (=the link element), ID of the canvas and a filename.
*/
document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'thecanvas', 'pastedimage.png');
}, false);
