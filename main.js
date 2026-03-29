let Hero1 = "";
let Hero2 = "";

let currentPlayer = 1;

let H1health = 100;
let H2health = 100;

let H1PowerPunch = 2;
let H2PowerPunch = 2;

let H1Ability = 1;
let H2Ability = 1;

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

    let P1img = document.querySelector(".P1Img");
    let P2img = document.querySelector(".P2Img");

    function GetHeroImage(hero) {
        if (hero === "THOR") {
            return "https://i.pinimg.com/1200x/f9/8b/a5/f98ba5fb08af2f270a98f37daeaafabb.jpg"
        }
        if (hero === "WOLVERINE") {
            return "https://i.pinimg.com/736x/09/06/a8/0906a83b59374a33b4c7da17c35feb93.jpg"
        }
        if (hero === "VENOM") {
            return "https://cdn.marvel.com/content/2x/venom_2021_1_announcement_coming_this_november.jpg"
        }
    }

    P1img.src = GetHeroImage(Hero1);
    P2img.src = GetHeroImage(Hero2);

    document.querySelector(".overlay").style.display = "flex";
    document.querySelector(".BattleArea").style.display = "block";

    document.querySelector(".P1health").innerText = Hero1 + " HEALTH : " + H1health;
    document.querySelector(".P2health").innerText = Hero2 + " HEALTH : " + H2health;

    document.querySelector(".TurnText").innerText = "PLAYER 1 TURN";
    UpdateTurnHighlight();
    UpdateBtn();
}

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
        H2Stun--;
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
        RealDamage = Math.floor(RealDamage * 2);
        H1Bersek--;

        if (H1Bersek === 0) {
            document.querySelector(".Status").innerText = " WOLVERINE BERSERKER MODE ENDED "
        }
    }

    if (currentPlayer === 2 && H2Bersek > 0) {
        RealDamage = Math.floor(RealDamage * 2);
        H2Bersek--;

        if (H2Bersek === 0) {
            document.querySelector(".Status").innerText = " WOLVERINE BERSERKER MODE ENDED "
        }
    }

    if (currentPlayer === 1) {

        if (DodgeRoll < DodgeChance) {
            document.querySelector(".ActionText").innerText = Hero2 + " DODGED THE ATTACK OF " + Hero1 + " !!! ";
        }

        else {
            H2health = H2health - RealDamage;
            HitImpact();
            if (type === 1) {
                document.querySelector(".ActionText").innerText = Hero1 + " USED PUNCH AND IT DEALS " + RealDamage + " TO " + Hero2;
            }

            else if (type === 2) {
                H1PowerPunch--;
                document.querySelector(".ActionText").innerText = Hero1 + " USED SUPER PUNCH ( SHOCK WAVE DEALS +5 DMG ) IT DEALS " + RealDamage + " TO " + Hero2;
            }

            else if (type === 3) {
                H1Ability--;

                if (Hero1 === "THOR") {
                    let LightingDamage = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
                    H2health = H2health - LightingDamage;
                    alert(" THOR SUMMONS LIGHTNING FROM THE SKY INTO " + Hero2 + " ⚡️ ⚡️ ⚡️ ");
                    H2Stun = 1;
                    document.querySelector(".ActionText").innerText = " THOR SUMMONS LIGHTING AND IT DEALS " + LightingDamage + " AND " + Hero2 + " STUNS FOR ONE TURN !!! ";
                }

                else if (Hero1 === "WOLVERINE") {
                    let BersekHeal = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
                    H1health = BersekHeal + H1health;
                    alert(" WOLVERINE ENTERED BERSERKER MODE ");
                    H1Bersek = 2;
                    document.querySelector(".ActionText").innerText = " WOLVERINE ENTERED BERSERKER MODE AND HEALS " + BersekHeal + " HP AND ATTACK BOOST 2X FOR 2 TURNS ";
                }

                else if (Hero1 === "VENOM") {
                    let VenomBite = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
                    H2health = H2health - VenomBite;
                    alert(" VENOM USES POISONOUS BITE ");
                    let VenomHeal = Math.floor(VenomBite / 2);
                    H1health = VenomHeal + H1health;
                    document.querySelector(".ActionText").innerText = " VENOM USES VENOM BITE AND IT DEAL " + VenomBite + " AND HEALS HALF OF THE DAMAGE "
                }
            }
            let p2 = document.querySelector(".P2health");

            p2.classList.add("hit");
            p2.classList.add("DamageFlash");

            setTimeout(function () {
                p2.classList.remove("hit");
            }, 250);

            setTimeout(function () {
                p2.classList.remove("DamageFlash");
            }, 200)
        }
        currentPlayer = 2;
    }
    else if (currentPlayer === 2) {

        if (DodgeRoll < DodgeChance) {
            document.querySelector(".ActionText").innerText = Hero1 + " DODGED THE ATTACK OF " + Hero2 + " !!! ";
        }

        else {
            H1health = H1health - RealDamage;
            HitImpact();
            if (type === 1) {
                document.querySelector(".ActionText").innerText = Hero2 + " USED PUNCH AND IT DEALS " + RealDamage + " TO " + Hero1;
            }

            else if (type === 2) {
                H2PowerPunch--;
                document.querySelector(".ActionText").innerText = Hero2 + " USED POWER PUNCH ( SHOCK WAVE DEALS +5 DMG ) IT DEALS " + RealDamage + " TO " + Hero1;
            }

            else if (type === 3) {

                H2Ability--;

                if (Hero2 === "THOR") {
                    let LightingDamage = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
                    H1health = H1health - LightingDamage;
                    alert(" THOR SUMMONS LIGHTNING FROM THE SKY INTO " + Hero2 + " ⚡️ ⚡️ ⚡️ ");
                    H1Stun = 1;
                    document.querySelector(".ActionText").innerText = " THOR SUMMONS LIGHTNING AND IT DEALS " + LightingDamage + " AND " + Hero2 + " STUNS FOR ONE TURN !!! ";
                }

                else if (Hero2 === "WOLVERINE") {
                    let BersekHeal = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
                    H2health = BersekHeal + H2health;
                    alert(" WOLVERINE ENTERED BERSERKER MODE ");
                    H2Bersek = 2;
                    document.querySelector(".ActionText").innerText = " WOLVERINE ENTERED BERSERKER MODE AND HEALS " + BersekHeal + " HP AND ATTACK BOOST 2X FOR 2 TURNS ";
                }

                else if (Hero2 === "VENOM") {
                    let VenomBite = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
                    H1health = H1health - VenomBite;
                    alert(" VENOM USES POISONOUS BITE ");
                    let VenomHeal = Math.floor(VenomBite / 2);
                    H2health = VenomHeal + H2health;
                    document.querySelector(".ActionText").innerText = " VENOM USES VENOM BITE AND IT DEAL " + VenomBite + " AND HEALS HALF OF THE DAMAGE "
                }
            }
            let p1 = document.querySelector(".P1health");

            p1.classList.add("hit");
            p1.classList.add("DamageFlash");

            setTimeout(function () {
                p1.classList.remove("hit");
            }, 250);

            setTimeout(function () {
                p1.classList.remove("DamageFlash");
            }, 200)
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

    UpdateBtn();
    UpdateTurnHighlight();

    if (H1health === 0) {
        document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 2 !!! ";
    }

    if (H2health === 0) {
        document.querySelector(".Result").innerText = " THE WINNER IS PLAYER 1 !!! ";
    }
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