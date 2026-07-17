import { Spin } from './spin.js';
import { SpinSegment } from './spinsegment.js';
import { SpinPosition } from './spinposition.js';
import * as easyRandom from './easyrandom.js';

const CAMEL_CHANGEFOOTSPIN_PROB = 0.5;
const CAMEL_FLYINGSPIN_PROB = 0.5;
const SIT_CHANGEFOOTSPIN_PROB = 0.5;
const SIT_FLYINGSPIN_PROB = 0.5;
const UPRIGHT_CHANGEFOOTSPIN_PROB = 0.5;
const UPRIGHT_FLYINGSPIN_PROB = 0.01;
const LAYBACK_CHANGEFOOTSPIN_PROB = 0.3;
const LAYBACK_FLYINGSPIN_PROB = 0.01;
const COMBO_CHANGEFOOTSPIN_PROB = 0.5;
const COMBO_FLYINGSPIN_PROB = 0.5;

const COMBO_START_CAMEL_PROB = 0.6;
const COMBO_START_SIT_PROB = 0.36;
const COMBO_START_UPRIGHT_PROB = 0.04;
const COMBO_SWAP_UPRIGHT_FOR_LAYBACK = 0.15;

const ADD_VARIATION_PROB = 0.32;
const ADD_SPIN_FEATURE_PROB = 0.19;
const ADD_POSITION_FEATURE_PROB = 0.23;
const ADD_INTERMEDIATE_POSITION_PROB = 0.13;
const ADD_CHANGE_OF_DIRECTION_PROB = 0.13;

const FEATURE_ON_SAME_POSITION_PROB = 0.05;
const VARIATION_ON_SAME_POSITION_PROB = 0.8;

const ADULT_CLEAN_CHANGEFOOT = 0.5;
const ADULT_CLEAN_COMBO = 0.5;

export class SpinSpinner {
    constructor(defaultDirection, normalize) {
        this.defaultDirection = defaultDirection;
        this.normalize = normalize;
        this.adultRuleFlags = {
            active: false,
            junior_senior: false,
            intermediate_novice: false,
            gold: false,
            silver: false,
            bronze: false,
        };
        this.spinHistory = [];
        this.targetLevel = 0;
        this.currentSpin = null;
    }

    spin(...args) {
        if (args.length === 0) {
            this.targetLevel = easyRandom.range(0, 4);
            this.currentSpin = new Spin();

            let spinSelect;
            if (this.adultRuleFlags.bronze)
                spinSelect = easyRandom.range(0, 5);
            else
                spinSelect = easyRandom.range(0, 4);

            switch (spinSelect) {
                case 0: this.currentSpin.baseType = 'c'; break;
                case 1: this.currentSpin.baseType = 's'; break;
                case 2: this.currentSpin.baseType = 'u'; break;
                case 3: this.currentSpin.baseType = 'l'; break;
                case 4: this.currentSpin.baseType = 'k'; break;
                case 5: this.currentSpin.baseType = '2'; this.targetLevel = 0; break;
                default: throw new Error('Invalid spin select');
            }

            this.setRandomBaseQualities();
            this.generateSpin();
        } else if (args.length === 1) {
            const level = args[0];
            this.targetLevel = level;
            this.currentSpin = new Spin();

            let spinSelect;
            if (this.adultRuleFlags.bronze && this.targetLevel === 0)
                spinSelect = easyRandom.range(0, 5);
            else
                spinSelect = easyRandom.range(0, 4);

            switch (spinSelect) {
                case 0: this.currentSpin.baseType = 'c'; break;
                case 1: this.currentSpin.baseType = 's'; break;
                case 2: this.currentSpin.baseType = 'u'; break;
                case 3: this.currentSpin.baseType = 'l'; break;
                case 4: this.currentSpin.baseType = 'k'; break;
                case 5: this.currentSpin.baseType = '2'; this.targetLevel = 0; this.generate2FtUSp(); return;
                default: throw new Error('Invalid spin select');
            }

            this.setRandomBaseQualities();
            this.generateSpin();
        } else if (args.length === 2) {
            const type = args[0];
            const level = args[1];
            this.targetLevel = level;
            this.currentSpin = new Spin();
            this.currentSpin.baseType = type;
            if (this.currentSpin.baseType === '2') {
                this.targetLevel = 0;
                this.generate2FtUSp();
                return;
            }
            this.setRandomBaseQualities();
            this.generateSpin();
        }
    }

