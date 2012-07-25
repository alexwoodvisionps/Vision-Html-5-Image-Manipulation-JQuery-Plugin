


/*
    Copyright - Vision Integrated Graphics LLC 2012
    Author: Alexander Andrew Wood
    Date: 7/24/2012 - 8:08pm
    About The Author:
    The author has an IQ of 161 and a master's degree from Depaul University.
    He is the owner of Wooden Soft and Wooden Software Development Inc (woodensoft.com)
    And Senior Software Developer at Vision Integrated Graphics. (visionps.com)
    Dedicated to:
    My mom: Anastasia
    My kids: Whose moms took them from me because they hated me. 
    My future wife: Where ever you are.
    My friend Santosh.
    My co-workers - Bill Carver, Matt Ruggio and John Herrera for being crazy enough to believe in me.
    Thank you all.
    License: A commercial license is available at $100.00.
    Educational License: One website no profit/ research only.
    All headings and licence and copy rigth information must be present to use this plugin.
    Vision Integrated Graphics - All Rights Reserved.
*/


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
////flipv and fliph are the only two directions
////read flip documents to find all possibilities
//function FlipImage(imageTagId, directionToFlip) {
//    var img = document.getElementById(imageTagId);
//    Pixastic.process(img, directionToFlip);


//}


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
        var G = pixel[i + 1];
        var B = pixel[i + 2];
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


function MakeSepiaCanvas(canvas, x, y, width, height, imageHttpType) {
    //var canvas = document.getElementById(canvasId);
    if (!supportsToDataURL())
        alert('browser not supported');
    var context = canvas.getContext("2d");

    var imgd = context.getImageData(x, y, width, height);

    var pixel = imgd.data;

    for (var i = 0, n = pixel.length; i < n; i += 4) {
        var R = pixel[i];
        var G = pixel[i + 1];
        var B = pixel[i + 2];
        pixel[i] = R * 0.393 + G * 0.769 + B * 0.189;
        pixel[i + 1] = R * 0.349 + G * 0.686 + B * 0.168;
        pixel[i + 2] = R * .272 + G * 0.534 + B * 0.131;
        // alpha
    }

    context.putImageData(imgd, 0, 0);

    var dataUrl = canvas.toDataURL("image/png");

    return dataUrl;
}


(function ($) {

    $.fn.rotateInDegrees = function(options) {
        var defaults = {
            imgTagId: 'RotateImg',
            degreesToRotate: 90 
        },
        settings = $.extend({ }, defaults, options);
        this.each(function() {
            
            $('#'+settings.imgTagId).rotate(settings.degreesToRotate);
        });
    };

    $.fn.flip = function(options) {
        var defaults = {
            imgTagId: 'FlipImg',
            directionToFlip: 'flipv' //fliph flips horizontally
        },
        settings = $.extend({ }, defaults, options);
        this.each(function() {
            var img = document.getElementById(settings.imgTagId);
            Pixastic.process(img, settings.directionToFlip);
        });
    };

    $.fn.makeblackandwhite = function(options) {
        var defaults = {
            imgTagId: 'RedEyeImg',
            x: 0,
            y: 0,
            width: 500,
            height: 500,
            imageHttpType: "image/png"
        },
        settings = $.extend({ }, defaults, options);
        this.each(function() {
            var img = document.getElementById(settings.imgTagId);

            var canvas = convertImageToCanvas(img);

            var imgUrl = MakeBlackAndWhiteCanvas(canvas, settings.x, settings.y, settings.width, settings.height, settings.imageHttpType);

            img.src = imgUrl;
        });
    };
    $.fn.removeredeye = function(options) {
       // function RemoveRedEye(imageTagId, x, y, width, height, imageHttpType) {
     var 
		  defaults = {
		      imgTagId: 'RedEyeImg',
		      x: 0,
		      y: 0,
		      width: 500,
		      height: 500,
		      imageHttpType: "image/png"
		  },
		settings = $.extend({}, defaults, options);
        this.each(function() {
            var img = document.getElementById(settings.imgTagId);

            var canvas = convertImageToCanvas(img);
            var imgUrl = RemoveRedEyeCanvas(canvas, settings.x, settings.y, settings.width, settings.height, settings.imageHttpType);

            img.src = imgUrl;
        });

    };

    $.fn.makesepia = function(options) {
         var 
		  defaults = {
		      imgTagId: 'SepiaImg',
		      x: 0,
		      y: 0,
		      width: 500,
		      height: 500,
		      imageHttpType: "image/png"
		  },
		  settings = $.extend({}, defaults, options);

        this.each(function() {
            var img = document.getElementById(settings.imgTagId);

            var canvas = convertImageToCanvas(img);
            var imgUrl = MakeSepiaCanvas(canvas, settings.x, settings.y, settings.width, settings.height, settings.imageHttpType);

            img.src = imgUrl;
        });
    };
    $.fn.crop = function (options) {

        var 
		  defaults = {
		      imgTagId: 'CropImg',
		      x: 0,
		      y: 0,
		      width: 500,
		      height: 500
		  },
		  settings = $.extend({}, defaults, options);

        this.each(function () {
            //Cropping requires Pixastic Jquery plugin that does the cropping and JCrop that does 
//the animation event handlers must be in the code from the source index.html/aspx/jsp page 
//        c.x = upper left x coordinate
//        c.y = upper left y coordinate
//        c.x2 = lower right x coordinate
//        c.y2 = lower right y coordinate
//        c.w = width in 1X1 pixels
//        c.h = height in 1X1 pixels
            //Crop with no event handling
            var img = document.getElementById(settings.imgTagId);
            Pixastic.process(img, "crop", {
                rect: {
                    left: settings.x, top: settings.y, width: settings.width, height: settings.height
                }
            });

            
        });
        // returns the jQuery object to allow for chainability.
        return this;
    };
})(jQuery);
