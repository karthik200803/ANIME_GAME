let Hero1 = ""
let Hero2 = ""

let currentPlayer = 1

let H1health = 100
let H2health = 100

function SelectHero(HeroName){

    if(Hero1===""){
        Hero1 = HeroName 
        document.querySelector(".hero1").innerText="Player 1 Hero : " + HeroName
    }

    else if(Hero2===""){
        Hero2= HeroName
        document.querySelector(".hero2").innerText="Player 2 Hero : " + HeroName
    }

}