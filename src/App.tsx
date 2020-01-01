import React, { Component } from 'react';
import './App.css';
import SkillComponent from './components/SkillComponent';
import timer from './helper/Timer';
import { upgradedParty } from './entities/Party';
import Appstate, { updateState, initialAppState } from './entities/AppState';
import { updateSingle } from './helper/Util';
import Partymember from './entities/Partymember';
import { calculateNewState } from './reducer/TimerTickReducer';
import { isAlive } from './entities/CombatParticipant';

const upgrade = member => state => 
  ({ ...state, party: updateSingle(member, (unit: Partymember) => ({ ...unit, level: unit.level + 1 }), state.party.members), gold: state.gold - (member.levelingCost * member.level) })

const upgradeParty = state => updateState({ party: upgradedParty(state.party), gold: state.gold - 10000 })(state)

class App extends Component<{}, Appstate> {
  state = initialAppState;

  constructor() {
    super({});
    timer.addHook(() => {
      const newState = calculateNewState(this.state, timer);
      if(this.state !== newState){
        this.setState(newState);
      }
    });
  }

  render(){
    return (
      <div className="App">
        <div>
          <div>Gold: {Math.floor(this.state.gold)}</div>
          <button onClick={() => this.setState(upgradeParty)}>Expand party: {this.state.party.members.length * 10000}</button>
        </div>
        <div className={"grid-container grid-" + this.state.party.members.length}>
        {this.state.party.members.filter(isAlive).map(member => 
        <span className="grid-item">
        -------------------------
        <div>{ member.name }</div>
        <div>{ member.hp }</div>
        <div>{ member.attack }</div>
        <button onClick={() => this.setState(upgrade(member))}>Upgrade {member.name}: {member.levelingcost()}</button>
        <SkillComponent partymember={member} activateSkill={fn => this.setState(fn(this.state))}></SkillComponent>      
        -------------------------  
        </span>)}
        </div>
        {[...Array(this.state.currentEncounter.encounterRows).keys()].map((row) => 
          <div  className={"grid-container grid-" + this.state.currentEncounter.encounterColumns}>
                  {[...Array(this.state.currentEncounter.encounterColumns).keys()].map((col) => 

                    {
                    const render = () => {
                      const member = this.state.currentEncounter.getMonster(col, row);
                      return member ? <span>
                        <div>{member.name}</div>
                        <div>{member.hp}</div>
                        <div>{member.attack}</div>
                      </span> : <span><div>x</div></span>;
                    };
                      return <Wrap render={render}/>;
                    })}
          </div>)}
      </div>
    );
  }
}

function Wrap(props){
  return <span className="grid-item">
    -------------------------
    {props.render()}
    -------------------------
    </span>;
}

export default App;
