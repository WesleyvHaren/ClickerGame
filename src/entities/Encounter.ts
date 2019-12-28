import Monster from "./Monster";

export default class Encounter {
    encounterColumns: number;
    encounterRows: number;
    constructor(public monsters: Monster[], public reward: number, public monsterLocations: number[][] = [[0,0]]){
        this.encounterColumns = Math.max(...monsterLocations.map(location => location[1])) + 1;
        this.encounterRows = Math.max(...monsterLocations.map(location => location[0])) + 1;
    }
}

export const encounters = {
    'Goblin': () => new Encounter([new Monster("Goblin", 100, 5, 0, 20)], 100),
    'Goblins': () => new Encounter([new Monster("Goblin", 100, 5, 0, 20), new Monster("Goblin", 100, 5, 0, 20), new Monster("Goblin", 100, 5, 0, 20)], 100, [[0,0], [0,1], [1,0]])
}