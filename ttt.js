const boxes = document.querySelectorAll(".box");
const curr_p = document.querySelector(".player");
const newGmBtn = document.querySelector(".btn");

let curr_player;
let gameGrid;

const winningpos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//func to initialise game
function initG() {
    curr_player = "O";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //remove green color
        box.classList = `box box${index+1}`;
    });
    newGmBtn.classList.remove("active");
    curr_p.innerText = `Current Player - ${curr_player}`;
}
initG();

function swap() {
    if(curr_player === "X") curr_player = "O";
    else curr_player = "X";
    curr_p.innerText = `Current Player - ${curr_player}`;
}

function check() {
    let w = "";
    winningpos.forEach((pos) => {
        if( (gameGrid[pos[0]] !== "" || gameGrid[pos[1]] !== "" || gameGrid[pos[2]] !== "") && (gameGrid[pos[0]] === gameGrid[pos[1]]) && (gameGrid[pos[1]] === gameGrid[pos[2]]) ) {
            if(gameGrid[pos[0]] === "X") w = "X";
            else w = "O";

            //winner found => disable pointerEvents
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });

    if(w !== "") {
        curr_p.innerText = `Winner of the Game is - ${w}`;
        newGmBtn.classList.add("active");
        return;
    }

    let fillb = 0;
    gameGrid.forEach((box) => {
        if(box !== "") fillb++;
    });
    if(fillb === 9) {
        curr_p.innerText = `Game Tied`;
        newGmBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        gameGrid[index] = curr_player;
        boxes[index].innerText = curr_player;
        boxes[index].style.pointerEvents = "none";
        //swap
        swap();
        //check for win
        check();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGmBtn.addEventListener("click", initG);