    generateSpin() {
        const bt = this.currentSpin.baseType;
        if (bt === 'c' || bt === 's' || bt === 'u' || bt === 'l')
            this.generateSpinInOnePosition();
        else if (bt === 'k')
            this.generateCombo();
        else if (bt === '2')
            this.generate2FtUSp();
        else
            throw new Error('Unknown base type: ' + bt);
    }

    generateSpinInOnePosition() {
        let startingFootness, otherFootness;
        if (this.currentSpin.isFlying && this.currentSpin.baseType === 'c' && this.normalize) {
            startingFootness = 'b';
            otherFootness = 'f';
        } else {
            if (easyRandom.range(0, 1)) {
                startingFootness = 'f';
                otherFootness = 'b';
            } else {
                startingFootness = 'b';
                otherFootness = 'f';
            }
        }

        if (this.currentSpin.isChangeFoot) {
            this.currentSpin.spinSegments.push(new SpinSegment(this.defaultDirection, startingFootness));
            this.currentSpin.spinSegments.push(new SpinSegment(this.defaultDirection, otherFootness));

            if (this.adultRuleFlags.active && this.targetLevel > 0) {
                if ((this.currentSpin.baseType === 'c' || this.currentSpin.baseType === 's') &&
                    easyRandom.weightedTruth(ADULT_CLEAN_CHANGEFOOT)) {
                    this.currentSpin.level++;
                    this.currentSpin.features.cleanChangeFootSpin = true;
                }
            }
        } else {
            this.currentSpin.spinSegments.push(new SpinSegment(this.defaultDirection, startingFootness));
        }

        for (let i = 0; i < this.currentSpin.spinSegments.length; i++) {
            const seg = this.currentSpin.spinSegments[i];
            seg.spinPositions.push(new SpinPosition(seg.footness, this.currentSpin.baseType));
        }

        const offset = this.currentSpin.features.cleanChangeFootSpin ? 1 : 0;
        for (let i = 0; i < this.targetLevel - offset; i++) {
            if (!this.addLevel())
                throw new Error('Failed to add level');
        }

        this.spinHistory.push(this.currentSpin);
    }

    generate2FtUSp() {
        this.currentSpin.spinSegments.push(new SpinSegment(this.defaultDirection, 'f'));
        this.spinHistory.push(this.currentSpin);
    }

    generateCombo() {
        let randomStartPosition;
        if (this.targetLevel < 1 || (this.adultRuleFlags.active && this.targetLevel < 2))
            randomStartPosition = 'c';
        else
            randomStartPosition = easyRandom.pickFromVectorWeighted(
                ['c', 's', 'u'],
                [COMBO_START_CAMEL_PROB, COMBO_START_SIT_PROB, COMBO_START_UPRIGHT_PROB]
            );

        let startingFootness, otherFootness;
        if (this.currentSpin.isFlying && randomStartPosition === 'c' && this.normalize) {
            startingFootness = 'b';
            otherFootness = 'f';
        } else {
            if (easyRandom.range(0, 1)) {
                startingFootness = 'f';
                otherFootness = 'b';
            } else {
                startingFootness = 'b';
                otherFootness = 'f';
            }
        }

        if (this.currentSpin.isChangeFoot) {
            this.currentSpin.spinSegments.push(new SpinSegment(this.defaultDirection, startingFootness));
            this.currentSpin.spinSegments.push(new SpinSegment(this.defaultDirection, otherFootness));
        } else {
            this.currentSpin.spinSegments.push(new SpinSegment(this.defaultDirection, startingFootness));
        }

        this.currentSpin.spinSegments[0].spinPositions.push(
            new SpinPosition(this.currentSpin.spinSegments[0].footness, randomStartPosition)
        );

        this.generateComboPositions();

        let levelOffset = 0;
        const hasDifficultChangeOfPosition = this.currentSpin.hasDifficultChangeOfPosition();
        if (hasDifficultChangeOfPosition) {
            this.currentSpin.level++;
        }

        if (this.adultRuleFlags.active && this.targetLevel > 0) {
            if (this.adultRuleFlags.gold || this.adultRuleFlags.silver || this.adultRuleFlags.bronze) {
                if (this.currentSpin.hasAllPrimaryPositions() && easyRandom.weightedTruth(ADULT_CLEAN_COMBO)) {
                    this.currentSpin.level++;
                    this.currentSpin.features.allThreeBasicPositionsAnywhere = true;
                }
            } else if (this.currentSpin.isChangeFoot) {
                if (this.currentSpin.spinSegments[1].hasAllPrimaryPositions()) {
                    this.currentSpin.level++;
                    this.currentSpin.spinSegments[1].features.allThreeBasicPositionsOnSecondFoot = true;
                }
            }
        }

        if (hasDifficultChangeOfPosition) levelOffset++;
        if (this.currentSpin.features.allThreeBasicPositionsAnywhere) levelOffset++;
        if (this.currentSpin.isChangeFoot && this.currentSpin.spinSegments[1]?.features.allThreeBasicPositionsOnSecondFoot)
            levelOffset++;

        for (let i = 0; i < this.targetLevel - levelOffset; i++) {
            if (!this.addLevel())
                throw new Error('Failed to add level in combo');
        }

        this.spinHistory.push(this.currentSpin);
    }

