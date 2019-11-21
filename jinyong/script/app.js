let faceapi;
let video;
let detections;

const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false
};

function setup() {
    const x = (windowWidth - width) / 2;
    const y = (windowHeight - height) / 2;

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
    button1.mousePressed(changeBG);

    button2 = createButton('item2');

    button2.position(x + width / 4, y + height);
    button2.mousePressed(changeBG);

    button3 = createButton('item3');

    button3.position(x + width * 2 / 4, y + height);
    button3.mousePressed(changeBG);

    button4 = createButton('item4');

    button4.position(x + width * 3 / 4, y + height);
    button4.mousePressed(changeBG);
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
        drawBox(detections);
        drawLandmarks(detections);
    }

    requestAnimationFrame(function () {
        faceapi.detect(gotResults)
    });
}

function drawBox(detections) {
    for (let i = 0; i < detections.length; i++) {
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x;
        const y = alignedRect._box._y;
        const boxWidth = alignedRect._box._width;
        const boxHeight = alignedRect._box._height;

        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rect(x, y, boxWidth, boxHeight);
    }
}

function drawLandmarks(detections) {
    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);

    for (let i = 0; i < detections.length; i++) {
        const { mouth, nose, leftEye, rightEye, rightEyeBrow, leftEyeBrow } = detections[i].parts;

        drawPart(mouth, true);
        drawPart(nose, false);
        drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);
    }
}

function drawPart(features, closed) {
    beginShape();

    for (const feature of features) {
        const { _x: x, _y: y } = feature;

        vertex(x, y);
    }
    
    if (closed === true) {
        endShape(CLOSE);
    } else {
        endShape();
    }
}

function drawImageList(imageList){
    let xIdx = 0;

    for (let i = 0; i < imageList.length; i++){
        Image(imageList[i], xIdx, height);

        xIdx += imageList[i].width;
    }
}

function changeBG() {
    const val = random(255);

    background(val);
}