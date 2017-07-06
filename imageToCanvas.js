var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            var cw = 1000,
                ch = 600,
                ih = img.height,
                iw = img.width;

            if ((iw <= cw) && (ih <= ch)) {
                console.log('ye1');
                canvas.width = iw;
                canvas.height = ih;
            } else if ((iw <= cw) && (ih > ch)) {
                console.log('ye2');
                canvas.height = ch;
                canvas.width = ch * (iw / ih);
            } else if ((iw > cw) && (ih <= ch)) {
                console.log('ye3');
                canvas.width = cw;
                canvas.height = cw * (ih / iw);
            } else if ((iw > cw) && (ih > ch)) {
                console.log('ye4');
                canvas.width = cw;
                canvas.height = cw * (ih / iw);

                if (canvas.height > ch) {
                    canvas.height = ch;
                    canvas.width = ch * (iw / ih);
                }
            }
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}
// A part of this code is taken from jsfiddle http://jsfiddle.net/influenztial/qy7h5/ and further edited to automate the size of the canvas and uploaded image.



var colorPick = function () {

    var backCanvas = document.createElement('canvas');
    backCanvas.width = canvas.width;
    backCanvas.height = canvas.height;
    var backCtx = backCanvas.getContext('2d');

    for (var x = 5; x < canvas.width; x += 10) {

        for (var y = 5; y < canvas.height; y += 10) {
            var cpick = ctx.getImageData(x, y, 1, 1).data;
            var r = cpick[0];
            var g = cpick[1];
            var b = cpick[2];
            backCtx.beginPath();
            backCtx.arc(x, y, 5, 0, 2 * Math.PI);
            colorpicked = "rgb(" + r + "," + g + "," + b + ")";
            backCtx.fillStyle = colorpicked;
            console.log(colorpicked);
            backCtx.fill();
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backCanvas, 0, 0);
};
