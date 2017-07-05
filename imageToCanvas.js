var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            var cw = 1000,
             ch = 600,
             ih = img.height,
             iw = img.width;
            
            if((iw <= cw) || (ih <= ch)){
                canvas.width = iw;
                canvas.height = ih;
               } else if((iw <= cw) || (ih > ch)){
                   canvas.height = ch;
                   canvas.width = ch*(iw/ih);
            } else if((iw > cw) || (ih <= ch)){
                   canvas.width = cw;
                   canvas.height = ch*(ih/iw);
            } else if((iw > cw) || (ih > ch)){
                   canvas.width = cw;
                   canvas.height = cw * (ih / iw);
                
                if(canvas.height > ch){
                    canvas.height = ch;
                    canvas.width = ch *(iw/ih);
                }
            };
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
};
// A part of this code is taken from jsfiddle http://jsfiddle.net/influenztial/qy7h5/ and further edited to automate the size of the canvas and uploaded image.

