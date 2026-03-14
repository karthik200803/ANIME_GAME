let Hero1 = "";
let Hero2 = "";

let currentPlayer = 1;

let H1health = 100;
let H2health = 100;

let H1PowerPunch = 2;
let H2PowerPunch = 2;

let H1Ability = 0;
let H2Ability = 0;

let H1Stun = 0;
let H2Stun = 0;

let H1Bersek = 0;
let H2Bersek = 0;

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
    document.querySelector(".P2health").innerText = Hero2 + " HEALTH : " + H2health;

    document.querySelector(".TurnText").innerText = "PLAYER 1 TURN";
}

function Attack(type) {
    if (H1health <= 0 || H2health <= 0) {
        return;
    }

    if (currentPlayer === 1 && H1Stun > 0) {
        H1Stun--;
        document.querySelector(".ActionText").innerText = Hero1 + " IS STUNNED DUE TO THOR'S LIGHTING AND MISSES THE TURN ";
        currentPlayer = 2;
        return;
    }

    if (currentPlayer === 2 && H2Stun > 0) {
        H1Stun--;
        document.querySelector(".ActionText").innerText = Hero2 + " IS STUNNED DUE TO THOR'S LIGHTING AND MISSES THE TURN ";
        currentPlayer = 1;
        return;
    }

    if (type === 2) {
        if (currentPlayer === 1 && H1PowerPunch <= 0) {
            document.querySelector(".ActionText").innerText = Hero1 + " HAS NO POWER PUNCH LEFT ";
            return;
        }

        else if (currentPlayer === 2 && H2PowerPunch <= 0) {
            document.querySelector(".ActionText").innerText = Hero2 + " HAS NO POWER PUNCH LEFT ";
            return;
        }
    }

    if (type === 3) {
        if (currentPlayer === 1 && H1Ability <= 0) {
            document.querySelector(".ActionText").innerText = Hero1 + " HAS NO ABILITY LEFT ";
            return;
        }

        else if (currentPlayer === 2 && H2Ability <= 0) {
            document.querySelector(".ActionText").innerText = Hero2 + " HAS NO ABILITY LEFT ";
            return;
        }
    }
    let RealDamage = CalculateDamage(type);
    let DodgeChance = 20;
    let DodgeRoll = Math.floor(Math.random() * 100);

    if (currentPlayer === 1 && H1Bersek > 0) {
        RealDamage = Math.floor(RealDamage * 1.2);
        H1Bersek--;
    }

    if (currentPlayer === 2 && H2Bersek > 0) {
        RealDamage = Math.floor(RealDamage * 1.2);
        H2Bersek--;
    }

    if (currentPlayer === 1) {

        if (DodgeRoll < DodgeChance) {
            document.querySelector(".ActionText").innerText = Hero2 + " DODGED THE ATTACK OF " + Hero1 + " !!! ";
        }

        else {
            H2health = H2health - RealDamage;
            if (type === 1) {
                document.querySelector(".ActionText").innerText = Hero1 + " USED PUNCH AND IT DEALS " + RealDamage + " TO " + Hero2;
            }

            else if (type === 2) {
                H1PowerPunch--;
                document.querySelector(".ActionText").innerText = Hero1 + " USED SUPER PUNCH ( SHOCK WAVE DEALS EXTRA 10DMG ) IT DEALS " + RealDamage + " TO " + Hero2;
                document.querySelector(".Remaining-Atk1").innerText = Hero1 + " REMAINING POWER PUNCH : " + H1PowerPunch;
            }

            else if (type === 3) {
                H1Ability--;

                if (Hero1 === "THOR"){
                    none; //here we have to edit tomorrow 
                }
            }
        }
        currentPlayer = 2;
    }
    else if (currentPlayer === 2) {

        if (DodgeRoll < DodgeChance) {
            document.querySelector(".ActionText").innerText = Hero1 + " DODGED THE ATTACK OF " + Hero2 + " !!! ";
        }

        else {
            H1health = H1health - RealDamage;

            if (type === 1) {
                document.querySelector(".ActionText").innerText = Hero2 + " USED PUNCH AND IT DEALS " + RealDamage + " TO " + Hero1;
            }

            else if (type === 2) {
                H2PowerPunch--;
                document.querySelector(".ActionText").innerText = Hero2 + " USED POWER PUNCH ( SHOCK WAVE DEALS EXTRA 10DMG ) IT DEALS " + RealDamage + " TO " + Hero1;
                document.querySelector(".Remaining-Atk1").innerText = Hero2 + " REMAINING POWER PUNCH : " + H2PowerPunch;
            }

            else if (type === 3) {
                H2Ability--;
                document.querySelector(".ActionText").innerText = Hero2 + " USED HIS ABILITY IT DEALS " + RealDamage + " TO " + Hero1;
                document.querySelector(".Remaining-Atk2").innerText = Hero1 + " REMAINING ABILITY : " + H2Ability;
            }
        }
        currentPlayer = 1;
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

    if (H1health === 0) {
        document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 2 !!! ";
    }

    if (H2health === 0) {
        document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 1 !!! ";
    }
}

function ExitBattle() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".BattleArea").style.display = "none"
}

let heroIndex = 0;

function UpdateSlider() {

    let track = document.querySelector(".hero-track");

    track.style.transform = "translateX(-" + (heroIndex * 240) + "px)";
}

function NextHero() {

    let cards = document.querySelectorAll(".hero-card");

    heroIndex++;

    if (heroIndex >= cards.length) {
        heroIndex = 0;
    }

    UpdateSlider();
}

function PrevHero() {

    let cards = document.querySelectorAll(".hero-card");

    heroIndex--;

    if (heroIndex < 0) {
        heroIndex = cards.length - 1;
    }

    UpdateSlider();
}