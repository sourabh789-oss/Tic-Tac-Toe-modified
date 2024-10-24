// create all the audio 
console.log("javascript running ");
const music = new Audio("tic tac toe/winning.wav");
const audioturn = new Audio("tic tac toe/ting.mp3");
const gameover = new Audio("tic tac toe/gameover.mp3");
let yourturn = "X";
let isgameover = false;
let createcanvas = [];
let score1 = 0;
let score2 = 0;
let celebration;

// now we will handle form user input 

const submitbtn = document.getElementById('sub');
let objecte = {};


submitbtn.addEventListener('click', (event) => {


    event.preventDefault();// for not take any prevent default action it will move  to the game 

    objecte.yourname = document.getElementById('your').value;
    objecte.yourchoice = document.getElementById('yourchoice').value;
    objecte.opponentname = document.getElementById('opponent').value;
    objecte.opponentchoice = document.getElementById('opponentchoice').value;

    if (!objecte.yourname || !objecte.opponentname) {// if maine dono name dale ha to condition false hojayegi 

        alert('please fill out the form');

    }

    if (objecte.yourchoice === objecte.opponentchoice) {
        alert('Heyy  You can not both  select the same value Please choose different value');
        return;// now it can not submit the form until you and your opponent not select the unique value 
    }


    const userinfo = document.getElementsByClassName('userinfo')[0];
    userinfo.style.visibility = "hidden";
    userinfo.style.zIndex = -1;

    const gamecontainer = document.getElementsByClassName('gamecontainer')[0];
    gamecontainer.style.filter = 'blur(0px)';
    gamecontainer.style.zIndex = 1;
  document.getElementsByClassName('scorecard')[0].style.visibility="visible";
    setusername();

});








// function to change the turn 
const changeturn = () => {


    return yourturn = yourturn === "X" ? "O" : "X";// if x dala to ab o enter krdo nahi to o dala to x enter krdo 

}


// function to check the win 
const checkwin = () => {

    let boxtext = document.getElementsByClassName('boxtext');
    // create array of objects to check all win condition 
    let wins = [
        [0, 1, 2, -2, 5, 0],
        [3, 4, 5, -2, 15, 0],
        [6, 7, 8, -3, 25, 0],
        [0, 3, 6, 16, 13, 90],
        [1, 4, 7, 16, 2, 90],
        [2, 5, 8, 16, -7, 90],
        [0, 4, 8, -10, -12.45, 224.5],
        [2, 4, 6, 12, -9, 134.3],
    ];

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) { // e[0] represent for first value of [0,1,2] is 0 e[1] is 1 e[2] is 2 
            // now to give winner x or 0

            let winner = boxtext[e[0]].innerText === objecte.yourchoice ? objecte.yourname : objecte.opponentname// it will give the winner name based on input

            document.querySelector('.info').innerText = winner + " won "

            isgameover = true;// after that the winner is final and both the user can not select the x o after the checkwin call 
            scoreupdate(winner);// after winner the scoreupdate is updated ;
            music.currentTime = 0;
            music.play();




            document.querySelector('.line').style.width = "25vw";
            document.querySelector('.line').style.transform = ` rotate(${e[5]}deg) translate(${e[3]}vw , ${e[4]}vw) `


            ongamewin();


        }



    })



}

const createconfetti = () => {

    const canvas = document.getElementById('can');
    canvas.width = 800;
    canvas.height = 800;
    // canvas.style.visibility = "visible";
    if (celebration) {// if celebration kuch value ha to true then false in beginning it will give false 
        clearInterval(celebration);
    }

    // now in second time after calling 2 time createconfetti func then first it works clearinterval(celebration ) then it works the setinterval function 
    celebration = setInterval(() => {
        // createcanvas.push(canvas);
        confettibutton = confetti.create(canvas);

        confettibutton();
    }, 1000

    );



};


// main logic to game run 
let boxes = document.getElementsByClassName('box');
// now convert boxes ki box class ko array mein use from method then we use array method .forEach 
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');// we select individual class of .boxtext not use querySelectorAll   element isliye use kiya kyoki meko jis box pr click krunga uska andar x ya o dalna ha to hum document. ki jagah element. use krenge 

    element.addEventListener('click', () => {
        if (!(isgameover) && (boxtext.innerText === '')) {
            boxtext.innerText = yourturn;
            changeturn();
            audioturn.play();
            checkwin();
            if (!isgameover) {
                document.getElementsByClassName('info')[0].innerText = "turn for " + yourturn;
            }
        }

    })


}
)






// function to reset all the game

let btn = document.getElementById('reset');

btn.addEventListener('click', () => {

    let boxtexts = document.querySelectorAll('.boxtext');

    Array.from(boxtexts).forEach(element => {
        element.innerText = "";// for all boxes text is empty 


    }
    );
    yourturn = "X";
    isgameover = false;
    music.pause();
    document.getElementsByClassName('info')[0].innerText = "Turn for " + yourturn;// for always turn for x
    document.getElementsByClassName(' imgbox')[0].getElementsByTagName('img')[0].style.width = '0px';
    document.querySelector('.line').style.width = "0";


    canvas = document.getElementById('can');
    canvas.style.visibility = "hidden";// for remove the congratulation scene 


}


);

const ongamewin = () => {// when we have winner 

    document.getElementById('can').style.visibility = "visible";
    createconfetti();

}


function setusername() {
    let td1 = document.getElementsByTagName('td')[0];
    let td3 = document.getElementsByTagName('td')[2];

    setTimeout(() => {
        td1.style.transition = "all ease-out 0.4s";
        td3.style.transition = "all ease-out 0.4s";
    }, 2000
    );
    td1.innerText = `${objecte.yourname}`;
    td3.innerText = `${objecte.opponentname}`;



}

function scoreupdate(winner) {

    let td2 = document.getElementsByTagName('td')[1];
    let td4 = document.getElementsByTagName('td')[3];
    td2.innerText = `${score1}`;
    td4.innerText = `${score2}`;
    if (winner === objecte.yourname) {

        score1++;
        td2.innerText = `${score1}`;
    }
    else {
        score2++;
        td4.innerText = `${score2}`;
    }



}