    generateComboPositions() {
        if (this.currentSpin.isChangeFoot) {
            let swappedFeet = false;
            while (this.currentSpin.getTotalPositions() < 6) {
                if (!swappedFeet) {
                    const seg0len = this.currentSpin.spinSegments[0].spinPositions.length;
                    if (easyRandom.weightedTruth(0.4) || seg0len === 3 ||
                        ((this.adultRuleFlags.junior_senior || this.adultRuleFlags.intermediate_novice) && easyRandom.weightedTruth(0.4))) {
                        swappedFeet = true;
                        this.generateComboPositions_addPosition(true);
                    } else {
                        this.generateComboPositions_addPosition(false);
                    }
                } else {
                    if (this.currentSpin.hasAllPrimaryPositions()) {
                        const seg1 = this.currentSpin.spinSegments[1];
                        const lastPos = seg1.spinPositions[seg1.spinPositions.length - 1];
                        if (seg1.spinPositions.length === 3)
                            break;
                        else if (lastPos.position === 'u' || lastPos.position === 'l')
                            break;
                        else if (easyRandom.weightedTruth(0.6))
                            break;
                    }
                    this.generateComboPositions_addPosition(true);
                }
            }
        } else {
            this.generateComboPositions_addPosition(false);
            this.generateComboPositions_addPosition(false);
        }
    }

    generateComboPositions_addPosition(swappedFeet) {
        const segIdx = swappedFeet ? 1 : 0;
        const segment = this.currentSpin.spinSegments[segIdx];

        if (segment.spinPositions.length === 3 || this.currentSpin.spinSegments.length > 2)
            throw new Error('Cannot add more positions');

        let nextPosition = null;
        if (this.targetLevel >= 1 && (!this.adultRuleFlags.active || this.targetLevel >= 2)) {
            const validPositions = ['c', 's', 'u'];
            let usedPositions = segment.getUsedPositions().map(p => p === 'l' ? 'u' : p);
            const unusedPositions = validPositions.filter(p => !usedPositions.includes(p));

            const weights = unusedPositions.map(p => {
                if (p === 'c') return COMBO_START_CAMEL_PROB;
                if (p === 's') return COMBO_START_SIT_PROB;
                if (p === 'u') return COMBO_START_UPRIGHT_PROB;
                return 0;
            });

            nextPosition = easyRandom.pickFromVectorWeighted(unusedPositions, weights);

            if (nextPosition === 'u' && easyRandom.weightedTruth(COMBO_SWAP_UPRIGHT_FOR_LAYBACK))
                nextPosition = 'l';

            if (segment.spinPositions.length > 0) {
                const prevPos = segment.spinPositions[segment.spinPositions.length - 1].position;
                if ((prevPos === 's' || prevPos === 'u' || prevPos === 'l') && nextPosition === 'c')
                    segment.features.difficultChangeOfPosition = true;
            }
        } else {
            if (swappedFeet && segment.spinPositions.length === 0) {
                const prevSegment = this.currentSpin.spinSegments[0];
                const prevIndex = prevSegment.spinPositions.length - 1;
                const prevPos = prevSegment.spinPositions[prevIndex].position;
                if (easyRandom.range(0, 1)) {
                    if (prevPos === 'c') nextPosition = 'c';
                    else if (prevPos === 's') nextPosition = 's';
                    else if (prevPos === 'u') nextPosition = 'u';
                    else if (prevPos === 'l') nextPosition = easyRandom.range(0, 1) ? 'u' : 'l';
                } else {
                    if (prevPos === 'c') nextPosition = 's';
                    else if (prevPos === 's') nextPosition = 'u';
                    else if (prevPos === 'u') nextPosition = 'u';
                    else if (prevPos === 'l') nextPosition = easyRandom.range(0, 1) ? 'u' : 'l';
                }
            } else {
                const prevIndex = segment.spinPositions.length - 1;
                const prevPos = segment.spinPositions[prevIndex].position;
                if (prevPos === 'c') nextPosition = 's';
                else if (prevPos === 's') nextPosition = 'u';
            }
            if (nextPosition === 'u' && easyRandom.weightedTruth(COMBO_SWAP_UPRIGHT_FOR_LAYBACK))
                nextPosition = 'l';
        }

        if (nextPosition === null) throw new Error('Could not determine next position');
        segment.spinPositions.push(new SpinPosition(segment.footness, nextPosition));
    }

