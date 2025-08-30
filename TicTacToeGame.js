let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn = true;
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
  turn = true;
  enableBoxes();
    msgContainer.classList.add("hide");  
    
  
  const winAudio = document.getElementById("win-audio");
  winAudio.pause();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.innerText = "X";
            turn = false;
        } else {
            box.innerText = "O";
            turn = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
  for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! ${winner} is the Winner`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  const winAudio = document.getElementById("win-audio");
  winAudio.pause();
  winAudio.currentTime = 0;
  winAudio.volume = 0.1;
  winAudio.play();

  const flash = document.getElementById("flash");
  flash.classList.remove("hide");

  setTimeout(() => {
    flash.classList.add("hide");
  }, 500);

  launchConfetti(); // 🎉
};

function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
            }
        }
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);