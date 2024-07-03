//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누름 게임시작
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호 < 유저번호 Down!!
//랜던번호 > 유저번호 Up!!
//Reset 버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다 쓰면 게임이 끝난다.(더이상 추측 불가, 버튼이 disable)
//유저가 1과 100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.


let computerNum = 0;
let playButton = document.getElementById("play_button");
let userInput = document.getElementById("user_input");
let resultAre = document.getElementById("result_are");
let resetButton = document.getElementById("reset_button");
let chances = 3;
let gameOVer = false;
let history = [];
let An = document.getElementById("An");
let chanceAre = document.getElementById("chances_are");
let AnAre = document.getElementById("An_are");
let imgSRC = document.getElementById("main-img");



userInput.addEventListener("focus", function(){
    userInput.value = "";
})

resetButton.addEventListener("click", reset);



function reset(){    
    userInput.value = "";
    pickRandomNum();
    chances = 3;
    playButton.disabled = false;
    gameOVer = false;
    chanceAre.textContent = `남은 목숨: ${chances}번`;
    history = [];
    AnAre.textContent = "입력한 답 :";
    resultAre.textContent = "목숨을 걸어라...";
    imgSRC.src = "./img/곤지암.png";
    
}

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
    An.textContent = `정답 : ${computerNum}`;
}

playButton.addEventListener("click", play);

function play(){
    let userValue = userInput.value;

    if(userValue < 1 || userValue > 100){
        resultAre.textContent = "이번 한번은 용서해 주지..."
        return;
    }
    if(history.includes(userValue)===true){
        resultAre.textContent = "목숨이 아깝지 않나? 크킄"
        return;
    }

    history.push(userValue);


    chances--;
    chanceAre.textContent = `남은 목숨 : ${chances}개`;
    console.log(chances);

    if(userValue < computerNum){
        resultAre.textContent = "Up...";
        console.log("Up!!!")
    }
    else if(userValue > computerNum){
        resultAre.textContent = "Down...";
        console.log("Down!!!")
    }
    else{
        resultAre.textContent = "크크크 운이 좋군...";
        playButton.disabled = true;
        
    }

    if(chances == 0 && userValue != computerNum){   
        gameOVer = true;
        resultAre.textContent = "죽어!!!!!!";
        imgSRC.src = "https://img.jjang0u.com/data4/coms/160/202106/06/e8/273690957a3f0673832f60f90aa184c3_633729.gif";
    }
    if(gameOVer==true){
        playButton.disabled = true;
    }
    AnAre.textContent = `바친 피 : ${history}`;
}













pickRandomNum();


