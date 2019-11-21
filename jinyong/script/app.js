var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var errorCallback = function (e) {
    console.log('Reeeejected!', e);
};

function snapshot() {
    video.play();
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0);
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        // "image/webp" works in Chrome.
        // Other browsers will fall back to image/png.
        //document.querySelector('img').src = canvas.toDataURL('image/webp');
    }
}

// Not showing vendor prefixes or code that works cross-browser.
navigator.getUserMedia({ video: true }, function (stream) {
    video.srcObject = stream;
    localMediaStream = stream;
}, errorCallback);