    setRandomBaseQualities() {
        let changeFootSpinProb, flyingFootSpinProb;
        const bt = this.currentSpin.baseType;
        if (bt === 'c') {
            changeFootSpinProb = CAMEL_CHANGEFOOTSPIN_PROB;
            flyingFootSpinProb = CAMEL_FLYINGSPIN_PROB;
        } else if (bt === 's') {
            changeFootSpinProb = SIT_CHANGEFOOTSPIN_PROB;
            flyingFootSpinProb = SIT_FLYINGSPIN_PROB;
        } else if (bt === 'u') {
            changeFootSpinProb = UPRIGHT_CHANGEFOOTSPIN_PROB;
            flyingFootSpinProb = UPRIGHT_FLYINGSPIN_PROB;
        } else if (bt === 'l') {
            changeFootSpinProb = LAYBACK_CHANGEFOOTSPIN_PROB;
            flyingFootSpinProb = LAYBACK_FLYINGSPIN_PROB;
        } else if (bt === 'k') {
            changeFootSpinProb = COMBO_CHANGEFOOTSPIN_PROB;
            flyingFootSpinProb = COMBO_FLYINGSPIN_PROB;
        }

        this.currentSpin.isChangeFoot = easyRandom.weightedTruth(changeFootSpinProb);
        this.currentSpin.isFlying = easyRandom.weightedTruth(flyingFootSpinProb);
    }

    addLevel() {
        if (this.currentSpin.level >= 4) return false;
        else if (this.adultRuleFlags.bronze && this.currentSpin.baseType === 'k')
            this.currentSpin.features.allThreeBasicPositionsAnywhere = true;
        else {
            if (this.currentSpin.level === 3 && this.missingBulletForLevel4() && !this.adultRuleFlags.intermediate_novice) {
                this.addARequiredBulletForLevel4();
            } else {
                let count = 0;
                while (true) {
                    if (count > 100) return false;
                    const randomSelect = this.pickRandomBulletType();
                    if (randomSelect === 0) {
                        if (this.addVariation()) break;
                    } else if (randomSelect === 1) {
                        if (this.addSpinFeature()) break;
                    } else if (randomSelect === 2) {
                        if (this.addPositionFeature()) break;
                    } else if (randomSelect === 3) {
                        if (this.addIntermediatePosition()) break;
                    } else if (randomSelect === 4) {
                        if (this.addChangeOfDirection()) break;
                    } else {
                        throw new Error('Invalid bullet type');
                    }
                    count++;
                }
            }
        }
        this.currentSpin.level++;
        return true;
    }

