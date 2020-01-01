import Appstate from "../entities/AppState";
import { combatTick } from "./CombatReducer";
import { encounters } from "../entities/Encounter";

export const calculateNewState = (state: Appstate, timer) => {
    let newState = state;
    if(timer.currentMs() % 1000 === 0){
      newState = combatTick(newState, timer)    
    }

    if(timer.currentMs() === state.respawnTimer) {
      newState = { ...newState, currentEncounter: encounters['Goblins'](), respawnTimer: 0 };
    }

    return newState;   
}