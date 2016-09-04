window.onload=function(){
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    $("#helper").addClass('hidden');

    reader.onload = function (e) {
    $('#theimage')
      .attr('src', e.target.result)
      .show()
    };

    reader.readAsDataURL(input.files[0]);

    $("#imagerow").removeClass('hidden');
    $("#searchrow").removeClass('hidden');

    var Filename = document.getElementById("uploadBtn").value.split('/').pop().split('\\').pop();

    // document.getElementById("uploadFile").value = Filename;
    $("#uploadFile").text(Filename);
    $("#theimage").prop("alt", Filename);
  }
}

// get filename
// document.getElementById("uploadBtn").onchange = function () {
//   document.getElementById("uploadFile").value = this.value;
// };

//resize
function resize() {
  $(canvas).prop('width', 100)
  $(canvas).prop('height', 100)
}

$( ".doubleclick" ).dblclick(function() {
  // alert( "Handler for .dblclick() called." );
  $( "#uploadBtn" ).trigger( "click" );
});

$('.doubletap').doubletap(function(e) {
  $( "#uploadBtn" ).trigger( "click" );
});
