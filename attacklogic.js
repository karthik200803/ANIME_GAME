function CalculateDamage(type) {

    let Damage = 0;

    if (type === 1) {
        Damage = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    }

    else if (type === 2) {
        let RandomDmg = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
        Damage = RandomDmg + 5;
    }
    
    return Damage;
} 