    addVariation() {
        const randomPosition = this.pickNonConflictingPosition();
        const randomVariation = randomPosition.pickRandomVariation();
        if (this.currentSpin.level === 0) {
            randomPosition.addVariation(randomVariation, this.normalize);
            return true;
        } else {
            if (!easyRandom.weightedTruth(VARIATION_ON_SAME_POSITION_PROB) && randomPosition.variations.length > 0)
                return false;
            if (this.currentSpin.twoVariationsFlag &&
                !this.adultRuleFlags.intermediate_novice &&
                !this.adultRuleFlags.gold)
                return false;
            else {
                if (this.currentSpin.variationUsed(randomPosition.position, randomVariation))
                    return false;
                else {
                    if (randomPosition.addVariation(randomVariation, this.normalize)) {
                        if (randomPosition.position === 's' && randomPosition.hasAnyFeature()) {
                            if ((this.targetLevel === 2 && easyRandom.weightedTruth(0.6)) ||
                                (this.targetLevel === 3 && easyRandom.weightedTruth(0.2))) {
                                if (this.adultRuleFlags.gold || this.adultRuleFlags.silver || this.adultRuleFlags.bronze)
                                    randomPosition.features[0] = '5';
                                else
                                    randomPosition.features[0] = '8';
                            }
                        }

                        if (this.currentSpin.hasTwoVariations())
                            this.currentSpin.twoVariationsFlag = true;
                        return true;
                    }
                    return false;
                }
            }
        }
    }

    addSpinFeature() {
        let tempLowerRandomRange = 1;
        let tempUpperRandomRange = 2;
        if (this.currentSpin.isChangeFoot) tempLowerRandomRange--;

        const randomSelect = easyRandom.range(tempLowerRandomRange, tempUpperRandomRange);
        if (randomSelect === 0) {
            if (this.currentSpin.features.changeFootByJump || this.shouldAvoidChangeFootByJump())
                return false;
            this.currentSpin.features.changeFootByJump = true;
            return true;
        } else if (randomSelect === 1) {
            if ((!this.currentSpin.features.difficultExit || this.currentSpin.isFlying) &&
                !this.currentSpin.features.difficultEntrance) {
                this.currentSpin.features.difficultEntrance = true;
                return true;
            }
        } else if (randomSelect === 2) {
            if (!this.currentSpin.features.difficultExit &&
                (!this.currentSpin.features.difficultEntrance || this.currentSpin.isFlying)) {
                this.currentSpin.features.difficultExit = true;
                return true;
            }
        }
        return false;
    }

    addPositionFeature() {
        const randomPosition = this.pickNonConflictingPosition();
        const useRev5 = this.adultRuleFlags.gold || this.adultRuleFlags.silver || this.adultRuleFlags.bronze;
        const randomFeature = randomPosition.pickRandomFeature(useRev5);

        if (this.currentSpin.featureUsed(randomFeature)) return false;
        if (!this.checkFeatureValidity(randomPosition, randomFeature)) return false;
        if (randomPosition.addFeature(randomFeature, this.normalize)) return true;
        return false;
    }

    addIntermediatePosition() {
        if (this.currentSpin.intermediatePositionFlag) return false;
        const randomSegmentIndex = easyRandom.range(0, this.currentSpin.spinSegments.length - 1);
        const randomSegment = this.currentSpin.spinSegments[randomSegmentIndex];
        const randomSpinPosIndex = easyRandom.range(0, randomSegment.spinPositions.length - 1);
        randomSegment.spinPositions.splice(randomSpinPosIndex + 1, 0, new SpinPosition(randomSegment.footness, 'i'));
        this.currentSpin.intermediatePositionFlag = true;
        return true;
    }

    addChangeOfDirection() {
        if (this.currentSpin.changeDirectionFlag) return false;
        const seg0 = this.currentSpin.spinSegments[0];
        const seg1 = this.currentSpin.spinSegments[1];
        const lastPosOnFirst = seg0.spinPositions[seg0.spinPositions.length - 1];
        const firstPosOnSecond = seg1.spinPositions[0];

        if (this.adultRuleFlags.gold || this.adultRuleFlags.silver || this.adultRuleFlags.bronze) {
            if (lastPosOnFirst.position === 'l' || firstPosOnSecond.position === 'l')
                return false;
        } else {
            if (lastPosOnFirst.position === 'u' && !lastPosOnFirst.hasAnyVariation())
                return false;
            if (firstPosOnSecond.position === 'u' && !firstPosOnSecond.hasAnyVariation())
                return false;
        }

        if (this.normalize || easyRandom.range(0, 1))
            this.currentSpin.spinSegments[1].swapFootness();
        if (easyRandom.range(0, 1))
            this.currentSpin.spinSegments[0].swapDirection();
        else
            this.currentSpin.spinSegments[1].swapDirection();
        this.currentSpin.changeDirectionFlag = true;
        return true;
    }

