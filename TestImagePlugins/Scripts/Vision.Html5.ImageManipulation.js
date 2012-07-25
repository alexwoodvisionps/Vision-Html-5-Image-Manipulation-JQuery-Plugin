function supportsToDataURL() {
    var c = document.createElement("canvas");
    var data = c.toDataURL("image/png");
    return (data.indexOf("data:image/png") == 0);
}
function MakeBlackAndWhiteCanvas(canvas, x, y, width, height, imageHttpType) {
    //var canvas = document.getElementById(canvasId);
    if (!supportsToDataURL())
        alert('browser not supported');
    var context = canvas.getContext("2d");
    
    var imgd = context.getImageData(x, y, width, height);
  
    var pix = imgd.data;
    
    for (var i = 0, n = pix.length; i < n; i += 4) {
        var grayscale = pix[i] * .3 + pix[i + 1] * .59 + pix[i + 2] * .11;
        pix[i] = grayscale;   // red
        pix[i + 1] = grayscale;   // green
        pix[i + 2] = grayscale;   // blue
        // alpha
    }
    
    context.putImageData(imgd, 0, 0);
 
    var dataUrl = canvas.toDataURL("image/png");

    return dataUrl;
}

//read jqueryRotate for more information
function RotateImage(imgRef, degreesToRotate) {
   
    $(imgRef).rotate(degreesToRotate);
  
}
//flipv and fliph are the only two directions
//read flip documents to find all possibilities
function FlipImage (imageTagId, directionToFlip) {
    var img = document.getElementById(imageTagId);
    Pixastic.process(img, directionToFlip);
    
    
}

function MakeGreyscaleImage(imageTagId, imageHttpType) {
    var img = document.getElementById(imageTagId);
   
    var canvas = convertImageToCanvas(img);

    var imgUrl = MakeBlackAndWhiteCanvas(canvas, 0, 0, img.width, img.height, imageHttpType);
    
    img.src = imgUrl;
}

// Converts canvas to an image
function convertCanvasToImage(canvas, imageHttpType) {
    alert(canvas.length);
    var image = new Image();
    alert(canvas.length);
    image.src = canvas.toDataURL(imageHttpType);

    return image;
}
// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
    var canvas = document.createElement("canvas");
 
    canvas.width = image.width;
    canvas.height = image.height;
    
    canvas.getContext("2d").drawImage(image, 0, 0);
    return canvas;
}
/*
imageData.data[0] - Value of red in decimal (integer between 0 and 255)
imageData.data[1] - value of green in decimal (integer between 0 and 255)
imageData.data[2] - Value of blue in decimal (integer between 0 and 255)
imageData.data[3] - Alpha value (integer between 0 and 255)
*/

function RemoveRedEyeCanvas(canvas, x, y, width, height, imageHttpType) {
    //var canvas = document.getElementById(canvasId);
    if (!supportsToDataURL())
        alert('browser not supported');
    var context = canvas.getContext("2d");

    var imgd = context.getImageData(x, y, width, height);

    var pixel = imgd.data;

    for (var i = 0, n = pixel.length; i < n; i += 4) {
        var R = pixel[i];
        var G = pixel[i +1];
        var B = pixel[i+2];
        //var alpha = pixel[3];

        var redIntensity = (R / ((B + G) / 2.0));

        if (redIntensity > 1.5) {
            pixel[i] = (G + B) / 2.0;
        }
        // alpha
    }

    context.putImageData(imgd, 0, 0);

    var dataUrl = canvas.toDataURL("image/png");

    return dataUrl;
}

function RemoveRedEye(imageTagId,x,y,width,height, imageHttpType) {
    var img = document.getElementById(imageTagId);

    var canvas = convertImageToCanvas(img);
    var imgUrl = RemoveRedEyeCanvas(canvas, x, y, width, height, imageHttpType);

    img.src = imgUrl;
   
}


function MakeSepiaCanvas(canvas, x, y, width, height, imageHttpType) {
    //var canvas = document.getElementById(canvasId);
    if (!supportsToDataURL())
        alert('browser not supported');
    var context = canvas.getContext("2d");

    var imgd = context.getImageData(x, y, width, height);

    var pixel = imgd.data;

    for (var i = 0, n = pixel.length; i < n; i += 4) {
        var R = pixel[i];
        var G = pixel[i+1];
        var B = pixel[i+2];
        pixel[i] = R * 0.393 + G * 0.769 + B * 0.189;
        pixel[i+1] = R * 0.349 + G * 0.686 + B * 0.168;
        pixel[i+2] = R * .272 + G * 0.534 + B * 0.131;
        // alpha
    }

    context.putImageData(imgd, 0, 0);

    var dataUrl = canvas.toDataURL("image/png");

    return dataUrl;
}

function MakeSepia(imageTagId, imageHttpType) {
    var img = document.getElementById(imageTagId);

    var canvas = convertImageToCanvas(img);
    var imgUrl = MakeSepiaCanvas(canvas, 0, 0, img.width, img.height, imageHttpType);

    img.src = imgUrl;
   
}

//Cropping requires Pixastic Jquery plugin that does the cropping and JCrop that does 
//the animation event handlers must be in the code from the source index.html/aspx/jsp page 
//        c.x = upper left x coordinate
//        c.y = upper left y coordinate
//        c.x2 = lower right x coordinate
//        c.y2 = lower right y coordinate
//        c.w = width in 1X1 pixels
//        c.h = height in 1X1 pixels

//Crop with no event handling
function Crop(imgTagId, x,y,width,height) {
    var img = document.getElementById(imgTagId);
    Pixastic.process(img, "crop", {
        rect: {
            left: x, top: y, width: width, height: height
        }
    });
    
}

var imgRefForJCrop;
var imgIdForJCrop;
var x, y, pxwidth, pxheight;



//When you are ready to crop call this:
function CropEventHandler() {
    $(imgRefForJCrop).pixastic("crop", {

        rect: {
            left: x, top: y, width: pxwidth, height: pxheight
        }
    });
    return imgRefForJCrop;
}

//set as the on select event handler to crop when the user finishes selecting
function jcropOnSelect(c) {
    x = c.x;
    y = c.y;
    pxwidth = c.w;
    pxheight = c.h;

}

//first call set up with a reference to the image ie the image's this (java script this not jquery)
function setUpJCropHandlers(imgRef) {
    imgRefForJCrop = imgRef;
    imgIdForJCrop = $(imgRef).attr("id");
}
