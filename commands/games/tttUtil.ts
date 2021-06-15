export function isSubset(big: any, small: any) {
    return small.every((v: any) => big.includes(v));
}

export function In(parent: any, match: any) {
    return match.includes(parent);
}