    pickRandomBulletType() {
        let selectFrom, weights;
        const isChangeFoot = this.currentSpin.isChangeFoot;
        const isCombo = this.currentSpin.baseType === 'k';

        if (isCombo) {
            if (isChangeFoot) {
                selectFrom = [0, 1, 2, 3, 4];
                weights = [ADD_VARIATION_PROB, ADD_SPIN_FEATURE_PROB, ADD_POSITION_FEATURE_PROB, ADD_INTERMEDIATE_POSITION_PROB, ADD_CHANGE_OF_DIRECTION_PROB];
            } else {
                selectFrom = [0, 1, 2, 3];
                weights = [ADD_VARIATION_PROB, ADD_SPIN_FEATURE_PROB, ADD_POSITION_FEATURE_PROB, ADD_INTERMEDIATE_POSITION_PROB];
            }
        } else {
            if (isChangeFoot) {
                selectFrom = [0, 1, 2, 4];
                weights = [ADD_VARIATION_PROB, ADD_SPIN_FEATURE_PROB, ADD_POSITION_FEATURE_PROB, ADD_CHANGE_OF_DIRECTION_PROB];
            } else {
                selectFrom = [0, 1, 2];
                weights = [ADD_VARIATION_PROB, ADD_SPIN_FEATURE_PROB, ADD_POSITION_FEATURE_PROB];
            }
        }
        return easyRandom.pickFromVectorWeighted(selectFrom, weights);
    }

    pickNonConflictingPosition() {
        let nonConflictingPosition = null;
        do {
            if (!this.currentSpin.isChangeFoot) {
                const idx = easyRandom.range(0, this.currentSpin.spinSegments[0].spinPositions.length - 1);
                nonConflictingPosition = this.currentSpin.spinSegments[0].spinPositions[idx];
            } else {
                let bulletsOnFirst = this.currentSpin.spinSegments[0].getBulletCount();
                let bulletsOnSecond = this.currentSpin.spinSegments[1].getBulletCount();

                if (this.adultRuleFlags.active && this.currentSpin.features.cleanChangeFootSpin)
                    bulletsOnSecond++;

                if (this.currentSpin.spinSegments[0].features.difficultChangeOfPosition &&
                    this.currentSpin.spinSegments[1].features.difficultChangeOfPosition)
                    bulletsOnSecond--;

                if (bulletsOnFirst === 2 && bulletsOnSecond < 2) {
                    const idx = easyRandom.range(0, this.currentSpin.spinSegments[1].spinPositions.length - 1);
                    nonConflictingPosition = this.currentSpin.spinSegments[1].spinPositions[idx];
                } else if (bulletsOnFirst < 2 && bulletsOnSecond === 2) {
                    const idx = easyRandom.range(0, this.currentSpin.spinSegments[0].spinPositions.length - 1);
                    nonConflictingPosition = this.currentSpin.spinSegments[0].spinPositions[idx];
                } else if (bulletsOnFirst < 2 && bulletsOnSecond < 2) {
                    const segIdx = easyRandom.range(0, 1);
                    const idx = easyRandom.range(0, this.currentSpin.spinSegments[segIdx].spinPositions.length - 1);
                    nonConflictingPosition = this.currentSpin.spinSegments[segIdx].spinPositions[idx];
                } else {
                    throw new Error('Too many bullets on one foot');
                }
            }
        } while (nonConflictingPosition.position === 'i');
        return nonConflictingPosition;
    }

    missingBulletForLevel4() {
        const f = this.currentSpin.features;
        if (f.difficultExit ||
            this.currentSpin.featureUsed('c') ||
            this.currentSpin.changeDirectionFlag ||
            this.currentSpin.featureUsed('s') ||
            (this.currentSpin.isFlying && f.difficultEntrance) ||
            this.currentSpin.featureUsed('w'))
            return false;
        return true;
    }

