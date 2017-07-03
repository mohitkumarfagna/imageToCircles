var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.height = canvas.width*(img.height / img.width);
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
// This piece of code is taken from jsfiddle http://jsfiddle.net/influenztial/qy7h5/ and further edited to resize uploaded image to canvas size.