Status = "";
object = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("btn-1").innerHTML = "STATUS: DETECTING OBJECTS";
    object_name = document.getElementById("text_1").value;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            fill(r, g, b);
            document.getElementById("btn-2").innerHTML = "NUMBER OF OBJECTS DETECTED ARE:" + object.lenght;
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + " " + percentage + "%", object[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object_name == object[i].label) {
                console.log("found");
                video.stop();
                document.getElementById("btn-1").innerHTML = "STATUS: OBJECT FOUND";
                synth = video.speechSynthesis;
                speakthis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(speakthis);
            }
            else{
                document.getElementById("btn-1").innerHTML = "STATUS: OBJECT NOT FOUND";
            }
        }

    }

}

function modelLoaded() {
    console.log("modelloaded successfully");
    Status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}