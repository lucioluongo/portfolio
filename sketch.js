let internalModels = [];
let mediumModels = [];
let externalModels = [];
let internalModelIndex = 0;
let mediumModelIndex = 0;
let externalModelIndex = 0;
let time;

var song;
var fft;
var smoothing = 0.8;
var binCount = 1024;

function preload() {
    for (let i = 0; i <= 3; i++) {
        internalModels.push(loadModel(`./models/internal_${i}.obj`, true));
        mediumModels.push(loadModel(`./models/medium_${i}.obj`, true));
        externalModels.push(loadModel(`./models/external_${i}.obj`, true));
    }
    song = loadSound("audio/Quiet_Strange.mp3");
}

function toggleSong() {
    const button = document.getElementById('playpause');
    if (song.isPlaying()) {
        song.pause();
        button.textContent = '>'; // Play icon
    } else {
        song.play();
        button.textContent = '||'; // Pause icon
    }
}

function setup() {
    let canvas = createCanvas(1000, 500, WEBGL);
    canvas.parent('p5js_frame');
    fft = new p5.FFT(smoothing, binCount);
    frameRate(60);
    time = frameCount;
    const button = document.getElementById('playPauseButton');
    button.addEventListener('click', toggleSong);
}

function draw() {

    
  
    translate(0, 0, 0); // Center in the WebGL coordinate system

    var spectrum = fft.analyze();

    var lowLvls = fft.getEnergy("bass", "lowMid");
    var midLvls = fft.getEnergy("lowMid", "mid");
    var highLvls = fft.getEnergy("highMid", "treble");

    let rotateXFactor = song.isPlaying() ? 0.00002 * highLvls : 0.001;
    let rotateYFactor = song.isPlaying() ? 0.00002 * midLvls : 0.001;
    let rotateZFactor = song.isPlaying() ? 0.00002 * lowLvls : 0.001;

    if (time + 60 * 1 < frameCount) {
        internalModelIndex = (internalModelIndex + 1) % internalModels.length;
        mediumModelIndex = (mediumModelIndex + 1) % mediumModels.length;
        externalModelIndex = (externalModelIndex + 1) % externalModels.length;
        time = frameCount;
    }


    
    strokeWeight(0.4);
    push();
    scale(0.5 * 2 + rotateXFactor);
    rotateZ(90);
    rotateX(frameCount * rotateXFactor);
    model(internalModels[internalModelIndex]);
    pop();

    push();
    scale(2);
    rotateX(frameCount * -2 * rotateXFactor);
    model(mediumModels[mediumModelIndex]);
    pop();

    push();
    scale(3);
    rotateY(frameCount * rotateYFactor);
    model(externalModels[externalModelIndex]);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
