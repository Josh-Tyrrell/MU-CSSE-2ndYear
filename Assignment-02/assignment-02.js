myStorage = window.localStorage;
if (!localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", 0);
}

$(".highscore").text(localStorage.getItem("highscore") < 10 ? `0${localStorage.getItem("highscore")}` : localStorage.getItem("highscore"));

const colors = ["red", "green", "blue", "yellow"];
let pattern = [];
let userPattern = [];
let gameStarted = false;
let score = 0;
let highscore = localStorage.getItem("highscore");


// Core of game - this will call all other functions
function gameLoop() {
    // Display new scores
    $(".current-score").text(score < 10 ? `0${score}` : score);
    $(".highscore").text(localStorage.getItem("highscore") < 10 ? `0${localStorage.getItem("highscore")}` : localStorage.getItem("highscore"));


    gameStarted = true;

    // Add a new color to pattern
    let newValue = colors[addRandomColor()];
    pattern.push(newValue);

    // Flash each color in pattern
    for (let i = 0; i < pattern.length; i++) {
        displayPattern(i, pattern);
    }

    // Get User Input
    setTimeout(() => {
        let d = new Date();
        let startTime = d.getTime();
        let checkingTime = setInterval(() => {
            d = new Date();
            let endTime = d.getTime();

            if (endTime - startTime > 5000) {
                gameOver();
                clearInterval(checkingTime);
            }
        }, 50);
        $(".circle").click(function () {
            playGame($(this));
            clearInterval(checkingTime);
        });
    }, (pattern.length > 1 ? pattern.length - 1 : 0) * speedUpGame() + 100);
}


// Display a flash by adding and removing a class with a small timeout
function displayPattern(i, pattern) {
    setTimeout(() => {
        $("." + pattern[i]).removeClass("flash");
        setTimeout(() => {
            $("." + pattern[i]).addClass("flash");
        }, 50);
    }, (i) * speedUpGame());
}


// Get random number for index of pattern array
function addRandomColor() {
    let random = Math.floor(Math.random() * 4);
    return random;
}


// Get user input and check if it's correct.
function playGame(target) {
    $(".circle").removeClass("flash");
    let values = $(target).attr("class").split(" ");
    let value = values[1];


    userPattern.push(value);

    // If not the last item in pattern, start a 5s timer - needs to be done to have a timer for each color in pattern.
    if (userPattern.length != pattern.length) {
        d = new Date();
        let startTime = d.getTime();

        let clickedCheckingTime = setInterval(() => {
            d = new Date();
            let endTime = d.getTime();

            if (endTime - startTime > 5000) {
                gameOver();
                clearInterval(clickedCheckingTime);
            }

            $(".circle").click(function () {
                clearInterval(clickedCheckingTime);
            });
        }, 50);
    } else {
        clearInterval(window.clickedCheckingTime);
    }

    // Check if input is correct.
    if (userPattern[userPattern.length - 1] == pattern[userPattern.length - 1]) {
        if (userPattern.length == pattern.length) {
            userPattern = [];
            $(".circle").unbind("click");
            score++;
            if (score > highscore) {
                localStorage.setItem("highscore", score);
            }
            gameLoop();
        }

    } else {
        gameOver(value);
        clearInterval(window.clickedCheckingTime);
    }
}

// Start game and change red dot to green.
$("button").click(function () {
    if (gameStarted === false) {
        $(".circle").removeClass("end-game-flash");
        pattern = [];
        userPattern = [];

        const greenLight = {
            "background-color": "green",
            "background-color": "#15ff00",
            "-webkit-box-shadow": "0px 0px 5px 0px rgb(71, 255, 71)",
            "-moz-box-shadow": "0px 0px 5px 0px rgb(71, 255, 71)",
            "box-shadow": "0px 0px 5px 0px rgb(71, 255, 71)"
        }

        $(".lil-dot").css(greenLight);

        gameStarted = true;
        setTimeout(() => {
            gameLoop();
        }, 3000);
    }
});


// Display to user that game is over.
function gameOver(value = "circle") {
    $("." + value).removeClass("flash");
    setTimeout(() => {
        $(".circle").addClass("end-game-flash");
    }, 10);
    $(".circle").unbind("click");
    gameStarted = false;
    score = 0;
    $(".current-score").text("00");

    const redLight = {
        "background-color": "#ff0000",
        "-webkit-box-shadow": "0px 0px 5px 0px rgb(255, 71, 71)",
        "-moz-box-shadow": "0px 0px 5px 0px rgb(255, 71, 71)",
        "box-shadow": "0px 0px 5px 0px rgb(255, 71, 71)",
    }

    $(".lil-dot").css(redLight);
}


// Speed up game depending on user score
function speedUpGame() {
//    
    if (score > 4) {
        $(".flash").css("animation-duration: 0.8s");
        return 800;
    } else if (score > 8) {
        $(".flash").css("animation-duration: 0.6s");
        return 600;
    } else if (score > 12) {
        $(".flash").css("animation-duration: 0.4s");
        return 400;
    } else {
        return 1000;
    }
   
}