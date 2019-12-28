import Party, { startingParty } from "./Party";
import Encounter, { encounters } from "./Encounter";
import { merge } from "../helper/Util";

export default interface Appstate {
    gold: number,
    party: Party,
    currentEncounter: Encounter,
    respawnTimer: number
  }

export const updateState = (updatedProperties: Partial<Appstate>) => (state: Appstate) => merge(state, updatedProperties)

export const initialAppState: Appstate = {
    gold: 0,
    party: startingParty,
    currentEncounter: encounters['Goblin'](),
    respawnTimer: 0
  }