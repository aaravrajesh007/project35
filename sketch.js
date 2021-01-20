//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogimg,happyDogimg,dogimg1,feedDog;
var LF=0;

function preload()
{
  //load images here
  dogimg = loadAnimation("images/dogImg.png");
  happyDogimg = loadAnimation("images/dogImg1.png");
}

function setup() {
	createCanvas(1200, 500);
  dog = createSprite(800,250);
  dog.addAnimation("dogim",dogimg);
  dog.addAnimation("dogi",happyDogimg)
  dog.scale=0.3;
  //dog.addImage(dogimg);

  database = firebase.database();

  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.changeAnimation("dogi",happyDogimg)
}
  drawSprites();
  //add styles here
  fill("red")
  textSize(15);
text("Food Remaining:"+foodS,100,70);
text("Press Up Arrow Key to Feed the Dog",80,90)
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

