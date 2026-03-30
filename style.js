function UpdateTurnHighlight() {
    let p1 = document.querySelector(".top");
    let p2 = document.querySelector(".bottom");

    p1.classList.remove("active-turn");
    p2.classList.remove("active-turn");

    if (currentPlayer === 1) {
        p1.classList.add("active-turn");
    } else {
        p2.classList.add("active-turn");
    }
}

function HitImpact() {
    let Area = document.querySelector(".BattleArea");
    Area.classList.add("Shake");

    setTimeout( () =>  {
        Area.classList.remove("Shake");
    }, 200);
}

function UpdateBtn() {

    let Powerpunch;
    let Ability;
    let Hero;
    let AbilityName;

    if (currentPlayer === 1) {
        Powerpunch = H1PowerPunch;
        Ability = H1Ability;
        Hero = Hero1;
    }

    else {
        Powerpunch = H2PowerPunch;
        Ability = H2Ability;
        Hero = Hero2;
    }

    let Powerbtn = document.querySelector(".atk2");
    let Abilitybtn = document.querySelector(".atk3");

    Powerbtn.innerText = " POWER PUNCH ( " + Powerpunch + " ) "



    if (Powerpunch === 0) {
        Powerbtn.disabled = true;
    }
    else {
        Powerbtn.disabled = false;
    }

    if (Hero === "THOR") {
        AbilityName = "SUMMON LIGHTNING";
    }

    else if (Hero === "WOLVERINE") {
        AbilityName = "BERSERKER MODE";
    }

    else if (Hero === "VENOM") {
        AbilityName = "VENOM";
    }

    Abilitybtn.innerText = AbilityName + " ( " + Ability + " )";

    if (Ability === 0) {
        Abilitybtn.disabled = true;
    }
    else {
        Abilitybtn.disabled = false;
    }
}

let heroIndex = 0;

function UpdateSlider() {

    let track = document.querySelector(".hero-track");

    let cardWidth = window.innerWidth <= 768 ? 180 : 240;
track.style.transform = "translateX(-" + (heroIndex * cardWidth) + "px)";
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

function ExitBattle() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".BattleArea").style.display = "none"
}