    addARequiredBulletForLevel4() {
        while (true) {
            const randomSelect = easyRandom.pickFromVector([0, 1, 2, 3, 4, 5]);

            if (randomSelect === 0) {
                if (this.currentSpin.features.difficultEntrance) {
                    this.currentSpin.features.difficultExit = true;
                    break;
                }
            } else if (randomSelect === 1) {
                const pos = this.pickNonConflictingPosition();
                if (!this.checkFeatureValidity(pos, 'c')) continue;
                if (pos.addFeature('c', this.normalize)) break;
            } else if (randomSelect === 2) {
                if (this.currentSpin.baseType === 'u' && this.currentSpin.spinSegments[0].getVariationCount() === 0)
                    continue;
                if (this.currentSpin.spinSegments.length < 2) continue;
                if (easyRandom.range(0, 1))
                    this.currentSpin.spinSegments[0].swapDirection();
                else
                    this.currentSpin.spinSegments[1].swapDirection();
                if (easyRandom.range(0, 1))
                    this.currentSpin.spinSegments[1].swapFootness();
                this.currentSpin.changeDirectionFlag = true;
                break;
            } else if (randomSelect === 3) {
                const pos = this.pickNonConflictingPosition();
                if (!this.checkFeatureValidity(pos, 's')) continue;
                if (pos.addFeature('s', this.normalize)) break;
            } else if (randomSelect === 4) {
                if (!this.currentSpin.isFlying) continue;
                this.currentSpin.features.difficultEntrance = true;
                break;
            } else if (randomSelect === 5) {
                const pos = this.pickNonConflictingPosition();
                if (!this.checkFeatureValidity(pos, 'w')) continue;
                if (pos.addFeature('w', this.normalize)) break;
            }
        }
    }

    checkFeatureValidity(spinPosition, featureInQuestion) {
        if (this.adultRuleFlags.active)
            return this.checkFeatureValidityAdult(spinPosition, featureInQuestion);

        if (spinPosition.position === 'u') {
            if (spinPosition.variations.length === 0) {
                if (featureInQuestion === 'c' || featureInQuestion === 's' ||
                    featureInQuestion === '8' || featureInQuestion === 'b')
                    return false;
            }
            if (spinPosition.hasVariation('b') && featureInQuestion === 's')
                return false;
        } else if (spinPosition.position === 's') {
            if (spinPosition.variations.length === 0 && featureInQuestion === '8')
                return false;
            if (spinPosition.parent.footness === 'b' && featureInQuestion === 'c')
                return false;
        }
        if (spinPosition.position !== 'c' && featureInQuestion === 'w')
            return false;
        if (!easyRandom.weightedTruth(FEATURE_ON_SAME_POSITION_PROB) && spinPosition.features.length > 0)
            return false;
        return true;
    }

    checkFeatureValidityAdult(spinPosition, featureInQuestion) {
        if (spinPosition.position === 'u') {
            if (spinPosition.variations.length === 0) {
                if (featureInQuestion === 'c' || featureInQuestion === 's' ||
                    featureInQuestion === '8' || featureInQuestion === 'b')
                    return false;
            }
            if (spinPosition.hasVariation('b') && featureInQuestion === 's')
                return false;
        } else if (spinPosition.position === 's') {
            if (spinPosition.parent.footness === 'b' && featureInQuestion === 'c')
                return false;
        }
        if (spinPosition.position !== 'c' && featureInQuestion === 'w')
            return false;
        if (!easyRandom.weightedTruth(FEATURE_ON_SAME_POSITION_PROB) && spinPosition.features.length > 0)
            return false;
        return true;
    }

    shouldAvoidChangeFootByJump() {
        if (!this.currentSpin.isChangeFoot) return true;
        const firstSegment = this.currentSpin.spinSegments[0];
        const secondSegment = this.currentSpin.spinSegments[1];
        const lastPosOnFirst = firstSegment.spinPositions[firstSegment.spinPositions.length - 1].position;
        const firstPosOnSecond = secondSegment.spinPositions[0].position;

        if (firstPosOnSecond !== 'c' && firstPosOnSecond !== 's') return true;

        if (this.normalize) {
            if (lastPosOnFirst !== 'c' && firstPosOnSecond === 'c') return true;
            if (firstSegment.direction !== secondSegment.direction) return true;
            if (lastPosOnFirst !== 's' && firstSegment.footness === 'b') return true;
        }
        return false;
    }

    spinHistoryToCode() {
        return this.spinHistory.map(s => s.toCode()).join('\n') + '\n';
    }

    spinHistoryPrettyPrint() {
        return this.spinHistory.map(s => s.prettyPrint()).join('\n') + '\n';
    }
}
