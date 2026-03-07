let Hero1 = "";
let Hero2 = "";

let currentPlayer = 1;

let H1health = 100;
let H2health = 100;

function SelectHero(HeroName) {

    if (Hero1 === "") {
        Hero1 = HeroName;
        document.querySelector(".hero1").innerText = "PLAYER 1 HERO : " + HeroName;
    }

    else if (Hero2 === "") {
        Hero2 = HeroName;
        document.querySelector(".hero2").innerText = "PLAYER 2 HERO : " + HeroName;
    }
}

function StartBattle() {

    if (Hero1 === "" || Hero2 === "") {
        alert(" Both Players Must Choose A Hero !!! ");
        return;
    }

    document.querySelector(".overlay").style.display = "flex";
    document.querySelector(".BattleArea").style.display = "block";

    document.querySelector(".P1health").innerText = Hero1 + " HEALTH : " + H1health;
    document.querySelector(".P2health").innerText = Hero2 + " HEALTH : " + H1health;

    document.querySelector(".TurnText").innerText = "PLAYER 1 TURN";
}

function Attack(damage) {
    if (H1health <= 0 || H2health <= 0) {
        return;
    }

    if (currentPlayer === 1) {
        H2health = H2health - damage;
        document.querySelector(".ActionText").innerText = Hero1 + " DEALT " + damage + " TO " + Hero2;
        currentPlayer = 2;
    }
    else if (currentPlayer === 2) {
        H1health = H1health - damage;
        document.querySelector(".ActionText").innerText = Hero2 + " DEALT " + damage + " TO " + Hero1;
        currentPlayer = 1;
    }
    else {
        document.querySelector(".ActionText").innerText = " PLAYER MUST CHOOSE A ATTACK";
    }
    if (H1health < 0) {
        H1health = 0;
    }
    
    if (H2health < 0) {
        H2health = 0;
    }
    
    document.querySelector(".P1health").innerText = Hero1 + " HEALTH : " + H1health;
    
    document.querySelector(".P2health").innerText = Hero2 + " HEALTH : " + H2health;
    
    document.querySelector(".TurnText").innerText = "PLAYER " + currentPlayer + " TURN";
    
    if(H1health===0){
        document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 2 !!! ";
    }
    
    if(H2health===0){
        document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 1 !!! ";
    }
}

// if (H1health < 0) {
//     H1health = 0;
// }

// if (H2health < 0) {
//     H2health = 0;
// }

// document.querySelector(".P1health").innerText = Hero1 + " HEALTH : " + H1health;

// document.querySelector(".P2health").innerText = Hero2 + " HEALTH : " + H2health;

// document.querySelector("TurnText").innerText = "PLAYER " + currentPlayer + " TURN";

// if(H1health===0){
//     document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 2 !!! ";
// }

// if(H2health===0){
//     document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 1 !!! ";
// }