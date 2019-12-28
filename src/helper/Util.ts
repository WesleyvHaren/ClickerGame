export function updateSome<T>(filter: (item: T) => boolean, mapper: (item: T) => T, array: T[]){
    return array.map(item => filter(item) ? mapper(item) : item);  
}

export function updateSingle<T>(target: T, mapper: (item: T) => T, array: T[]) {
     return updateSome(item => item === target, mapper, array);
}

export function clone<T>(entity: T) {
    return { ...entity }
}

export function merge<T>(entity: T, partial: Partial<T>) {
    return { ...entity, ...partial }
}

export function randomInteger(upperBound: number, lowerBound: number = 0) {
    return Math.floor(Math.random() * (upperBound + 1)) + lowerBound;
}