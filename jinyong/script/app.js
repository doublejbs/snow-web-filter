let faceapi;
let video;
let detections;
let star;
let heart; 
let fox;
let itemName = '';
let isPlaying = true;
let cnv;
let downloadName = 0;
let cameraDiv;

const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false
};

function preload() {
    star = loadImage('assets/star.png');
    heart = loadImage('assets/heart.png');
}

function setup() {
    const x = (windowWidth) / 5;
    const y = (windowHeight) / 4;
    cameraDiv = createElement('div');
    cameraDiv.elt.style.position = 'fixed';

    frameRate(120);
    initCanvas(x, y);
    createButtons(x, y);
    initVideo();
}

function initCanvas(x, y) {
    cnv = createCanvas(360, 270);

    cnv.position(x, y);
    cameraDiv.child(cnv);
}

function createButtons(x, y){
    button1 = createButton('별');

    button1.position(x, y + height);
    cameraDiv.child(button1);
    button1.mousePressed(function(){
        itemName = 'star';
    });
    
    button2 = createButton('하트');

    cameraDiv.child(button2);
    button2.position(x + width / 4, y + height);
    button2.mousePressed(function(){
        itemName = 'heart';
    });

    button3 = createButton('item3');

    cameraDiv.child(button3);
    button3.position(x + width * 2 / 4, y + height);
    button3.mousePressed(function(){
        itemName = 'fox';
    });

    button4 = createButton('촬영');
    const listDiv = createElement('div');

    cameraDiv.child(button4);
    listDiv.size(width, height);
    listDiv.position(x + width + 10, 10);
    button4.position(x + width * 3 / 4, y + height);
    button4.mousePressed(function(){
        const data = cnv.canvas.toDataURL();
        const a = createElement('a');
        const img = createElement('img');
        
        img.size(width / 2, height / 2);
        img.elt.src = data;
        a.elt.href = data;
        a.elt.download = 'image' + str(downloadName++) + '.jpg';
        a.child(img);
        listDiv.child(a);
    });
}

function initVideo(){
    video = createCapture(VIDEO);

    video.size(width, height);
    video.hide();
    faceapi = ml5.faceApi(video, detectionOptions, modelReady);
}