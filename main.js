status = "";
od = [];
song = "";

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    objectetector = ml5.objectDetector('cocossd', modelloaded);
}

function draw() {
    image(video, 0, 0, 300, 300);

    if (document.getElementById("s") != "") {
        document.getElementById("s").style.backgroundColor = "red";
        document.getElementById("s").style.border = "7px orange inset";
    }

    if (status != "") {
        objectetector.detect(video, gotresults);
        for (i = 0; i < od.length; i++) {
            if (od[i] == "person" || od[i] == "Person") {
                song.stop();
                document.getElementById("s").innerHTML = "baby is detected";
            } else {
                song.play();
                song.volume(1);
                song.rate(1);
                document.getElementById("s").innerHTML = "baby is not detected";
            }
        }
    }
}

function modelloaded() {
    console.log("modelloaded");
    status = true;
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        od = results;
    }
}