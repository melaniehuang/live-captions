var w = 120;
var h = 40;
var i = 0;
var origin;

function rothko(){
  
  if (frameCount % 2 == 0){
    i++;
    var wr = random(-1,1);
    var hr = random(-1,1);
    fill(40,40,40,random(1,5));
     
    if (i%100 == 0){
      origin = createVector(random(10,windowWidth-10),random(10,windowHeight-10));
      i = 0;
    }

    rect(origin.x,origin.y,origin.x - w*wr,origin.y - h*hr);
    fill(74,74,74,random(1,5));
    rect(origin.x,origin.y,origin.x - w*wr,origin.y - h*hr);    
  }

}