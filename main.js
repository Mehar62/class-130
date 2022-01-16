song = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
leftWristX = 0;
leftWristy = 0;
rightWristX = 0;
rightWristy = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("posenet has started");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristy);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristy);
    }
}





function draw() {
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristy, 20);

        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightWristy > 400 && rightWristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }

        circle(leftWristX, leftWristy, 20);

        if (leftWristy > 0 && leftWristy <= 100) {
            document.getElementById("volume").innerHTML = "Volume = 0.5";
            song.setVolume(0.5);
        } else if (leftWristy > 100 && leftWristy <= 200) {
            document.getElementById("volume").innerHTML = "Volume = 1";
            song.setVolume(1);
        } else if (leftWristy > 200 && leftWristy <= 300) {
            document.getElementById("volume").innerHTML = "Volume = 1.5";
            song.setVolume(1.5);
        } else if (leftWristy > 300 && leftWristy <= 400) {
            document.getElementById("volume").innerHTML = "Volume = 2";
            song.setVolume(2);
        } else if (leftWristy > 400 && leftWristy <= 500) {
            document.getElementById("volume").innerHTML = "Volume = 2.5";
            song.setVolume(2.5);
        }

        if (scoreLeftWrist > 0.2) {
            circle(leftWristX, leftWristy, 20);
            InNumberleftWristY = Number(leftWristy);
            remove_decimals = floor(InNumberleftWristY);
            volume = remove_decimals / 500;
            document.getElementById("volume").innerHTML = "Volume = " + volume;
            song.setVolume(volume);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}