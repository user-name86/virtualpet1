//Create variables here
var food, foodStock; 
var dog;
var dogImg, dogHappyImg ;
var database ;

function preload()
{
  dogHappyImg = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,50,50);
  dog.scale =0.25;
  
  dog.addImage(dogImg);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(49,139,87);

  if (keyWentDown(UP_ARROW)){
    writeStock(food);
   dog.addImage(dogHappyImg);

  }
  drawSprites();
  textSize(18);
  fill("red");
  text("Note: Press Up Arrow to feed Drago milk",120,480);
  textSize(16);
  fill("white");
  text("Food Remaining: " + food,120,100)
  //add styles here

}

function readStock(data){
  food=data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}



