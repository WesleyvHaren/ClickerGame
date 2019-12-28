const msPerTick = 10;

const createTimer = function(delay) {
    const hooks: ((tick: number) => void)[] = [];
    let currentTick = 0;
    
    const update = () => setTimeout(() => {
      currentTick += 1;
      hooks.forEach(hook => hook(currentTick))
      update();
    }, delay);
  
    update();
  
    return {
      currentTick: () => currentTick,
      addHook: fn => {
        hooks.push(fn);
      },
      currentMs: () => currentTick * msPerTick,
      reset: () => currentTick = 0
    }
  }
  
  export default createTimer(msPerTick);