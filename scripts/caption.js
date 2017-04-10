var lines;
var lineNum;

function preload() {
  var request = "/subtitles/captions-manual.json";
  lines = loadJSON(request); 
}

function setup(){
  lineNum = -1;
}

function draw(){

}

function keyPressed(){

  if (lineNum => -1 && lineNum < lines.captions.size -1){

	  if (keyCode === RIGHT_ARROW) {
	    lineNum++;
	  } else if (keyCode === LEFT_ARROW) {
	  	lineNum--;
	  }
	  
	  var character = lines.captions[lineNum].name;
	  var speech = lines.captions[lineNum].line;

	  if (character == ""){
	    document.getElementById("demo").innerHTML =  speech; 
	  } else {
	    document.getElementById("demo").innerHTML = "[ " + character + " ]: " + speech; 
	  } 

	  if (keyCode === DOWN_ARROW) {
	  	document.getElementById("demo").innerHTML =  ""; 
	  }
  }
}