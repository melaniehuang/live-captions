var scenes;
//var currentLine = -1;
var captionColor = "white";

var monoNum = -1;
var monoOn = false;

var wordOn = false;

var paintOn = false;
var paintCanvas;

var vidOn = false;

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
  var numSceneLines = scenes[currentScene]["lines"].length;

  if (keyCode === RIGHT_ARROW) {
    if (currentLine < numSceneLines - 1){
      captionSharp();
      currentLine++;
      selectLine();
    } else {
      blurOut();
      goToNextScene(); // TODO: Implement.
    }
  } else if (keyCode === LEFT_ARROW) {
    if (currentLine > 0){
      captionSharp();
      currentLine--;
      selectLine();
    } else {
      blurOut();
      goToPreviousScene(); // TODO: Implement.
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
//  if (keyCode === 87){
 //   bigWords();
//  } 

  //Scene 10 Monologue
  if (keyCode === 77) {
    scrollText();
  }

  return false;
}

function selectLine(){
  var line = scenes[currentScene]["lines"][currentLine];
	var character = line.name;
	var speech = line.line;

	if (character == ""){
	  document.getElementById("pCaption").innerHTML = speech; 
	} else {
    if (captionColor == "white"){
      captionColor = "yellow";
    } else {
      captionColor = "white";
    }

    document.getElementById("pCaption").style.color = captionColor;
	  document.getElementById("pCaption").innerHTML = "[ " + character + " ]: " + speech; 
	}

  if (line["showWords"]) {
    showWords(line["showWords"]); // TODO: Implement.
  }

  if (line["showVideo"]) {
    showVideo();
  }

  if (line["hideVideo"]) {
    hideVideo();
  }
}

function goToNextScene() {
  currentScene++;
  currentLine = -1;
}

function showWord(word){
  var pWords = document.getElementById("pWords");

  pWords.style.marginLeft = int(random(-400,400))+"px";
  pWords.style.marginTop = int(random(0,400))+"px";
  pWords.innerHTML =  word; 
}

function showWords(words) {
  if (words.length > 0) {
    showWord(words[0]);

    setTimeout(function(){
      showWords(words.slice(1, words.length))
    }, 1500);
  } else {
    showWord("");
  }  
}

function scrollText() {
    var charMono = scenes.sceneTen[0].name;
    var lineMono = scenes.sceneTen[0].line;
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
	document.getElementById("pCaption").style.textShadow = "0 0 100px "+captionColor;
  document.getElementById("pCaption").style.color = "transparent";
  document.getElementById("pCaption").style.transition = "all 0.4s ease";

  
  setTimeout(function (){
    document.getElementById("pCaption").innerHTML =  ""; 
  }, 400);     
}

function captionSharp(){
  document.getElementById("pCaption").style.textShadow = "0 0 0px "+captionColor;
  document.getElementById("pCaption").style.color = captionColor;
  document.getElementById("pCaption").style.transition = "all 0.4s ease";    
}

/*

    "sceneSixWords": [{
      "line": "Let me go"
    }, {
      "line": "Ira"
    }, {
      "line": "Don't touch me"
    }, {
      "line": "Stupid"
    }, {
      "line": "Unwanted"
    }, {
      "line": "Complete"
    }, {
      "line": "Shame"
    }, {
      "line": "Hopeless"
    }, {
      "line": "Worthless"
    }, {
      "line": "Idiot"
    }, {
      "line": "Stop me"
    }, {
      "line": "Ira"
    }, {
      "line": "Hopeless"
    }, {
      "line": "Failure"
      }, {
      "line": ""
    }]
  

    "sceneSevenWords": [{
      "line": "Filth"
    }, {
      "line": "Can we play too?"
    }, {
      "line": "little whore"
    }, {
      "line": "bites"
    }, {
      "line": "scratch"
    }, {
      "line": "spine"
    }, {
      "line": "dig deep little nails"
    }, {
      "line": "mark her quick"
    }, {
      "line": "gouge"
    }, {
      "line": ""
    }]*/