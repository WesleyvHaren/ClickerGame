import { startingParty } from "../entities/Party";
import { clone, randomInteger } from "../helper/Util";
import { isDead, isAlive, damage } from "../entities/CombatParticipant";
import Appstate from "../entities/AppState";

const selectTarget = monsters => monsters[randomInteger(monsters.length - 1)];

export const combatTick = (state: Appstate, timer) => {
    state.party.members.forEach(member => damage(member.level * member.attack)(selectTarget(state.currentEncounter.monsters)));
    const deadEnemies = state.currentEncounter.monsters.filter(isDead);
    const currentEnemies = state.currentEncounter.monsters
        .filter(isAlive)
        .map(clone);
    const gold = deadEnemies.reduce((value, enemy) => value + enemy.reward, 0);
    let newPartymembers = state.party.members
        .map(member => ({...member, hp: member.hp - (currentEnemies[0] ? currentEnemies[0].attack : 0)}))
        .filter(isAlive);
    const newParty = newPartymembers.length === 0 ? startingParty : { members: newPartymembers };
    const newRespawnTimer = currentEnemies.length === 0 ? timer.currentMs() + 500 : state.respawnTimer;
    return { ...state, party: newParty, enemies: currentEnemies, gold: state.gold + gold, respawnTimer: newRespawnTimer }   
}