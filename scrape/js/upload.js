window.onload=function(){
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

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

// document.getElementById("uploadBtn").onchange = function () {
//   document.getElementById("uploadFile").value = this.value;
// };

$( ".doubleclick" ).dblclick(function() {
  // alert( "Handler for .dblclick() called." );
  $( "#uploadBtn" ).trigger( "click" );
});
