import * as easyRandom from './easyrandom.js';

const POS_FEATURE_BLADE_PROB = 0.175;
const POS_FEATURE_COE_PROB = 0.2;
const POS_FEATURE_JUMP_PROB = 0.2;
const POS_FEATURE_REV_PROB = 0.25;
const POS_FEATURE_SPEED_PROB = 0.175;

export class SpinPosition {
    constructor(footness, position) {
        this.footness = footness;
        this.position = position;
        this.variations = [];
        this.features = [];
    }

    addVariation(variation, normalize) {
        if (this.variations.length === 0 || !normalize) {
            this.variations.push(variation);
            return true;
        } else {
            for (let i = 0; i < this.variations.length; i++) {
                if (this.variations[i] === 'u' && variation === 's') {
                    this.variations.splice(i, 0, variation);
                    return true;
                }
                if (this.variations[i] === 's' && variation === 'b') {
                    this.variations.splice(i, 0, variation);
                    return true;
                }
                if (this.variations[i] === 'f' && variation === 't') {
                    this.variations.splice(i, 0, variation);
                    return true;
                }
                if (this.variations[i] === 'm') {
                    this.variations.splice(i, 0, variation);
                    return true;
                }
                if ((this.variations[i] === 's' && variation === 't') || (this.variations[i] === 't' && variation === 's'))
                    return false;
            }
            this.variations.push(variation);
            return true;
        }
    }

    addFeature(feature, normalize) {
        if (!normalize) {
            this.features.push(feature);
            return true;
        } else {
            if (this.position === 's') {
                if (feature === 'b') return false;
            } else if (this.position === 'l' || this.position === 'i') {
                if (feature === 'b' || feature === 'j') return false;
            }
            if (this.features.length > 0) {
                for (let i = 0; i < this.features.length; i++) {
                    if ((this.features[i] === 's' && feature === 'j') || (this.features[i] === 'j' && feature === 's'))
                        return false;
                    if (this.features[i] === 'w' || feature === 'w')
                        return false;
                }
            }
            this.features.push(feature);
            return true;
        }
    }

    hasVariation(variation) {
        return this.variations.includes(variation);
    }

    hasFeature(feature) {
        return this.features.includes(feature);
    }

    hasAnyVariation() {
        return this.variations.length > 0;
    }

    hasAnyFeature() {
        return this.features.length > 0;
    }

    pickRandomFeature(isRev5) {
        let validFeatures = isRev5
            ? ['b', 'c', 'j', '5', 's']
            : ['b', 'c', 'j', '8', 's'];
        if (this.position === 'c') validFeatures.push('w');

        const usedFeatures = [...this.features].sort();
        const unusedFeatures = validFeatures.filter(f => !usedFeatures.includes(f)).sort();

        if (unusedFeatures.length === 0) return null;

        const selectionWeights = unusedFeatures.map(f => {
            if (f === 'b') return POS_FEATURE_BLADE_PROB;
            if (f === 'c') return POS_FEATURE_COE_PROB;
            if (f === 'j') return POS_FEATURE_JUMP_PROB;
            if (f === '5' || f === '8') return POS_FEATURE_REV_PROB;
            if (f === 's') return POS_FEATURE_SPEED_PROB;
            return 0;
        });

        return easyRandom.pickFromVectorWeighted(unusedFeatures, selectionWeights);
    }

    pickRandomVariation() {
        let validVariations = [];
        if (this.position === 'c') {
            validVariations = ['u', 'f', 's'];
        } else if (this.position === 's') {
            validVariations = ['f', 'b', 's'];
        } else if (this.position === 'u') {
            if (this.hasVariation('s') || this.hasVariation('t'))
                validVariations = ['f', 'm'];
            else
                validVariations = ['s', 'f', 't', 'm'];
        } else if (this.position === 'l') {
            validVariations = ['s', 'b', 'm'];
        } else if (this.position === 'i') {
            validVariations = ['u', 'f', 'b', 's'];
        } else {
            throw new Error('Invalid position');
        }
        return easyRandom.pickFromVector(validVariations);
    }

