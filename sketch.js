//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;
var fedTime, lastFed;
var foodObject;
var feed,addFood;
var changingGameState, readingGameState;
var bedroomImage, gardenImage, bathroomImage;
var gameState;
var currentTime;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  bedroomImage = loadImage("virtual pet images/Bed Room.png");
  gardenImage = loadImage("virtual pet images/Garden.png");
  bathroomImage = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 400);
  dog = createSprite(600,250,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.4;
  /*happyDog = createSprite(250,250,10,10);
  happyDog.addImage(happyDogImage);
  happyDog.scale = 0.4;*/
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  foodObject = new Food();

  readGameState = database.ref("gameState");
  readGameState.on("value", function(data){
    gameState = data.val();
  })

  
}


function draw() {  
  background(46,139,87);
  
  /*if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }*/

  foodObject.display();

  fedTime = database.ref("Feedtime");
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  })

  if(gameState != "Hungry")
  {
    feed.hide();
    addFood.hide();
    dog.remove();
  }

  else
  {
    feed.show();
    addFood.show();
    dog.addImage(dogImage);
  }

  currentTime = hour();

  if(currentTime == (lastFed + 1))
  {
    foodObject.garden();
    update("Playing");
  }

  else if(currentTime == (lastFed + 2))
  {
    update("Sleeping");
    foodObject.bedroom();
  }

  else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4))
  {
    update("Bathing");
    foodObject.bathroom();
  }

  else
  {
    update("Hungry");
    foodObject.display();
  }


  drawSprites();

  textSize(24);
  fill("black");
  //text("Press Up_Arrow To Feed Drago Milk!",45,50);
  textSize(20);
  text("Food Remaining:" + foodS, 160,100)

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed: " + lastFed%12, + "PM", 350,350);
  }
  else if(lastFed == 0)
  {
    text("Last Feed: 12 AM", 350, 30);
  }
  else
  {
    text("Last Feed: " + lastFed + "AM", 350,30);
  }
  //add styles here

}

function addFoods()
{
  foodS++;

  database.ref("/").update(
    {
      Food: foodS
    }
  )
}

function feedDog()
{
  dog.addImage(happyDogImage);

  if(foodObject.getFoodStock() <= 0)
  {
  foodObject.updateFoodStock(foodObject.getFoodStock()*0);
  database.ref('/').update({
    Food : foodObject.getFoodStock(),
    Feedtime: hour()
  })
 }
 else
 {
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObject.getFoodStock(),
    Feedtime: hour()
   })
 }
}

function readStock(data)
{
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function update(state)
{
  database.ref("/").update(
    {
      gameState: state
    }
  )
  }



/*function writeStock(x)
{
  if(x<=0)
  {
    x = 0;
  }
  else
  {
    x = x -1;
  }
  
  database.ref("/").update({
    Food: x
  })
}*/

