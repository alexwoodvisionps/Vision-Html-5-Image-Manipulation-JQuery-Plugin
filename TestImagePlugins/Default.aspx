<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="TestImagePlugins.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

   <script type="text/javascript" src="/Scripts/jquery-1.7.2.min.js"></script>
   <script src="/Scripts/pixastic.custom.js" type="text/javascript"></script>
   <script src="/Scripts/jQueryRotate.2.2.js" type="text/javascript"></script>
     <script type="text/javascript" src="/Scripts/jquery.vision.imaging.js"></script>
    <script type="text/javascript">
        //var image = new Image();
        function FlipImage(imgTag, direction) {
            
            $('#imgVader2').flip({ imgTagId: imgTag, directionToFlip: direction });
           
            return false;
        }
        
        function RemoveRedEye(imgTagName,x,y,width,height) {
            $('#imgVader2').removeredeye({ imgTagId: imgTagName, x: x, y: y, width: width, height: height });
        }
        function RotateImage(imageTagName, degrees) {
           
            $('#imgB').rotateInDegrees({ imgTagId: imageTagName, degreesToRotate: degrees });
        }
        function MakeSepia() {
            $('#imgVader2').makesepia();
        }
        function Crop(imgTagId, cx,cy,cwidth,cheight) {
            $('#imgVader2').crop({ imgTagId: imgTagId, x: cx, y: cy, width: cwidth, height: cheight });
        }
        function MakeGreyscaleImage(imageTagId, httpImageType) {
            var img = document.getElementById(imageTagId);
            //what you call it on is abitrary
            $('<div></div>').makeblackandwhite({ imgTagId: imageTagId, x: 0,y:0, width: img.width, height: img.height, imageHttpType: httpImageType });
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
<div >
    <div id="imgContainer">
    <img id="imgB" onclick="RotateImage('imgB', 30);" src="/images/beach.jpg" alt="beach"/>
    </div>
   

</div>

 <img src="/images/darth-vader.jpg" alt="vader" id="imgVader2"/>
<img src="/images/bright_yellow_star.png" alt="yellow star" id="SepiaImg"/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<input type="button" id="btn1" onclick="MakeGreyscaleImage('imgB','image/png');return false;" value="black and white" />
<input type="button" id="btn2" onclick="RemoveRedEye('imgB',0,0,100,100);return false;" value="Remove Red Eye"/>
<input type="button" id="btn3" onclick="MakeSepia('imgStar','image/jpeg' ); return false;" value="sepia star"/>
<input type="button" id="btn4" onclick="Crop('imgVader2',0,0,300,300);return false;" value="Crop Vader"/>
<input type="button" id="btn5" onclick="FlipImage('imgVader2','flipv');return false;" value="Flip Vader"/>
    </div>
    </form>
     
</body>
</html>
