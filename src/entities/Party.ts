import Partymember, { Partymembers, partymembers } from "./Partymember";

export default class Party {
    public members: Partymember[];

    constructor(party: Partymembers[]){
        this.members = party.map(member => partymembers[member])
    }
}

export const startingParty = new Party([Partymembers.Swordsman])

export const upgradedParty = (party: Party) => {
    switch(party.members.length){
        case 1:
            return new Party([Partymembers.Swordsman, Partymembers.Archer])
        case 2:
            return new Party([Partymembers.Swordsman, Partymembers.Archer, Partymembers.Priest])
    }
}  