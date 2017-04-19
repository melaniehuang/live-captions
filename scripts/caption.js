var lines;
var lineNum = -1;
var captionColor = "white";

var monoNum = -1;
var monoOn = false;

var wordNum = -1;
var wordOn = false;

var paintOn = false;
var paintCanvas;

var vidOn = false;

function preload() {
  var request = "/subtitles/captions-manual.json";
  lines = loadJSON(request); 
}

function setup(){
  paintCanvas = createCanvas(windowWidth,windowHeight);
  paintCanvas.position(0,0);  

  noStroke();
  rectMode(CORNERS);
  origin = createVector(random(10,windowWidth-10),random(10,windowHeight-10)); 
}

function draw(){
  blendMode(MULTIPLY); 
  rothko();
}

function keyPressed() {
  //Hexate Video Scene 1
  if (keyCode === 86 && vidOn == false) {
    vidOn = true;
    document.getElementById("vidHexate").style.visibility = "visible";
  } else if (keyCode === 86 && vidOn == true){
    vidOn = false;
    document.getElementById("vidHexate").style.visibility = "hidden";    
  }

  //Regular Captions
  var numSceneLines = lines.sceneSeven.length;
  if (keyCode === RIGHT_ARROW) {
    if (lineNum < numSceneLines - 1){
      captionSharp();
      lineNum++;
      selectLine();
    } else {
      lineNum++;
      blurOut();
    }
  } else if (keyCode === LEFT_ARROW) {
    if (lineNum > 0){
      captionSharp();
      lineNum--;
      selectLine();
    } else {
      lineNum--;
      blurOut();
    }
  } else if (keyCode === DOWN_ARROW) {
    blurOut();
  }

  if (keyCode === 80 && paintOn == false){
    paintOn = true;
    paintCanvas.style("visibility", "visible");
  } else if (keyCode === 80 && paintOn == true){
    paintOn = false;
    paintCanvas.style("visibility", "hidden");
  }

  //Hexate Scene 6 and 7
  if (keyCode === 87){
    bigWords();
  } 

  //Scene 10 Monologue
  if (keyCode === 77) {
    scrollText();
  }

  return false;
}

function selectLine(){
	var character = lines.sceneSeven[lineNum].name;
	var speech = lines.sceneSeven[lineNum].line;

	if (character == ""){
	  document.getElementById("pCaption").innerHTML =  speech; 
	} else {
    if (captionColor == "white"){
      captionColor = "yellow";
    } else {
      captionColor = "white";
    }

    document.getElementById("pCaption").style.color = captionColor;
	  document.getElementById("pCaption").innerHTML = "[ " + character + " ]: " + speech; 
	} 
}

function bigWords(){
  var wordLength = lines.sceneSevenWords.length;

  if (wordNum == wordLength-1){
    wordNum = -1;
  }

  wordNum++;
  var word = lines.sceneSevenWords[wordNum].line;

  document.getElementById("pWords").style.marginLeft = int(random(-400,400))+"px";
  document.getElementById("pWords").style.marginTop = int(random(0,400))+"px";
  document.getElementById("pWords").innerHTML =  word; 
}

function scrollText() {
    var charMono = lines.sceneTen[0].name;
    var lineMono = lines.sceneTen[0].line;
    document.getElementById("pScroll").innerHTML = "[ " + charMono + " ]: " + lineMono; 
    
    var elem = document.getElementById("pScroll");
     
    var pos = 800;
    var id = setInterval(frame, 12);
    function frame() {
        elem.style.visibility = "visible"; 
        if (pos == -3600) {
            clearInterval(id);
        } else {
            pos--; 
            elem.style.top = pos + 'px'; 
        }
    }
}

function blurOut(){
	document.getElementById("pCaption").style.textShadow = "0 0 100px #D4DBFF";
  document.getElementById("pCaption").style.color = "transparent";
  document.getElementById("pCaption").style.transition = "all 0.4s ease";
  
  setTimeout(function (){
    document.getElementById("pCaption").innerHTML =  ""; 
  }, 500);     
}

function captionSharp(){
  document.getElementById("pCaption").style.textShadow = "0 0 0px #D4DBFF";
  document.getElementById("pCaption").style.color = captionColor;
  document.getElementById("pCaption").style.transition = "all 0.4s ease";    
}