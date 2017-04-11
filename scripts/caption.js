var lines;
var lineNum;
var sceneNum;

function preload() {
  var request = "/subtitles/captions-manual.json";
  lines = loadJSON(request); 
}

function setup(){
  lineNum = -1;
  sceneNum = "sceneTwo";
}

function draw(){
}

function keyPressed() {

 //  switch(key) {
 //    case '1': 
 //      sceneNum = "sceneOne";
	//   console.log(sceneNum);  
	//   break;
	// case '2': 
	//   sceneNum = "sceneTwo";
	//   console.log(sceneNum);  
	//   break;
 //    case '3': 
	//   sceneNum = "sceneThree";
	//   console.log(sceneNum);  
	//   break;
 //  }
  

  var numSceneLines = lines.sceneTwo.length;

  if (keyCode == RIGHT_ARROW) {
    if (lineNum < numSceneLines - 1){
      //unblur
      lineNum++;
      selectLine();
    } else {
      document.getElementById("demo").innerHTML =  "";
    }
  } else if (keyCode == LEFT_ARROW) {
    if (lineNum > 0){
      //unblur
      lineNum--;
      selectLine();
    }
  } else if (keyCode === DOWN_ARROW) {
    blurOut();
    //document.getElementById("demo").innerHTML =  ""; 
  }

  return false;
}

function selectLine(){
	var character = lines.sceneTwo[lineNum].name;
	var speech = lines.sceneTwo[lineNum].line;

	if (character == ""){
	  document.getElementById("demo").innerHTML =  speech; 
	} else {
	  document.getElementById("demo").innerHTML = "[ " + character + " ]: " + speech; 
	} 
}

function blurOut(){
	document.getElementById("demo").style.textShadow = "0 0 42px white";
    document.getElementById("demo").style.color = "transparent";
    document.getElementById("demo").style.transition = "all 0.9s ease";
    setTimeout(function (){
      document.getElementById("demo").innerHTML =  ""; 
    }, 900);     
}