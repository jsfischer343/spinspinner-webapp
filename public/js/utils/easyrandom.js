export function range(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickFromVector(arr) {
    if (arr.length === 0) return null;
    return arr[range(0, arr.length - 1)];
}

export function pickFromVectorWeighted(items, weights) {
    if (items.length === 0 || weights.length === 0 || items.length !== weights.length)
        throw new Error('pickFromVectorWeighted: mismatched or empty arrays');

    const sum = weights.reduce((a, b) => a + b, 0);
    const cumWeights = [];
    for (let i = 0; i < weights.length; i++) {
        cumWeights.push(weights[i] / sum);
        if (i !== 0) cumWeights[i] += cumWeights[i - 1];
    }

    const r = Math.random();
    if (r >= 0 && r <= cumWeights[0]) return items[0];
    for (let i = 0; i < cumWeights.length - 1; i++) {
        if (r > cumWeights[i] && r <= cumWeights[i + 1])
            return items[i + 1];
    }
    return null;
}

export function weightedTruth(weight) {
    if (weight > 1 || weight < 0) throw new Error('weightedTruth: weight out of range');
    return pickFromVectorWeighted([0, 1], [1 - weight, weight]) === 1;
}

export function binaryPair() {
    return range(0, 1) ? { first: 1, second: 0 } : { first: 0, second: 1 };
}
