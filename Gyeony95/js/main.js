let drawFace = false;
let width = 320,
	height = 240,
	filter = "none",
	streaming = false,
	pc;
let video;
let canvas;
let tracker;
let canvasStream;
let p_status;
let photoButton;
let clearButton;
let photoFilter;
let firstButton;
let secondButton;
let thirdButton;



const configuration = {
	iceServers: [{
		urls: 'stun:stun.l.google.com:19302'
	},
	{
		url: 'turn:numb.viagenie.ca',
		credential: 'muazkh',
		username: 'webrtc@live.com'
	},
	{
		url: 'turn:192.158.29.39:3478?transport=udp',
		credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
		username: '28224511:1379330808'
	},
	{
		url: 'turn:192.158.29.39:3478?transport=tcp',
		credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
		username: '28224511:1379330808'
	}
	]
};

const img = new Image();
const img2 = new Image();
const img3 = new Image();
img.src = 'assets/img/angry.png';
img2.src = 'assets/img/bin4.png';
img3.src = 'assets/img/gurl.png';

if (!location.hash) {
	location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const roomHash = location.hash.substring(1);
//방 아이디를 만드는 부분
const roomName = 'observable-' + roomHash;

function onSuccess() { };
function onError(error) {
	console.error(error);
}

function sendMessage(message) {
	console.log(message);
	drone.publish({
		room: roomName,
		message
	});
}
//isOfferer가 true일때 시작하게끔
// Send signaling data via Scaledrone
function startWebRTC(isOfferer) {
	pc = new RTCPeerConnection(configuration);

	// 상대방에게 피어 보냄
	pc.onicecandidate = event => {
		if (event.candidate) {
			sendMessage({ 'candidate': event.candidate });
		}
	};
	var isNegotiating = false;
	if (isOfferer) {
		pc.onnegotiationneeded = () => {
			console.log("creating offer");
			if (isNegotiating) {
				console.log("Skiping nested negotiation");
				return;
			}
			isNegotiating = true;
			pc.createOffer().then(localDescCreated).catch(onError);
		}
	}
	pc.onsignalingstatechange = (e) => {
		isNegotiating = (pc.signalingState != "stable");
	}
	pc.oniceconnectionstatechange = (e) => {
		p_status.innerHTML = "iceConnectionState:" + e.currentTarget.iceConnectionState + "<br>iceGatheringState: " + e.currentTarget.iceGatheringState;
		console.log("state change:", e, e.currentTarget.remoteDescription.sdp);
	}
	//원격 피어가 접근했을때 remotevideo에 보여줌
	pc.ontrack = event => {
		console.log("event-->", event);
		const stream = event.streams[0];
		console.log(remoteVideo);

		if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
			remoteVideo.srcObject = stream;
			console.log("added -> remote video", remoteVideo);
		}
	};
	navigator.mediaDevices.getUserMedia({
		audio: true,
		video: true,
	}).then(stream => {
		//#localVideo 화면에  보여줌
		video.srcObject = stream;
		// Add your stream to be sent to the conneting peer
		stream.getTracks().forEach(track => {
			console.log("adding this track-> ", track);
			if (track.kind == 'audio') {
				console.log("audio stream added..");
				pc.addTrack(track, stream);
			}
		}
		);
		canvasStream.getTracks().forEach(track => {
			if (track.kind == 'video') {
				console.log("video stream added..");
				pc.addTrack(track, stream);
			}
			console.log("found this track on canvas-->", track);
		});
		console.log(pc);
	}, onError);

	//Play when ready
	video.addEventListener('canplay', function (e) {
		if (!streaming) {
			//비디오와 캔버스 크기조절
			height = video.videoHeight / (video.videoWidth / width);
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);
	//색깔필터 바꾸는 부분
	photoFilter.addEventListener('change', function (e) {
		//어떤 필터가 선택 되었는지 그 값을 가져온다.
		var obj = document.getElementsByName("filter");
		var checked_index = -1;
		for (var k = 0; k < obj.length; k++) {
			if (obj[k].checked) {
				checked_index = k;
				filter = obj[k].value;
			}
		}
		//이렇게 나온 필터의 값을 비디오 스타일에 적용
		video.style.filter = filter;
		e.preventDefault();
	});

	//Clear button evnet
	clearButton.addEventListener('click', function (e) {
		filter = 'none';
		video.style.filter = filter;
		document.querySelector("#normal").checked = true;
	});
	photoButton.addEventListener('click', function(e){
		takePicture();
		e.preventDefault();
		}, false);
	//화난 이모티콘으로 마스크
	firstButton.addEventListener('click', function () {
		attachMask(img);
	});
	//원빈얼굴로 마스크
	secondButton.addEventListener('click', function () {
		attachMask(img2);
	});
	//여자 얼굴 마스크
	thirdButton.addEventListener('click', function () {
		attachMask(img3);
	});

}

function takePicture(){
	const context = canvas.getContext('2d');
	if(width && height){
	
		canvas.width = width;
		canvas.height = height;  
		//캔버스에 그리기
		context.drawImage(video, 0, 0, width, height);
		//캔버스로붙 실제 이미지를 가져오기
		const imgUrl = canvas.toDataURL('test.png');
		//엘리먼트를 만들고 가져온 이미지를 출력하기
		const eimg = document.createElement('img');
		eimg.setAttribute('src', imgUrl);
		eimg.style.filter = filter;

		//photos Div 안에 추가하기
		photos.appendChild(eimg);
	}
}

function attachMask(img) {
	filter = 'none';
	video.style.filter = filter;
	document.querySelector("#normal").checked = true;
	tracker.setInitialScale(1);
	tracker.setStepSize(1);
	tracker.setEdgesDensity(0.1);
	context.fillStyle = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
	tracking.track('#video', tracker);
	tracker.on('track', function (event) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		event.data.forEach(function (rect) {
			context.drawImage(img, rect.x, rect.y, rect.width, rect.height);
		});
	});
}

function localDescCreated(desc) {
	console.log("local desc created--->", desc, desc.sdp);
	pc.setLocalDescription(
		desc,
		() => sendMessage({ 'sdp': pc.localDescription }),
		onError
	);
}


window.onload = function () {
	//필요한 변수들 정의
	getElements();
	console.log(photoFilter);
	canvasStream = canvas.captureStream();
	//이걸로 얼굴 따라가는 기능 구현
	tracker = new tracking.ObjectTracker('face');
	//스턴서버 턴서버 정의하는곳
	initDrone('n7heC3sYlfcOkmkU');
}

function initDrone(key) {
	const drone = new ScaleDrone(key);
	//사용자들이 방에 참가 했을때 코
	drone.on('open', error => {
		if (error) {
			return console.error(error);
		}
		const room = drone.subscribe(roomName);
		room.on('open', error => {
			if (error) {
				onError(error);
			}
		});
		//사람들이 들어오면 멤버가 쌓임 2명이면 통신 3이상이면 alert창 띄우기
		room.on('members', members => {
			console.log('MEMBERS', members);
			if (members.length >= 3) {
				alert("More than 2 members in the call.");
				return;
			}
			//본인이 두번째 유저라면 연결 시작
			const isOfferer = members.length === 2;
			startWebRTC(isOfferer);
		});
		// Listen to signaling data from Scaledrone
		room.on('data', (message, client) => {
			// Message was sent by us
			console.log("message received:", message, client);
			if (client.id === drone.clientId) {
				return;
			}
			if (message.sdp) {
				// This is called after receiving an offer or answer from another peer
				pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
					// When receiving an offer lets answer it
					if (pc.remoteDescription.type === 'offer') {
						pc.createAnswer().then(localDescCreated).catch(onError);
					}
				}, onError);
			} else if (message.candidate) {
				// Add the new ICE candidate to our connections remote description
				pc.addIceCandidate(
					new RTCIceCandidate(message.candidate), onSuccess, onError
				);
			}
		});
	});
}
function getElements() {
	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	remoteVideo = document.getElementById('remoteVideo');
	p_status = document.getElementById('status');
	photoButton = document.querySelector("#photo-button");
	clearButton = document.querySelector("#clear-button");
	photoFilter = document.querySelector("#photo-filter");
	firstButton = document.querySelector("#first-mask");
	secondButton = document.querySelector("#second-mask");
	thirdButton = document.querySelector("#third-mask");
	context = canvas.getContext('2d');
	//url 가져오는 코드 -> 화면에표시
	document.getElementById('url_id').innerHTML = window.location;
	document.getElementById('url_a_id').href = window.location;
}