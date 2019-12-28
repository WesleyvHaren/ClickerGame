import CombatParticipant from "./CombatParticipant";

export default class Partymember extends CombatParticipant{
    constructor(public name, public hp, public attack, public defense, public level: number) {
        super(name, hp, attack, defense);
    }

    public levelingcost = () : number => {
        return 100 * Math.pow(2, this.level);
    }    
}

export enum Partymembers {
    Swordsman,
    Priest,
    Archer,
}

export const partymembers = {
    [Partymembers.Swordsman]: new Partymember('Swordsman Jack', 100, 10, 5, 1), 
    [Partymembers.Priest]: new Partymember('Priest Jack', 100, 5, 10, 1),
    [Partymembers.Archer]: new Partymember('Archer Jack', 100, 15, 0, 1)
}