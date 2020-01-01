import { calculateNewState } from './TimerTickReducer'
import { initialAppState } from '../entities/AppState';

const fakeTimer = {
    currentMs: function() { return this.stubMs },
    stubMs: 9
}

it('Start with nonempty party', () => {
    const newState = calculateNewState(initialAppState, fakeTimer)
    expect(newState.party.members.length).toBe(1);
});

it('Damage is dealt every 1000ms', () => {
    const startingHp = initialAppState.currentEncounter.monsters[0].hp;
    fakeTimer.stubMs = 1000;
    const newState = calculateNewState(initialAppState, fakeTimer)
    expect(newState.currentEncounter.monsters[0].hp).toBeLessThan(startingHp);
});