var nPageNum = 1;
var canvas;
var context;
var SIGHT;
var bMode = true;
var nAmmoCount = 0;
var nRightCount = 0;


var x;
var y;

var currX;
var currY;

// -------- Anonymous function -------
// Description: Load function that adds listener to the next button
// Parameters: None
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
$(function () {
    $("#next").on("click", nextPage);
});

// -------- nextPage -------
// Description: Increases the page counter and calls the function that loads the info.
// Parameters: None
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function nextPage(){
    nPageNum++;
    loadInfo();
}

// -------- loadInfo -------
// Description: Loads the correct info for each page.
// Parameters: None
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function loadInfo() {
    if (nPageNum === 2) {
        $("#text").text("לפחות הצלחת להרוויח טיפה כסף? לך תקנה לנו תחמושת!​")
    }
    if (nPageNum === 3) {
        $("#textArea").hide();
        $("#buyArea").show();
        $("#buyBtn").on("click", function(){
            nAmmoCount++;
            $("#ammo").text(nAmmoCount+"/4")
            $("#coins").text(40-(nAmmoCount*10))
            if (nAmmoCount === 4) {
                $("#buyBtn").on("click", nextPage).text("המשך")
            }
        });
    }
    if (nPageNum === 4) {
        $("#buyArea").hide();
        $("#textArea").show();
        $("#text").text("תשתמש בתחמושת שקנית ותכוון על המטרות! תבחר את מצב הירי המתאים עם לחיצה על הקליק הימני ותירה על כל מטרה עם לחיצה עליה​").css("font-size", "2vw")
    }
    if (nPageNum === 5) {
        setTimeout(() => {
            initGame();
        }, 100);
    }
}

// -------- initGame -------
// Description: Hides the start screen and shows the game screen and loads the canvas. Adds listeners.
// Parameters: None
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function initGame() {
    //Updates the screen
    $("body").css("background-image", "url(media/gameBack.png)");
    $(".startScreen").hide();
    $("#gameScreen").show();
    $("#text2").text("צנחן, למה אתה מחכה? תבחר את מצב הירי המתאים ותירה כבר! ​​")

    //Loads the canvas
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", screen.width);
    canvas.setAttribute("height", screen.height);
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Loads the pictures

    SIGHT = new Image();
    SIGHT.src = "media/sightempt3.png";

    HOUSE = new Image();
    HOUSE.src = "media/house.png";

    WALL = new Image();
    WALL.src = "media/wall.png";

    mode = new Image();
    mode.src = "media/modeB.png";

    tank = new Image();
    tank.src = "media/tank.png";

    //Calls run function
    window.requestAnimationFrame(run);

    //Adds listeners
    $("body").on("mousemove", getMousePos);
    $("body").on("click", shootRocket);
    $("body").on('contextmenu', function(e) {
        e.preventDefault();
        bMode = !bMode;
        changeMode();
    });

}

// -------- run -------
// Description: draws the images on the canvas.
// Parameters: None
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function run() {
    //Clears canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Draws images
    context.drawImage(HOUSE, 400, 600, 200, 180);
    context.drawImage(WALL, 100, 600, 200, 180);
    context.drawImage(mode, 10, 10, 200, 100);
    context.drawImage(tank, 20, 630, 150, 150);
    context.drawImage(SIGHT, x, y, 200, 200);

    //runs the function again on every frame
    window.requestAnimationFrame(run);

}

// -------- getMousePos -------
// Description: Saves the pointer location on every mouse move.
// Parameters: event
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function getMousePos(event) {
    x = event.clientX - 110;
    y = event.clientY - 105;

    // console.log(x,y)
}

// -------- shootRocket -------
// Description: Shows the rocket gif in the correct location, and calls the function that handles collision.
// Parameters: event
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function shootRocket(event) {
    $("body").off("click");
    
    checkColision(bMode);

    var currX = (x-40)/canvas.width;
    var currY = (y-10)/canvas.height;
    
    //Shows the rocket animation in the correct location
    $("#rocket").show().css({
        'height' : '30vh',
        'width' : '30vh',
        'left' : (currX*100)+'vw',
        'top' : (currY*100)+'vh',     
    }).animate({
        'height' : '0vh',
        'width' : '0vh',
        'left' : ((currX*100)+12)+'vw',
        'top' : ((currY*100)+20)+'vh',     
    }, 1000);

    setTimeout(() => {
        $("body").on("click", shootRocket);
    }, 1000);
}

// -------- checkColision -------
// Description: Checks if the player hit one of the targets, and then does the correct action
// Parameters: bool
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function checkColision(bool) {
    //If clicked on house
    if (x > 320 && x < 480 && y > 520 && y < 640 && HOUSE.src === "http://"+window.location.hostname+":"+window.location.port+"/media/house.png"){
        setTimeout(() => {
            //If didn't shoot with correct mode
            if (!bool){
                HOUSE.src = "media/houseWall.png";
                $("#text2").text("מה אתה עושה? בחרת את מצב הירי הלא נכון! נסה שוב")
                setTimeout(() => {
                    HOUSE.src = "media/house.png"
                }, 2000);
            //Shot with correct mode
            } else {
                HOUSE.src = "media/houseFire.png";
                $("#text2").text("פגיעה טובה! אולי עוד יצא ממך משהו")
                nRightCount++;
            }
        }, 1000);    
    }

    //If clicked on wall
    if (x > 40 && x < 170 && y > 520 && y < 650 && WALL.src === "http://"+window.location.hostname+":"+window.location.port+"/media/wall.png"){
        setTimeout(() => {
            //If shot with correct mode
            if (!bool){
                WALL.src = "media/wallD.png";
                $("#text2").text("טוב שלך! הטנק שלנו יכול להתקדם עכשיו")
                nRightCount++;
            //Didnt shoot with correct mode
            } else {
                WALL.src = "media/wallF.png";
                $("#text2").text("אני לא מאמין... עכשיו הטנק שלנו ישאר תקוע שם לנצח! נסה שוב")
                setTimeout(() => {
                    WALL.src = "media/wall.png";
                }, 2000);
            } 
        }, 1000);
    }
    setTimeout(() => {
        if (nRightCount === 2) {
            alert("win")
        }        
    }, 1500);
}


// -------- changeMode -------
// Description: Changes the mode picture.
// Parameters: None.
// Programmer: Omer Cohen
// Date: 13.8.2020
// -----------------------------------
function changeMode() {
    if (bMode) {
        mode.src = "media/modeB.png";
    } else {
        mode.src = "media/modeM.png";
    }
}


