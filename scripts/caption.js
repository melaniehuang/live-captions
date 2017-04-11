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
  console.log(lines.sceneTwo.length);
  
  if (keyCode == RIGHT_ARROW) {
    if (lineNum < numSceneLines - 1){
      lineNum++;
      selectLine();
    } else {
      document.getElementById("demo").innerHTML =  "";
    }
  } else if (keyCode == LEFT_ARROW) {
    if (lineNum > 0){
      lineNum--;
      selectLine();
    }
  } else if (keyCode === DOWN_ARROW) {
    document.getElementById("demo").innerHTML =  ""; 
  }

  return false; // prevent default
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