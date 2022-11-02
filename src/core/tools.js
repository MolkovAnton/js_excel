export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) ===  JSON.stringify(b);
    } else {
        return a === b;  
    }
}