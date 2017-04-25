var scenes;
var captionColor = "white";

var monoNum = -1;
var monoOn = false;

var paintOn = false;
var paintCanvas;

var currentScene = 0;
var currentLine = -1;

function preload() {
  var request = "/subtitles/captions-manual.json";
  scenes = loadJSON(request); 
}

function setup(){
  paintCanvas = createCanvas(windowWidth,windowHeight);
  paintCanvas.position(0,0);  

  noStroke();
  rectMode(CORNERS);
  origin = createVector(random(10,windowWidth-10),random(10,windowHeight-10)); 
}

function draw(){
  rothko();
}

function keyPressed() {
  //Regular Captions
  var numSceneLines = scenes[currentScene]["lines"].length;

  if (keyCode === RIGHT_ARROW) {
    if (currentLine < numSceneLines - 1){
      captionSharp();
      currentLine++;
      selectLine();
    } else {
      blurOut();
      goToNextScene();
    }
  } else if (keyCode === LEFT_ARROW) {
    if (currentLine > 0){
      captionSharp();
      currentLine--;
      selectLine();
    } else {
      blurOut();
      goToPreviousScene();
    }
  } else if (keyCode === DOWN_ARROW) {
    blurOut();
  }

  if (keyCode === 80 && paintOn == false){
    paintOn = true;
    paintCanvas.style("opacity", "0.8");
    paintCanvas.style("transition", "opacity 2.5s ease"); 
  } else if (keyCode === 80 && paintOn == true){
    paintOn = false;
    paintCanvas.style("opacity", "0");
    paintCanvas.style("transition", "opacity 2.5s ease"); 
  }

  //Scene 10 Monologue
  if (keyCode === 77) {
    scrollText();
  }

  if (keyCode === 78) {
    document.getElementById("pScroll").style.opacity = 0;
    document.getElementById("pScroll").style.transition = "opacity 0.5s ease";
  }

  if (keyCode === 49) {
    goToPreviousScene();
  }

  if (keyCode === 50) {
    goToNextScene();
  }

  if (keyCode == 79){
    clear(); 
  } 
  return false;
}

function selectLine(){
  var line = scenes[currentScene]["lines"][currentLine];
	var character = line.name;
	var speech = line.line;
  
  var toneDescription = speech.includes("[");  
	if (character == ""){
    document.getElementById("pCaption").style.fontStyle = "normal";
	  
    if (toneDescription == true){
      var startSfx = speech.indexOf("[");
      var endSfx = speech.indexOf("]");
      console.log(startSfx, endSfx);
      document.getElementById("pCaption").innerHTML = "<i>" + speech.slice(startSfx, endSfx+1) + "</i>" + speech.slice(endSfx+1);
    } else {
      document.getElementById("pCaption").innerHTML = speech; 
    }
	} else {
    if (captionColor == "white"){
      captionColor = "yellow";
    } else {
      captionColor = "white";
    }
    document.getElementById("pCaption").style.fontStyle = "normal";
    document.getElementById("pCaption").style.color = captionColor;
	   

    if (toneDescription == true){
      var startSfx = speech.indexOf("[");
      var endSfx = speech.indexOf("]");
      console.log(startSfx, endSfx);
      document.getElementById("pCaption").innerHTML = "[ " + character + " ]: <i>" + speech.slice(startSfx, endSfx+1) + "</i>" + speech.slice(endSfx+1);
    } else {
      document.getElementById("pCaption").innerHTML = "[ " + character + " ]: " + speech;
    }
	}

  if (line["showWords"]) {
    showWords(line["showWords"]);
  }
  
  if (line["hideWords"]) {
    hideWords();
  }

  if (line["showVideo"]) {
    showVideo();
  }

  if (line["hideVideo"]) {
    hideVideo();
  }
}

function goToNextScene() {
  
  if (currentScene < scenes.length) {
    currentScene++;
    console.log(currentScene);
    currentLine = -1;
  }
}

function goToPreviousScene() {
  if (currentScene > 0) {
    currentScene--;
    console.log(currentScene);
    currentLine = scenes[currentScene]["lines"].length;
  }
}

function showVideo() {
  var vidHexate = document.getElementById("vidHexate");
  vidHexate.style.opacity = 1.0;
  vidHexate.style.transition = "opacity 0.3s ease"; 
}

function hideVideo() {
  document.getElementById("vidHexate").style.opacity = 0;  
}

function showWord(word){
  var pWords = document.getElementById("pWords");

  pWords.style.marginLeft = int(random(-400,100))+"px";
  pWords.style.marginTop = int(random(-100,100))+"px";
  pWords.innerHTML =  word; 
}

function showWords(words) {
  if (words.length > 0) {
    showWord(words[0]);

    setTimeout(function(){
      showWords(words.slice(1, words.length))
    }, 1200);
  } else {
    showWord("");
  }  
}

function hideWords(){
  showWord("");
}

function scrollText() {
    var charMono = scenes[8]["lines"][0].name;
    var lineMono = scenes[8]["lines"][0].line;
    document.getElementById("pScroll").innerHTML = "[ " + charMono + " ]: " + lineMono; 
    var elem = document.getElementById("pScroll");
     
    var pos = 699;
    var id = setInterval(frame, 20);
    elem.style.opacity = 1;

    function frame() {
      if (pos == -3600 || elem.style.opacity == 0) {
        pos = 700;
        elem.style.opacity = 0;
      } else if (pos < 700) {
        pos--; 
        elem.style.top = pos + 'px'; 
      }     
    }
}

function blurOut(){
	document.getElementById("pCaption").style.textShadow = "0 0 100px "+captionColor;
  document.getElementById("pCaption").style.color = "transparent";
  document.getElementById("pCaption").style.transition = "all 0.5s ease";

  setTimeout(function (){
    document.getElementById("pCaption").innerHTML =  ""; 
  }, 400);     
}

function captionSharp(){
  document.getElementById("pCaption").style.textShadow = "0 0 0px "+captionColor;
  document.getElementById("pCaption").style.color = captionColor;
  document.getElementById("pCaption").style.transition = "all 0.5s ease";    
}

/* TO DO: 
- SFX italic
- Looped words until hideWords
- Monologue smoothness
- Monologue off */