var ballon,database;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ballon = createSprite(250,250,10,10);
    ballon.shapeColor = "red";
    var ballonPosition = database.ref('ballon/height');
    ballonPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function updateHeight(x,y){
  database.ref('ballon/height').set({
    'x' : height.x + x,
    'y' :height.y + y
  })
}

function readHeight(data){
    height = data.val();
   ballon.x = position.x;
   ballon.y = position.y;
}

function showError(){
    console.log("Error in writing to the database")
}