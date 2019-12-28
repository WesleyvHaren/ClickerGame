export default class Skill {
    cooldownState: number;

    constructor(public name: string, public cooldown: number, private damage: number) {
        this.cooldownState = cooldown;
    }

    isActive = () => this.cooldownState <= 0;

    passTime = (time: number) => this.cooldown -= time;

    activate = state => {
        this.cooldownState = this.cooldown;
        return { ...state, enemies: state.enemies.map(e => ({...e, hp: e.hp - this.damage})) };
      }
}

const skills: { [key: string]: { [key: string] :Skill } } = {
    'Swordsman Jack': { 'Slash': new Skill('Slash', 1000, 100) },
    'Priest Jack': { 'Heal': new Skill('Heal', 1000, 100) },
    'Archer Jack': { 'Snipe': new Skill('Heal', 1000, 100) },
}

export { skills };