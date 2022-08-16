var running_man
var groundImage, ground
var PLAY = 1;
var END = 0;
var obstacle1, obstacle2;


var man
var gameState = PLAY;
var restartImg;
var obstaclesGroup;
var man_collided;
var object
var Finish_Line


var edges;


function preload(){
  running_man = loadAnimation("kavya1.png", "kavya2.png", "kavya3.png", "kavya4.png", "kavya5.png", "kavya6.png", "kavya7.png", "kavya9.png", "kavya10.png");
  groundImage = loadImage("groundPixel.png");
  man_collided = loadAnimation("kavya10.png")

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");

  restartImg = loadImage("Restart.png");
  


     
}




function setup() {
  createCanvas(2000,400);
  

 edges = createEdgeSprites()

  ground = createSprite(20,200,80000,400);
  ground.addImage("ground",groundImage);
//ground.visible = false;
ground.scale = 0.7

ground.velocityX = - 2;

man = createSprite(200,300,20,50);
object = createSprite(66,321,8000,5)
Finish_Line = createSprite(3700,350,100,800)

  
man.addAnimation("running", running_man);
man.addAnimation("collide", man_collided);
man.scale = 0.15;

obstaclesGroup = new Group();
  


}

function draw() {
  background(0);  
  drawSprites();
  text(mouseX+","+mouseY, man.x+200,50)

  console.log(gameState)
  
  if (gameState===PLAY){

    //ground.velocityX = -50
    if(keyDown("space") && man.y >= 260) {
      man.velocityY = -20;
   
      

  }

  

if(ground.x<=width/2){
  ground.x = width/2+100;
}

  spawnObstacles();



  if(obstaclesGroup.isTouching(man)){
    gameState = END;
}


 if(Finish_Line.isTouching(man)){
  gameState = END;
 }




  
  //camera.position.x = man.x + 900
  //camera.position.y = man.y - 50




  spawnbars()
  
  man.velocityY = man.velocityY + 0.8

  man.collide(object)

  

}
else if (gameState === END) {

  obstaclesGroup.setVelocityXEach(0);
  ground.velocityX = 0;
  man.velocityY = 0;
  man.velocityX = 0;
  man.changeAnimation("collide", man_collided);
  
 }
}

function spawnbars(){
  if(frameCount%60===0){
    var bar = createSprite(man.x+(Math.round(random(300,1000))),(Math.round(random(50,150))),40,10)
    bar.shapeColor = rgb(Math.round(random(100,200)),Math.round(random(100,200)),Math.round(random(100,200)))
    //console.log(bar.x)
    bar.velocityX = -3
  }
}


function reset(){
  obstaclesGroup.destroyEach();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(man.x+600,278,10,40);
    obstacle.scale = 0.08
    obstacle.debug = true;

    obstacle.velocityX = - 6


    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    
 }
 obstaclesGroup.add(obstacle)
  }
}
  
