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

let H1Charge = 0;
let H2Charge = 0;

let H1ThorCharge = 0;
let H2ThorCharge = 0;

function SelectHero(HeroName) {

    if (Hero1 === "") {
        Hero1 = HeroName;
        document.querySelector(".hero1").innerText = "PLAYER 1 HERO : " + HeroName;
        document.querySelector(".hero1").classList.add("H1Selected");
    }

    else if (Hero2 === "") {
        if (HeroName === Hero1) {
            alert("Both Player Cannot Choose The Same Hero");
            return;
        }
        Hero2 = HeroName;
        document.querySelector(".hero2").innerText = "PLAYER 2 HERO : " + HeroName;
        document.querySelector(".hero2").classList.add("H2Selected");
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

function Attack(type) {
    if (H1health <= 0 || H2health <= 0) {
        return;
    }

    // THOR ACTIVE ABILITY BLOCK <ACTIVE>
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
    // THOR ACTIVE ABILITY BLOCK </ACTIVE>

    // CHECKING REMAINING TURN OF POWER PUNCH AND ABILITY
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
    // CHECKING REMAINING TURN OF POWER PUNCH AND ABILITY

    let RealDamage = CalculateDamage(type);

    // THOR PASSIVE ABILITY (3 TURN STORE → 4TH RELEASE)
    if (currentPlayer === 1 && Hero1 === "THOR") {

        if (H1Charge < 3) {
            let ChargeGain = Math.floor(Math.random() * 2) + 3; // 3–4

            H1ThorCharge += ChargeGain;
            H1Charge++;

            document.querySelector(".H1Passive_Status").innerText =
                "THOR CHARGING SPARKS (+" + ChargeGain + ") TOTAL: " + H1ThorCharge;
        }
        else {
            RealDamage = RealDamage + H1ThorCharge;

            document.querySelector(".H1Passive_Status").innerText =
                "⚡ THOR RELEASES " + H1ThorCharge + " LIGHTNING DAMAGE!";

            H1ThorCharge = 0;
            H1Charge = 0;
        }
    }

    if (currentPlayer === 2 && Hero2 === "THOR") {

        if (H2Charge < 3) {
            let ChargeGain = Math.floor(Math.random() * 2) + 3;

            H2ThorCharge += ChargeGain;
            H2Charge++;

            document.querySelector(".H2Passive_Status").innerText =
                "THOR CHARGING SPARKS (+" + ChargeGain + ") TOTAL: " + H2ThorCharge;
        }
        else {
            RealDamage = RealDamage + H2ThorCharge;

            document.querySelector(".H2Passive_Status").innerText =
                "⚡ THOR RELEASES " + H2ThorCharge + " LIGHTNING DAMAGE!";

            H2ThorCharge = 0;
            H2Charge = 0;
        }
    }
    // THOR PASSIVE ABILITY (3 TURN STORE → 4TH RELEASE)

    // WOLVERINE PASSIVE ABILITY (REGENERATION)
    if (currentPlayer === 1 && Hero1 === "WOLVERINE") {
        if (H1health < 100) {
            let WolHeal = Math.floor(Math.random() * 3) + 1;
            H1health = H1health + WolHeal;
            document.querySelector(".H1Passive_Status").innerText = " WOLVERINE REGENERATES " + WolHeal + " HP "
        }
    }
    if (currentPlayer === 2 && Hero2 === "WOLVERINE") {
        if (H2health < 100) {
            let WolHeal = Math.floor(Math.random() * 3) + 1;
            H2health = H2health + WolHeal;
            document.querySelector(".H2Passive_Status").innerText = " WOLVERINE REGENERATES " + WolHeal + " HP "
        }
    }
    // WOLVERINE PASSIVE ABILITY (/REGENERATION)

    // WOLVERINE ACTIVE ABILITY BLOCK <ACTIVE>
    if (currentPlayer === 1 && H1Bersek > 0) {
        RealDamage = Math.floor(RealDamage * 1.5);
        H1Bersek--;

        if (H1Bersek === 0) {
            document.querySelector(".Status").innerText = " WOLVERINE BERSERKER MODE ENDED "
        }
    }

    if (currentPlayer === 2 && H2Bersek > 0) {
        RealDamage = Math.floor(RealDamage * 1.5);
        H2Bersek--;

        if (H2Bersek === 0) {
            document.querySelector(".Status").innerText = " WOLVERINE BERSERKER MODE ENDED "
        }
    }
    // WOLVERINE ACTIVE ABILITY BLOCK </ACTIVE >

    let DodgeChance = 20;
    let DodgeRoll = Math.floor(Math.random() * 100);

    if (currentPlayer === 1) {

        if (DodgeRoll < DodgeChance) {
            document.querySelector(".ActionText").innerText = Hero2 + " DODGED THE ATTACK OF " + Hero1 + " !!! ";
        }

        else {
            // VENOM PASSIVE ABILITY ( REDUESED DAMAGE )
            if (Hero2 === "VENOM") {
                let OriginalDamage = RealDamage;
                let SymbioteShield = Math.floor(RealDamage * 0.2);
                RealDamage = RealDamage - SymbioteShield;
                document.querySelector(".H2Passive_Status").innerText = " VENOM'S SYMBIOTE SHIELD REDUSED " + SymbioteShield + " FROM " + OriginalDamage + " DAMAGE TOTAL DAMAGE : " + RealDamage;
            }
            // VENOM PASSIVE ABILITY ( REDUESED DAMAGE )

            H2health = H2health - RealDamage;
            HitImpact();

            if (type === 1) {
                document.querySelector(".ActionText").innerText = Hero1 + " USED PUNCH AND IT DEALS " + RealDamage + " TO " + Hero2;
            }

            else if (type === 2) {
                H1PowerPunch--;
                document.querySelector(".ActionText").innerText = Hero1 + " USED SUPER PUNCH ( SHOCK WAVE DEALS +5 DMG ) IT DEALS " + RealDamage + " TO " + Hero2;
            }

            // ACTIVE ABILITY BLOCK <ACTIVE ABILITY>
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
                    let BersekHeal = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                    H1health = BersekHeal + H1health;
                    alert(" WOLVERINE ENTERED BERSERKER MODE ");
                    H1Bersek = 2;
                    document.querySelector(".ActionText").innerText = " WOLVERINE ENTERED BERSERKER MODE AND HEALS " + BersekHeal + " HP AND ATTACK BOOST X1.5 FOR 2 TURNS ";
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
            //ACTIVE ABILITY BLOCK </ACTIVE ABILITY>

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
            // VENOM PASSIVE ABILITY ( REDUESED DAMAGE )
            if (Hero1 === "VENOM") {
                let OriginalDamage = RealDamage;
                let SymbioteShield = Math.floor(RealDamage * 0.2);
                RealDamage = RealDamage - SymbioteShield;
                document.querySelector(".H1Passive_Status").innerText = " VENOM'S SYMBIOTE SHIELD REDUSED " + SymbioteShield + " FROM " + OriginalDamage + " DAMAGE TOTAL DAMAGE : " + RealDamage;
            }
            // VENOM PASSIVE ABILITY ( REDUESED DAMAGE )

            H1health = H1health - RealDamage;
            HitImpact();

            if (type === 1) {
                document.querySelector(".ActionText").innerText = Hero2 + " USED PUNCH AND IT DEALS " + RealDamage + " TO " + Hero1;
            }

            else if (type === 2) {
                H2PowerPunch--;
                document.querySelector(".ActionText").innerText = Hero2 + " USED POWER PUNCH ( SHOCK WAVE DEALS +5 DMG ) IT DEALS " + RealDamage + " TO " + Hero1;
            }

            //ACTIVE ABILITY BLOCK <ACTIVE ABILITY>
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
                    let BersekHeal = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                    H2health = BersekHeal + H2health;
                    alert(" WOLVERINE ENTERED BERSERKER MODE ");
                    H2Bersek = 2;
                    document.querySelector(".ActionText").innerText = " WOLVERINE ENTERED BERSERKER MODE AND HEALS " + BersekHeal + " HP AND ATTACK BOOST X1.5 FOR 2 TURNS ";
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
            //ACTIVE ABILITY BLOCK </ACTIVE ABILITY>

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

    // update health bars
    let P1percent = (H1health / 100) * 100;
    let P2percent = (H2health / 100) * 100;

    document.querySelector(".P1bar").style.width = P1percent + "%";
    document.querySelector(".P2bar").style.width = P2percent + "%";

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