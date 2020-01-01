import Partymember, { Partymembers, partymembers } from "./Partymember";

export default class Party {
    public members: Partymember[];

    constructor(party: Partymembers[]){
        this.members = party.map(member => partymembers[member])
    }
}

export const getParty = (level: number) => {
    switch (level) {
        case 0:
            return new Party([Partymembers.Swordsman]);
        case 1:
            return new Party([Partymembers.Swordsman, Partymembers.Archer]);
        case 2:
            return new Party([Partymembers.Swordsman, Partymembers.Archer, Partymembers.Priest]);
        default:
            throw new Error('Not available');
    }
}

export const startingParty = getParty(0);

export const resetParty = (party: Party) => getParty(party.members.length - 1);

export const upgradedParty = (party: Party) => getParty(party.members.length);