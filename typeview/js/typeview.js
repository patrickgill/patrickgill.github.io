window.onload=function(){
  var input = document.querySelector('#textinput');
  var textoutput = document.querySelector('#textoutput');

  input.addEventListener('input', function() {
      // textContent
      textoutput.innerText = input.value;
      setcanvas(input.value);
  });
}//]]>

function newfont() {
  var fonturl = document.querySelector('#fonturl').value;

  var f = new FontFace("dynamicfont", "url("+fonturl+")", {});
  f.load().then(function (loadedFace) {
    document.fonts.add(loadedFace);
    document.getElementById("textoutput").style.fontFamily = "dynamicfont";
  });
  // alert (fonturl);
}

function setcanvas(thetext) {
  var canvas = document.getElementById('textcanvas');
  var context = canvas.getContext('2d');
  var size = document.getElementById("textoutput").style.fontSize;

  context.clearRect(0, 0, canvas.width, canvas.height); // clear
  context.font = size+' '+'dynamicfont';//'dynamicfont';
  context.fillText(thetext, 20, 40);
}

function resizeText(fontvar) {
  var element = document.getElementById("textoutput");
  var size = element.style.fontSize.replace("px", "");
  var textsize = document.getElementById("textoutput").style.fontSize;

    // alert ("size: "+textsize);
    element.style.fontSize = parseInt(size) + parseInt(fontvar) + "px";
}
