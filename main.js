song_1 = "";
song_2 = "";
song_3 = "";
song_4 = "";
song_5 = "";

song_1_status = "";
song_3_status = "";
song_3_status = "";
song_4_status = "";
song_5_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = "";
rightWristY = "";

function preload()
{
    song_1 = loadsound("AnneMarie-2002.mp3");
    song_2 = loadsound("Lukas-Graham-7-Years.mp3");
    song_3 = loadsound("Memories Mp3 By and Maroon 5.mp3");
    song_4 = loadsound("Imagine+Dragons+Thunder.mp3");
    song_5 = loadsound("Sunflower Mp3 By Swae Lee and Post Malone.mp3");
    song_1.play();
    song_1.setVolume(1);
    song_1.rate(1);
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.posenet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet model is loaded!!!")
}

function gotPoses(results)
{
    if(results > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Rigt Wrist = " + scoreRightWrist + " Score Left Wrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
    }
}

function draw()
{
    image(0, 0, 600, 500);
    song_1_status = song_1.setPlaying();
    song_2_status = song_2.setPlaying();
    song_3_status = song_3.setPlaying();
    song_4_status = song_4.setPlaying();
    song_5_status = song_5.setPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song_1.stop();

        if(song_2_status == false)
        {
            song_1.stop();
            song_3.stop();
            song_4.stop();
            song_5.stop();
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Lukas Gram 7 years"
        }else if(song_3_status == false)
        {
            song_1.stop();
            song_2.stop();
            song_4.stop();
            song_5.stop();
            song_3.play();
            document.getElementById("song").innerHTML = "Playing - Maroon Memories";
        }else if(song_4_status == false)
        {
            song_1.stop();
            song_2.stop();
            song_3.stop();
            song_5.stop();
            song_4.play();
            document.getElementById("song").innerHTML = "Playing - Imagine Dragons Thunder";
        }else if(song_5_status == false)
        {
            song_1.stop();
            song_2.stop();
            song_3.stop();
            song_4.stop();
            song_5.play();
            document.getElementById("song").innerHTML = "Playing - Lee and Post Malone Sunflower";
        }
    }
}