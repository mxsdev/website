export function getClosest (el: HTMLElement|null, s: string) {
    while (el !== null && el.nodeType === 1) {
        if (el.matches(s)) return el;
        el = el.parentElement;
    };
    
    return null;
};