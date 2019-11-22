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

        if (itemName === 'star' || itemName === 'heart') {
            drawPart(leftEye, true);
            drawPart(rightEye, true);
        }
        else if (itemName === 'glasses') {
            drawPart(nose, true);
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

    if (itemName === 'star') {
        image(star, totalX - 15, totalY - 15, 30, 30);
    }
    else if (itemName === 'heart') {
        image(heart, totalX - 15, totalY - 15 + 30, 30, 30);
    }
    else if (itemName === 'glasses') {
        image(glasses, totalX - 100 / 2, totalY - 100 * 3 / 5, 100, 100);
    }

    endShape(closed ? CLOSE : undefined);
}