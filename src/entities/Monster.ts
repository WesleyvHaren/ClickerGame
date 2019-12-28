import CombatParticipant from "./CombatParticipant";

export default class Monster extends CombatParticipant
{
    constructor(public name: string, public hp: number, public attack: number, public defense: number, public reward: number){
        super(name, hp, attack, defense);
    }
}