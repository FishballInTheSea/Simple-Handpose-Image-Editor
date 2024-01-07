let handpose, video, detections, photo, mode, drawLayer;
//xy coordinates before the current one
let kpX, kpY;
//current rectangle region
let regionX, regionY, regionWidth, regionLength;
//copied image region
let copiedRegion, copiedX, copiedY, copiedWidth, copiedLength;
//pasted image region
let pastedRegion, pastedX, pastedY, pastedWidth, pastedLength;

function preload(){
  targetImage = loadImage("image/apple_small.jpg");
}

function setup() {
  workSpace = createCanvas(1250, 437);
  
  photo = new Photo();
  photo.photo_setup();
  
  video = createCapture(VIDEO);
  video.size(width, height);
  drawLayer = createGraphics(625, 437);
    
  video.hide();
  handpose = ml5.handpose(video, modelReady);
  
  mode = "default";
  pasted = false;
}
function modelReady() {
  select("#status").html("Model Loaded");
  handpose.on("hand", gotResults);
}
function gotResults(results) {
  detections = results;
}
function draw() {
  image(photo.img, 0, 0);
  photo.photo_draw();
  image(video, 625, 0, width - 625, height);
  image(drawLayer, 0, 0);
  if (detections) {
    if (detections.length > 0) drawMode();
  }
  drawCopiedRegion();
}

function drawMode(){
  if (mode == "freehand"){
    console.log("freehand");
    drawFreehand();
  }      
  else if(mode == "select"){
    console.log("select");
    drawSelect();
  }
  else{
    console.log("default");
    pasted = false;
    drawDefault();
  }
  if (mode != "freehand"){
    drawLayer.clear();
  }
  if (mode != "select"){
    copiedRegion = null;
    pastedRegion = null;
    pasted = false;
  }
}

function keyPressed(){
  if (key == "f"){
    mode = "freehand";
  }
  else if(key == "s"){
    mode = "select";
  }
  else if(key == "c"){
    if (mode == "select"){
      copiedX = regionX;
      copiedY = regionY;
      copiedWidth = Math.abs(regionWidth);
      copiedLength = Math.abs(regionLength);
      copiedRegion = targetImage.get(copiedX, copiedY - copiedLength, copiedWidth, copiedLength);
    }
    else{
      alert("Please enter Region Selection and Copying Mode.")
    }
  }
  else if(key == "v"){
    if (copiedRegion != null){
      pastedRegion = copiedRegion;
      pastedX = regionX;
      pastedY = regionY;
      pastedWidth = regionWidth;
      pastedLength = regionLength;
      pasted = true;
    }
    else{
      alert("Please copy one region from the image.");
    }
  }
  else if(key == "e"){
    mode = "default";
  }
}

function drawDefault(){
  noStroke();
  fill(0, 255, 0);
  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    const keypoint = detection.landmarks[8];
    ellipse(keypoint[0], keypoint[1], 10, 10);
  }
  noStroke();
  fill(0, 255, 0);
  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    const keypoint = detection.landmarks[8];
    this.ellipse(keypoint[0] + 625, keypoint[1], 10, 10);
  }
}
function drawFreehand(){
  noStroke();
  fill(0, 0, 255);
  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    const keypoint = detection.landmarks[8];
    ellipse(keypoint[0], keypoint[1], 10, 10);
    drawLayer.stroke(255, 0, 255);
    drawLayer.strokeWeight(10);
    drawLayer.line(keypoint[0], keypoint[1], kpX, kpY);
    kpX = keypoint[0];
    kpY = keypoint[1];
  }
  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    const keypoint = detection.landmarks[8];
    this.ellipse(keypoint[0] + 625, keypoint[1], 10, 10);
  }
}

function drawSelect(){  
  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    const keypointIndex = detection.landmarks[8];
    const keypointThumb = detection.landmarks[4];
    //for image
    noStroke();
    fill(255, 255, 0);
    ellipse(keypointIndex[0], keypointIndex[1], 10, 10);
    ellipse(keypointThumb[0], keypointThumb[1], 10, 10);
    //for camera
    ellipse(keypointIndex[0] + 625, keypointIndex[1], 10, 10);
    ellipse(keypointThumb[0] + 625, keypointThumb[1], 10, 10);
    
    //rect draw
    fill(255, 255, 0, 60);
    if (keypointThumb[0] < keypointIndex[0]){
      if (keypointThumb[1] > keypointIndex[1]){
        regionX = keypointThumb[0];
        regionY = keypointThumb[1];
        regionWidth = keypointIndex[0] - keypointThumb[0];
        regionLength = keypointIndex[1] - keypointThumb[1];
      }else{
        regionX = keypointThumb[0];
        regionY = keypointIndex[1];
        regionWidth = keypointIndex[0] - keypointThumb[0];
        regionLength = keypointThumb[1] - keypointIndex[1];
      }
    }
    else{
      if (keypointThumb[1] > keypointIndex[1]){
        regionX = keypointIndex[0];
        regionY = keypointThumb[1];
        regionWidth = keypointThumb[0] - keypointIndex[0];
        regionLength = keypointIndex[1] - keypointThumb[1];
      }else{
        regionX = keypointIndex[0];
        regionY = keypointIndex[1];
        regionWidth = keypointThumb[0] - keypointIndex[0];
        regionLength = keypointThumb[1] - keypointIndex[1];
      }
    }
    rect(regionX, regionY, regionWidth, regionLength);
    rect(regionX + 625, regionY, regionWidth, regionLength);
  }
}

function drawCopiedRegion(){
  if (pasted){
    image(pastedRegion, pastedX, pastedY, pastedWidth, pastedLength);
  }
}