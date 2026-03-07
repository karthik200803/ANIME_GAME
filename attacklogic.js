function CalculateDamage(type){

    let Damage = 0;

    if(type === 1){
        Damage = Math.floor(Math.random()*(25-15+1)) + 15;
    }

    else if(type === 2){
        let RandomDmg = Math.floor(Math.random()*(30-15+1)) + 15;
        Damage = RandomDmg + 10;
    }

    else if(type === 3){
        Damage = 30;
    }

    return Damage;
}