object=[];
video="";
status1="";
function preload()
{
    video=createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function draw()
{
    image(video,0,0,480,380);
    if(status1 != "")
    {
        objectDetector.detect(video,gotResults);
        for(var i=0; i<object.length; i++)
        {
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are-"+object.length;
            document.getElementById("status").innerHTML="Status-Objects Detected";

            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(10);
}