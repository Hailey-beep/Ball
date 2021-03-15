var ball, database, change, readVal;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    change = database.ref("ball/position");
    change.on("value",read,error);
}

function draw(){
    background("white");
    if(readVal !== undefined) {
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
        drawSprites();
    }
}

function changePosition(x,y){
    change.set({
        'x':readVal.x+x,
        'y':readVal.y+y
    })
}

function read(data) {
    readVal = data.val();
    ball.x = readVal.x;
    ball.y = readVal.y;
    console.log(readVal)
}

function error() {
    console.log("error")
}
