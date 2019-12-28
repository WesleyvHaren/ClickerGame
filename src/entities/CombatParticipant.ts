export default class CombatParticipant
{
    constructor(public name: string, public hp: number, public attack: number, public defense: number){}
}

export const isAlive = (participant: CombatParticipant) => participant.hp > 0;

export const isDead = (participant: CombatParticipant) => participant.hp <= 0;

export const damage = (damage: number) => (participant: CombatParticipant) => participant.hp -= damage;

export const attack = (attacker: CombatParticipant, defender: CombatParticipant) => ({ ...defender, hp: defender.hp - (attacker.attack - defender.defense)})