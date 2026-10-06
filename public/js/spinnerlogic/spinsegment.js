import { SpinPosition } from './spinposition.js';

const DEFAULT_DIRECTION = 'r';

export class SpinSegment {
    constructor(defaultDirection, footness) {
        this.footness = footness;
        this.direction = defaultDirection ? 'l' : 'r';
        this.spinPositions = [];
        this.features = {
            difficultChangeOfPosition: false,
            allThreeBasicPositionsOnSecondFoot: false,
        };
    }

    swapDirection() {
        if (this.direction === 'r')
            this.direction = 'l';
        else if (this.direction === 'l')
            this.direction = 'r';
    }

    swapFootness() {
        if (this.footness === 'b')
            this.footness = 'f';
        else if (this.footness === 'f')
            this.footness = 'b';
    }

    getUsedPositions() {
        return this.spinPositions.map(p => p.position);
    }

    getBulletCount() {
        let sum = 0;
        for (const pos of this.spinPositions) {
            sum += pos.variations.length;
            sum += pos.features.length;
        }
        if (this.features.difficultChangeOfPosition) sum++;
        if (this.features.allThreeBasicPositionsOnSecondFoot) sum++;
        return sum;
    }

    getVariationCount() {
        let sum = 0;
        for (const pos of this.spinPositions)
            sum += pos.variations.length;
        return sum;
    }

    hasDifficultChangeOfPosition() {
        for (let i = 1; i < this.spinPositions.length; i++) {
            const prev = this.spinPositions[i - 1].position;
            const curr = this.spinPositions[i].position;
            if ((prev === 's' || prev === 'u' || prev === 'l') && curr === 'c')
                return true;
        }
        return false;
    }

    hasAllPrimaryPositions() {
        let hasCamel = false, hasSit = false, hasUpright = false, hasLayback = false;
        for (const pos of this.spinPositions) {
            if (pos.position === 'c') hasCamel = true;
            else if (pos.position === 's') hasSit = true;
            else if (pos.position === 'u') hasUpright = true;
            else if (pos.position === 'l') hasLayback = true;
        }
        return hasCamel && hasSit && (hasUpright || hasLayback);
    }

    getDirectionString() {
        if (this.direction === 'r') return 'ccw';
        if (this.direction === 'l') return 'cw';
        return '';
    }

    getFootnessString() {
        if (this.footness === 'b') return 'back';
        if (this.footness === 'f') return 'forward';
        return '';
    }

    toCode() {
        let result = '';
        if (this.direction === 'r') result += 'cc[';
        else if (this.direction === 'l') result += 'c[';

        if (this.footness === 'b') result += 'Bw';
        else if (this.footness === 'f') result += 'Fw';

        for (let i = 0; i < this.spinPositions.length; i++) {
            result += this.spinPositions[i].toCode();
            if (i !== this.spinPositions.length - 1) result += '+';
        }
        result += ']';
        return result;
    }

    prettyPrint() {
        let result = '';
        if (this.direction === 'r') result += '(ccw)[ ';
        else if (this.direction === 'l') result += '(cw)[ ';

        if (this.footness === 'b') result += 'back ';
        else if (this.footness === 'f') result += 'forward ';

        for (let i = 0; i < this.spinPositions.length; i++) {
            result += this.spinPositions[i].prettyPrint();
            if (i !== this.spinPositions.length - 1) result += ' + ';
        }
        result += ' ]';
        return result;
    }
}
