import { resetParty } from "../entities/Party";
import { randomInteger } from "../helper/Util";
import { isAlive, basicAttack } from "../entities/CombatParticipant";
import Appstate from "../entities/AppState";
import Encounter from "../entities/Encounter";
import Partymember from "../entities/Partymember";

const selectTarget = (encounter: Encounter, member: Partymember) => encounter.livingMonsters()[randomInteger(encounter.livingMonsters().length - 1)];

export const combatTick = (state: Appstate, timer) => 
    state.currentEncounter.isBeaten()
        ? state
        : fight(state, timer.currentMs())

function fight(state: Appstate, currentMs: number): Appstate {
    state.party.members.forEach(member => {
            const viableTarget = selectTarget(state.currentEncounter, member);
            if(viableTarget){
                basicAttack(member.level * member.attack)(viableTarget);
            }
    });
    const gold = state.currentEncounter.isBeaten() ? state.currentEncounter.reward : 0;
    const newPartymembers = state.party.members.map(member => ({ ...member, hp: member.hp - (state.currentEncounter.livingMonsters()[0] ? state.currentEncounter.livingMonsters()[0].attack : 0) }));
    const newParty = newPartymembers.filter(isAlive).length === 0 ? resetParty(state.party) : { members: newPartymembers };
    const respawnTimer = state.currentEncounter.isBeaten() ? currentMs + 500 : 0
    return { ...state, party: newParty, gold: state.gold + gold, respawnTimer };
}