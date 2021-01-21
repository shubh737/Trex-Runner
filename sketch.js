var trex,trex_running,trex_collided;
var ground;
var invisibeGround,groundImage;
var cloudGroup,cloudImg;
var obstacleGroup,O1,O2,O3,O4,O5,O6;
var score = 0;
var gameOver,gameOverImg;
var restart,restartImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  
  cloudImg = loadImage("cloud.png");
  
  O1 = loadImage("obstacle1.png");
  O2 = loadImage("obstacle2.png");
  O3 = loadImage("obstacle3.png");
  O4 = loadImage("obstacle4.png");
  O5 = loadImage("obstacle5.png");
  O6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1530,758);
  trex = createSprite(50,760,20,30);
  trex.addAnimation("trex_running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,735,400,20);
  ground.addImage("ground",groundImage);
  
  invisibleGround = createSprite(200,760,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(765,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;           
  
  restart = createSprite(765,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false; 
}

function draw() {
  
  background("lightblue");
  
  if(gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);
  text("score : "+score,500,50);
  text.font = BOLD;
    
if (keyDown("space")){
  trex.velocityY = -10;  
  }
if (ground.x<0){
  ground.x = ground.width/2;    
  }
    
  trex.velocityY = trex.velocityY + 0.8; 
  ground.velocityX = -(6+3*score/100);      
  
  trex.collide(invisibleGround);
  
  SpawnClouds();
  SpawnObstacles();
    
    if (obstacleGroup.isTouching(trex)){
      gameState = END;
    }    
  }
  
  else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityY = 0;
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("collided",trex_collided);
    
    if (mousePressedOver(restart)){
      reset();
    }

     text("score : "+score,500,50);
    
  }
  
  drawSprites();
}

function SpawnClouds(){
  if (World.frameCount%60 === 0){
    var cloud = createSprite(1530,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.velocityX = -4;
    cloud.scale = 0.5;
    cloud.lifetime = 1000;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
    cloud.tint = "blue";
  }
}

function SpawnObstacles(){
  if (World.frameCount%60 === 0){
    var obstacle = createSprite(1530,741,10,40);
   obstacle.velocityX = -10; 
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1 : obstacle.addImage(O1);
               break;                  
      case 2 : obstacle.addImage(O2);
               break;                  
      case 3 : obstacle.addImage(O3);     
               break;                  
      case 4 : obstacle.addImage(O4);
               break;                  
      case 5 : obstacle.addImage(O5);
               break;                  
      case 6 : obstacle.addImage(O6);
               break;    
      default:break;                          
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 1000;
    obstacle.tint = "green";   
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("trex_running");
  score = 0;
}
