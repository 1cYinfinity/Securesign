// Start video stream for face detection
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
        video.play(); // Make sure to play the video
    })
    .catch(function (err) {
        console.error('Error accessing camera: ', err);
    });

// Capture image from video stream
document.getElementById('capture').addEventListener('click', function () {
    var video = document.getElementById('video');
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    var imageDataUrl = canvas.toDataURL('image/png');
    sessionStorage.setItem('capturedImage', imageDataUrl);
    video.pause();
});

// Validate captured image and proceed
document.getElementById('validate').addEventListener('click', function () {
    var capturedImage = sessionStorage.getItem('capturedImage');
    if (capturedImage) {
        // Proceed with validation
        window.location.href = "https://quantum-x.mydurable.com/";
    } else {
        alert('Please capture an image first.');
    }
});
