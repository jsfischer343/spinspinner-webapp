import { SpinSegment } from './spinsegment.js';

export class Spin {
    constructor() {
        this.baseType = null;
        this.isFlying = false;
        this.isChangeFoot = false;
        this.level = 0;
        this.spinSegments = [];
        this.features = {
            changeFootByJump: false,
            difficultEntrance: false,
            difficultExit: false,
            cleanChangeFootSpin: false,
            allThreeBasicPositionsAnywhere: false,
        };
        this.intermediatePositionFlag = false;
        this.twoVariationsFlag = false;
        this.changeDirectionFlag = false;
    }

    hasAllPrimaryPositions() {
        let hasCamel = false, hasSit = false, hasUpright = false, hasLayback = false;
        for (const seg of this.spinSegments) {
            for (const pos of seg.spinPositions) {
                if (pos.position === 'c') hasCamel = true;
                else if (pos.position === 's') hasSit = true;
                else if (pos.position === 'u') hasUpright = true;
                else if (pos.position === 'l') hasLayback = true;
            }
        }
        return hasCamel && hasSit && (hasUpright || hasLayback);
    }

    getTotalPositions() {
        let sum = 0;
        for (const seg of this.spinSegments)
            sum += seg.spinPositions.length;
        return sum;
    }

    variationUsed(positionChar, variationChar) {
        for (const seg of this.spinSegments) {
            for (const pos of seg.spinPositions) {
                if (pos.position === positionChar && pos.variations.includes(variationChar))
                    return true;
            }
        }
        return false;
    }

    featureUsed(featureChar) {
        for (const seg of this.spinSegments) {
            for (const pos of seg.spinPositions) {
                if (pos.features.includes(featureChar))
                    return true;
            }
        }
        return false;
    }

    hasTwoVariations() {
        let count = 0;
        for (const seg of this.spinSegments) {
            for (const pos of seg.spinPositions)
                count += pos.variations.length;
        }
        return count >= 2;
    }

    hasDifficultChangeOfPosition() {
        for (const seg of this.spinSegments) {
            if (seg.hasDifficultChangeOfPosition()) return true;
        }
        return false;
    }

    toCode() {
        let result = '';
        result += 'L' + this.level + ':';
        if (this.baseType === '2') {
            if (this.spinSegments[0].direction === 'r')
                result += 'cc';
            else
                result += 'c';
            result += '[2FtUSp]';
        } else {
            if (this.isFlying) result += 'F';
            result += this.spinSegments[0].toCode();
            if (this.spinSegments.length > 1) {
                if (this.features.changeFootByJump)
                    result += '-j-';
                else
                    result += '+';
                result += this.spinSegments[1].toCode();
                for (let i = 2; i < this.spinSegments.length; i++)
                    result += this.spinSegments[i].toCode();
            }
            if (this.features.difficultEntrance) result += 'DE';
            if (this.features.difficultExit) result += 'DX';
            if (this.features.cleanChangeFootSpin || this.features.allThreeBasicPositionsAnywhere)
                result += 'CBP';
            else if (this.isChangeFoot && this.spinSegments[1]?.features.allThreeBasicPositionsOnSecondFoot)
                result += 'CBP2F';
        }
        return result;
    }

    prettyPrint() {
        let result = '';
        result += 'Level ' + this.level + ': ';
        if (this.baseType === '2') {
            if (this.spinSegments[0].direction === 'r')
                result += '(ccw)';
            else
                result += '(cc)';
            result += '[ 2 foot upright ]';
        } else {
            if (this.isFlying) result += 'flying ';
            result += this.spinSegments[0].prettyPrint();
            if (this.spinSegments.length > 1) {
                if (this.features.changeFootByJump)
                    result += ' --jump-- ';
                else
                    result += ' + ';
                result += this.spinSegments[1].prettyPrint();
                for (let i = 2; i < this.spinSegments.length; i++)
                    result += this.spinSegments[i].prettyPrint();
            }
            if (this.features.difficultEntrance && this.features.difficultExit)
                result += ' with difficult entrance & exit';
            else {
                if (this.features.difficultEntrance) result += ' with difficult entrance';
                if (this.features.difficultExit) result += ' with difficult exit';
            }
            if (this.features.cleanChangeFootSpin || this.features.allThreeBasicPositionsAnywhere)
                result += ' with clean basic positions';
            else if (this.isChangeFoot && this.spinSegments[1]?.features.allThreeBasicPositionsOnSecondFoot)
                result += ' with clean basic positions all on second foot';
        }
        return result;
    }
}