    toCode() {
        let result = this.getPositionString(true);
        result += this.getVariationString(true);
        if (this.features.length > 0)
            result += '(' + this.getFeatureString(true) + ')';
        return result;
    }

    prettyPrint() {
        let result = this.getPositionString(false) + ' ';
        if (this.variations.length > 0)
            result += this.getVariationString(false) + ' ';
        if (this.features.length > 0)
            result += '(' + this.getFeatureString(false) + ')';
        return result;
    }

    getPositionString(codeFormat) {
        if (codeFormat) {
            const map = { c: 'C', s: 'S', u: 'U', l: 'L', i: 'I' };
            return map[this.position] || '';
        } else {
            const map = { c: 'camel', s: 'sit', u: 'upright', l: 'layback', i: 'intermediate' };
            return map[this.position] || '';
        }
    }

    getVariationString(codeFormat) {
        let str = '';
        if (codeFormat) {
            const map = { u: 'Up', s: 'Si', t: 'St', f: 'Fr', b: 'Be', m: 'Bi' };
            for (const v of this.variations)
                str += map[v] || '';
        } else {
            const map = { u: 'up', s: 'side', t: 'straight', f: 'front', b: 'behind', m: 'biellmann' };
            for (let i = 0; i < this.variations.length; i++) {
                str += map[this.variations[i]] || '';
                if (i !== this.variations.length - 1) str += ' -> ';
            }
        }
        return str;
    }

    getFeatureString(codeFormat) {
        let str = '';
        if (codeFormat) {
            const map = { b: 'Bl', c: 'Co', j: 'Ju', '8': '8', s: 'Sp', w: 'Wi', '5': '5' };
            for (const f of this.features)
                str += map[f] || '';
        } else {
            const map = { b: 'blade', c: 'coe', j: 'jump', '8': '8revs', s: 'speed', w: 'windmill', '5': '5 revs' };
            for (let i = 0; i < this.features.length; i++) {
                str += map[this.features[i]] || '';
                if (i !== this.features.length - 1) str += ', ';
            }
        }
        return str;
    }

    static prettyPrint(positionObj) {
        let result = SpinPosition.getPositionString(positionObj,false) + ' ';
        if (positionObj.variations.length > 0)
            result += SpinPosition.getVariationString(positionObj,false) + ' ';
        if (positionObj.features.length > 0)
            result += '(' + SpinPosition.getFeatureString(positionObj,false) + ')';
        return result;
    }

    static getPositionString(positionObj,codeFormat) {
        if (codeFormat) {
            const map = { c: 'C', s: 'S', u: 'U', l: 'L', i: 'I' };
            return map[positionObj.position] || '';
        } else {
            const map = { c: 'camel', s: 'sit', u: 'upright', l: 'layback', i: 'intermediate' };
            return map[positionObj.position] || '';
        }
    }

    static getVariationString(positionObj,codeFormat) {
        let str = '';
        if (codeFormat) {
            const map = { u: 'Up', s: 'Si', t: 'St', f: 'Fr', b: 'Be', m: 'Bi' };
            for (const v of positionObj.variations)
                str += map[v] || '';
        } else {
            const map = { u: 'up', s: 'side', t: 'straight', f: 'front', b: 'behind', m: 'biellmann' };
            for (let i = 0; i < positionObj.variations.length; i++) {
                str += map[positionObj.variations[i]] || '';
                if (i !== positionObj.variations.length - 1) str += ' -> ';
            }
        }
        return str;
    }

    static getFeatureString(positionObj,codeFormat) {
        let str = '';
        if (codeFormat) {
            const map = { b: 'Bl', c: 'Co', j: 'Ju', '8': '8', s: 'Sp', w: 'Wi', '5': '5' };
            for (const f of positionObj.features)
                str += map[f] || '';
        } else {
            const map = { b: 'blade', c: 'coe', j: 'jump', '8': '8revs', s: 'speed', w: 'windmill', '5': '5 revs' };
            for (let i = 0; i < positionObj.features.length; i++) {
                str += map[positionObj.features[i]] || '';
                if (i !== positionObj.features.length - 1) str += ', ';
            }
        }
        return str;
    }
}
