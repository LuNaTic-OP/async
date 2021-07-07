var goldball,database;
var position

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    goldball = createSprite(250,250,10,10);
    goldball.shapeColor = "red";

    var goldballPosition = database.ref('ball/position');
    goldballPosition.on("value",readPosition,showError);
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

function writePosition(x,y) {
    database.ref('ball/position').set({
        'x' : position.x + x, 
        'y' : position.y + y
    })

}
function readPosition(data){
    position = data.val();
    console.log(position.x);
    goldball.x =  position.x;
    goldball.y = position.y;
}
function showError(){
    console.log("Error in wrriting to the database")
}