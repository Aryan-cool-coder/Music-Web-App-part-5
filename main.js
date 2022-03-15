song1 = '';
song2 = '';
LY = '0';
LX = '0';
RY = '0';
RX = '0';
scoreL = '0';
scoreR = '0';
songStatus1 = '';
songStatus2 = '';

function preload() {
    song1 = loadSound('music.mp3');
    song2 = loadSound('music1.mp3');
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
image(video, 0, 0, 600, 500);
fill('magenta');
stroke('red');
songStatus1 = song1.isPlaying() ;
songStatus2 = song2.isPlaying();
if (scoreL > 0.2) {
    circle(LX, LY, 20);
    song1.stop();
    if(songStatus1 == false) {
        song2.play();
        document.getElementById("song").innerHTML = "Peter Pan";
    }
}
if (scoreR > 0.2) {
    circle(RX, RY, 20);
    song2.stop();
    if(songStatus1 == false) {
        song1.play();
        document.getElementById("song").innerHTML = "Harry Potter";
    }
}
}

function modelLoaded() {
    console.log('Pose net is initialized') ;
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreL = results[0].pose.keypoints[9].score;
        scoreR = results[0].pose.keypoints[10].score;
        console.log("score Right Wrist - " + scoreR);
        LX = results[0].pose.leftWrist.x;
        LY = results[0].pose.leftWrist.y;
        RX = results[0].pose.rightWrist.x;
        RY = results[0].pose.rightWrist.y;
        console.log("score left wrist =  " + scoreL);
        
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}