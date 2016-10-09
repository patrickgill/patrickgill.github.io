$(function() {

    //Console logging (html)
    if (!window.console)
        console = {};

    var console_out = document.getElementById("console_out");
    var output_format = "jpg";

    console.log = function(message) {
        console_out.innerHTML += message + "<br />";
        console_out.scrollTop = console_out.scrollHeight;
    }

    //Slider init
    $("#slider-range-min").slider({
        range: "min",
        value: 30,
        min: 1,
        max: 100,
        slide: function(event, ui) {
            // $("#jpeg_encode_quality").val(ui.value);
            $("#jpeg_encode_quality").html(ui.value+"%");

            var compressJpegDebounced = debounce(compressJpeg, 100);
            compressJpegDebounced();
        },

        stop: function( event, ui ) {
            // $("#jpeg_encode_quality").val(ui.value);
            compressJpeg();
        }
    });
    $("#jpeg_encode_quality").val($("#slider-range-min").slider("value"));

    /** DRAG AND DROP STUFF WITH FILE API **/
    var holder = document.getElementById("holder");

    holder.ondragover = function() {
        this.className = "is_hover";
        return false;
    };
    holder.ondragend = function() {
        this.className = "";
        return false;
    };
    holder.ondrop = function(e) {
        this.className = "";
        e.preventDefault();

        document.getElementById("holder_helper").removeChild(document.getElementById("holder_helper_title"));

        var file = e.dataTransfer.files[0],
        reader = new FileReader();
        reader.onload = function(event) {
            var i = document.getElementById("source_image");
              i.src = event.target.result;
              i.onload = function(){
                image_width=$(i).width(),
                  image_height=$(i).height();

                  if(image_width > image_height){
                    // i.style.width="640px";
                    // i.style.width="64px";
                  }else{
                    // i.style.height="640px";
                  }
                  i.style.display = "block";
                  console.log("Image loaded");

                  compressJpeg();
              }

        };

        // if(file.type=="image/png"){
        //     output_format = "png";
        // }

        console.log("Filename:" + file.name);
        console.log("Filesize:" + (parseInt(file.size) / 1024) + " Kb");
        console.log("Type:" + file.type);

        reader.readAsDataURL(file);

        return false;
    };

    var encodeButton = document.getElementById("jpeg_encode_button");
    var encodeQuality = document.getElementById("jpeg_encode_quality");
    var uploadButton = document.getElementById("image_upload_button");

    //HANDLE COMPRESS BUTTON
    // encodeButton.addEventListener('click', function(e) {
    //     compressJpeg();
    // }, false);

    // encodeButton.addEventListener('click', function(e) {
    //     compressJpeg();
    // }, false);

    //HANDLE UPLOAD BUTTON
    // uploadButton.addEventListener('click', function(e) {
    //   uploadImage();
    // }, false);

    //HANDLE UPLOAD BUTTON
    // var uploadButton = document.getElementById("jpeg_upload_button");
    // uploadButton.addEventListener('click', function(e) {
    //     var result_image = document.getElementById('result_image');
    //     if (result_image.src == "") {
    //         alert("You must load an image and compress it first!");
    //         return false;
    //     }
    //     var callback= function(response){
    //       console.log("image uploaded successfully! :)");
    //       console.log(response);
    //     }

    //     jic.upload(result_image, 'upload.php', 'file', 'new.'+output_format,callback);


    // }, false);

/*** END OF DRAG & DROP STUFF WITH FILE API **/


  function compressJpeg() {
    var encodeQuality = document.getElementById("jpeg_encode_quality");
    var source_image = document.getElementById("source_image");
    var result_image = document.getElementById("result_image");
    if (source_image.src == "") {
        // alert("You must load an image first!");
        return false;
    }

    var quality = parseInt(encodeQuality.value);
    console.log("Quality >>" + quality);

    console.log("process start...");
    var time_start = new Date().getTime();

    result_image.src = jic.compress(source_image,quality,output_format).src;

    result_image.onload = function(){
      var image_width=$(result_image).width(),
        image_height=$(result_image).height();

      if(image_width > image_height){
        // result_image.style.width="640px";
      }else{
        // result_image.style.height="640px";
      }
     result_image.style.display = "block";

    }
    var duration = new Date().getTime() - time_start;




    console.log("process finished...");
    console.log("Processed in: " + duration + "ms");
  }

});

  function readURL(input) {

      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $("#source_image").attr("src", e.target.result);
          }

          reader.readAsDataURL(input.files[0]);
      }
  }

$("#source_image").change(function(){
    readURL(this);
});

  function uploadImage() {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

      reader.onload = function (e) {
      $("#source_image")
        .attr("src", e.target.result)
        .show()
      };
    }
  };

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

