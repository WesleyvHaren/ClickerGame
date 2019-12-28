import React from "react";
export default function CooldownComponent(props) {
    return (<div>
        <div>Autocaster</div>
        {props.autocaster.casts.map(cast => <div>{cast.skill.name}: {Math.max(cast.autoCastCooldown, 0)}/2000</div>)}
    </div>);
}
