const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var scoreX=0
var scoreY=0;
var shot
var target1,target2,target3,target4
var missileSprite
var score=0;

function preload(){
  bg=loadImage("images/bg.jpeg");
}



function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  dart=new Dart(600,300,80);
  missile=new Missile(1000,200,100,70);

  sling=new constraint({x:1000,y:200},missile.body);
  target4=createSprite(600,300,130,130);
  target4.setCollider("circle",0,0,154);
  target4.debug=true;
  target4.shapeColor="orange";

  target3=createSprite(600,300,90,90);
  target3.setCollider("circle",0,0,112);
  target3.debug=true;
  target3.shapeColor="blue";

  target2=createSprite(600,300,50,50);
  target2.setCollider("circle",0,0,70);
  target2.debug=true;
  target2.shapeColor="purple";

  target1=createSprite(600,300,10,10);
  target1.setCollider("circle",0,0,12);
  target1.debug=true;
  target1.shapeColor="yellow";

  missileSprite=createSprite(missile.body.position.x-40,missile.body.position.y+40,15,3);
  missileSprite.shapeColor="green"


}

function draw() {
  background(bg);  
  Engine.update(engine);
  dart.display();
  fill("White");
  textSize(25);
  text ("score:"+score,1000,100);
  missile.display();
  if (shot){
    shot.display();
  }

  
  drawSprites();

  missileSprite.x=missile.body.position.x-40
  missileSprite.y=missile.body.position.y+40

 
}

function mouseDragged(){
   Matter.Body.setPosition(missile.body,{x:mouseX,y:mouseY})
}

function mouseReleased(){
    sling.fly()
    shot=new Shot(missile.body,{x:random(600,680),y:random(200,280)});
   // console.log(Math.round(missile.body.position.x))
    //console.log(Math.round(missile.body.position.y));
   //  scoreX=Math.round(missile.body.position.x)
    //scoreY=Math.round(missile.body.position.y);
   
    //shot.fly();
    Matter.Body.setPosition(missile.body,{x:scoreX,y:scoreY});
   // Matter.Body.setStatic(missile.body,true)
   console.log(missileSprite.x)

  if (missileSprite.isTouching(target1)){
    score=score+100;
  }
   if (missileSprite.isTouching(target2)){
    score=score+50;

  }
   if (missileSprite.isTouching(target3)){
    score=score+25
  }
   if (missileSprite.isTouching(target4)){
    score=score+0
  }
    
};
//function mousePressed(){
 // console.log(mouseX)
 // console.log(mouseY)
 
//}

function keyPressed(){
  if (keyCode===32){
    Matter.Body.setPosition(missile.body,{x:1000,y:200})
    sling.bodyB=null
    shot.fly()
    sling.attach(missile.body);
  }
}
