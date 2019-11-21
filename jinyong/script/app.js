let faceapi;
let video;
let detections;
let star, heart, fox;
let itemName = '';

const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false
};

function preload() {
    star = loadImage('assets/star.png');
    heart = loadImage('assets/heart.png');
}

function setup() {
    const x = (windowWidth) / 2 - width;
    const y = (windowHeight) / 2 - height;

    frameRate(120);
    initCanvas(x, y);
    createButtons(x, y);
    initVideo();
}

function initCanvas(x, y) {
    const cnv = createCanvas(360, 270);

    cnv.position(x, y);
}

function createButtons(x, y){
    button1 = createButton('item1');

    button1.position(x, y + height);
    button1.mousePressed(function(){
        itemName = 'star';
    });
    
    button2 = createButton('item2');

    button2.position(x + width / 4, y + height);
    button2.mousePressed(function(){
        itemName = 'heart';
    });

    button3 = createButton('item3');

    button3.position(x + width * 2 / 4, y + height);
    button3.mousePressed(function(){
        itemName = 'fox';
    });

    button4 = createButton('item4');

    button4.position(x + width * 3 / 4, y + height);
    button4.mousePressed();
}

function initVideo(){
    video = createCapture(VIDEO);

    video.size(width, height);
    video.hide();
    faceapi = ml5.faceApi(video, detectionOptions, modelReady);
}

function modelReady() {
    console.log('ready!');
    console.log(faceapi);
    faceapi.detect(gotResults);
}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }

    detections = result;

    background(255);
    image(video, 0, 0, width, height);

    if (detections && detections.length > 0) {
        drawLandmarks(detections);
    }
    requestAnimationFrame(function () {
        faceapi.detect(gotResults)
    });
}

function drawLandmarks(detections) {
    for (let i = 0; i < detections.length; i++) {
        const { mouth, nose, leftEye, rightEye, rightEyeBrow, leftEyeBrow } = detections[i].parts;
        
        if (itemName === 'star'){
            drawPart(leftEye, true);
            drawPart(rightEye, true);
        }
        else if (itemName === 'heart'){
            drawPart(leftEye, true);
            drawPart(rightEye, true);
        }
        else if (itemName === 'fox'){
            drawPart(nose, true);
        }
        else if (itemName === ''){
            continue;
        }
    }
}

function drawPart(features, closed) {
    beginShape();

    let totalX = 0;
    let totalY = 0;

    for (const feature of features) {
        totalX += feature._x;
        totalY += feature._y;
    }
    
    totalX /= features.length;
    totalY /= features.length;

    if (itemName == 'star'){
        image(star, totalX - 15, totalY - 15, 30, 30);
        //console.log(features.length);
        //image(star, features[41].x, features[41].y, 30, 30);
    }
    else if (itemName == 'heart'){
        image(heart, totalX - 15, totalY - 15 + 30, 30, 30);
    }
    else if (itemName == 'fox'){
        image(fox, totalX - 100 / 2, totalY - 100 / 2, 100, 100);
    }

    endShape(closed ? CLOSE : undefined);
}