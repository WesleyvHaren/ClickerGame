import React, { Component } from "react";
import timer from '../helper/Timer'
import { skills } from "../entities/Skill";
import Autocaster from "./Autocaster";
import CooldownComponent from "./CooldownComponent";

export default class SkillComponent extends Component {
    state = {
        autocaster: new Autocaster()
    }

    constructor(public props: any){
        super({})
        timer.addHook(() => {
            Object.values(skills[this.props.partymember.name]).forEach(skill => skill.cooldownState -= 1);
            this.setState((prevState: { autocaster: Autocaster }) => ({ ...prevState, autocaster: Autocaster.tick(prevState.autocaster)}));
        });
    }

    addSkill = name => () => this.setState((prevState: { autocaster: Autocaster }) => ({ 
        autocaster: { ...prevState.autocaster, 
            casts: [{ skill: skills[this.props.partymember.name][name], cast: this.props.activateSkill, 
            autoCastCooldown: 2000 }] 
        } 
    }))

    render() {
        return <>
            {Object.values(skills[this.props.partymember.name]).map(skill => <div><button onClick={() => {this.props.activateSkill(skill.activate)}} disabled={!skill.isActive()}>{skill.name} {Math.max(skill.cooldownState, 0)}/{skill.cooldown}</button>
                    <button onClick={this.addSkill(skill.name)}>Autocast</button></div>)}        
            <CooldownComponent autocaster={this.state.autocaster}/>       
        </>;
    }
};