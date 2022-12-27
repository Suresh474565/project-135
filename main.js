
object_detector="";
status="";
objects=[];





function setup()
{

canvas=createCanvas(600,600);
canvas.center();
video=createCapture(VIDEO);
video.size(600);
video.hide();


}

function start()
{

object_detector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status- DETECTING OBJECTS"
obj_name=document.getElementById("obj_input").value;

}

function modelLoaded()
{

console.log("model has been loaded");
status=true;

}

function gotResults(results,error)
{
if(error)
{

console.error(error);

}

console.log(results);
objects=results;



}

function draw()
{

image(video,0,0,600,600);

if(status!="")
{



for(i=0; i<objects.length;i++)
{

document.getElementById("status").innerHTML="STATUS - OBJECTS DETECTED";


fill("#FF0000");


percent= floor(objects[i].confidence *100);
text(objects[i].label +" "+ percent + "%",objects[i].x+15,objects[i].y+15);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    if(objects[i].label == obj_name){
        video.stop();
        object_Detector.detect(gotResults);
        document.getElementById("object_status").innerHTML = obj_name+" Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(obj_name + "Found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("object_status").innerHTML = obj_name + " Not Found";
    }
}
}
}


