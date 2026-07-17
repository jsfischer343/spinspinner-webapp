import { SpinPosition } from './spinposition.js';

const ccwIconPathLight = "/assets/images/rotate_left_black.svg";
const cwIconPathLight = "/assets/images/rotate_right_black.svg";
const ccwIconPathDark = "/assets/images/rotate_left_white.svg";
const cwIconPathDark = "/assets/images/rotate_right_white.svg";

export function getISUSpinCodeAsText(spinObj) {
    let returnString = "";
    if(spinObj.baseType=='e') return "";
    if(spinObj.baseType=='2') return "2FtUSp";
    if(spinObj.isFlying) returnString += "F";
    if(spinObj.isChangeFoot) returnString += "C";
    if(spinObj.baseType=='k') returnString += "Co";
    else returnString += spinObj.baseType.toUpperCase();
    returnString += "Sp";
    if(spinObj.level==0) returnString += "B";
    else returnString += spinObj.level;
    return returnString;
}

export function getSpinHTML(spinObj) {
    let spinHTML = "<ul class=\"spin\">";
    spinHTML += `
        <li class="spin-code">${getISUSpinCodeAsText(spinObj)}</li>`;
    let entranceCardText = "";
    if(spinObj.isFlying) {
        if(spinObj.features.difficultEntrance) {
            entranceCardText = "Difficult Flying Entry";
        }
        else {
            entranceCardText = "Flying Entry";
        }
    }
    else {
        if(spinObj.features.difficultEntrance) {
            entranceCardText = "Difficult Entry";
        }
        else {}
    }
    if(entranceCardText!="") {
        spinHTML += `
            <li class="spin-part">
                <div class="spin-part-text">${entranceCardText}</div>
            </li>
            <li class="spin-separator">
                <picture class="spin-icon">
                    <source srcset="/assets/images/arrow_cool_down_white.svg" media="(prefers-color-scheme: dark)">
                    <img src="/assets/images/arrow_cool_down_black.svg" width="25" height="25">
                </picture>
            </li>`;
    }
    for(let i=0; i < spinObj.spinSegments.length; i++) {
        spinHTML += getSpinSegmentHTML(spinObj.spinSegments[i]);
        if(i!=spinObj.spinSegments.length-1) {
            spinHTML += `
          <li class="spin-separator">
            <picture class="spin-icon">
                <source srcset="/assets/images/arrow_cool_down_white.svg" media="(prefers-color-scheme: dark)">
                <img src="/assets/images/arrow_cool_down_black.svg" width="25" height="25">
            </picture>
          </li>`;
        }
    }
    if(spinObj.features.difficultExit) {
        spinHTML += `
            <li class="spin-separator">
                <picture class="spin-icon">
                    <source srcset="/assets/images/arrow_cool_down_white.svg" media="(prefers-color-scheme: dark)">
                    <img src="/assets/images/arrow_cool_down_black.svg" width="25" height="25">
                </picture>
            </li>
            <li class="spin-part">
                <div class="spin-part-text">Difficult Exit</div>
            </li>`;
    }
    if(spinObj.features.cleanChangeFootSpin) {
        spinHTML += `
            <li class="spin-additional-note">Adult Feature: Both sides must achieve clear basic positions</li>`;
    }
    if(spinObj.features.allThreeBasicPositionsAnywhere) {
        spinHTML += `
            <li class="spin-additional-note">Adult Feature: All three primary basic positions must be achieved</li>`;
    }
    if(spinObj.spinSegments.length===2 && spinObj.baseType==='k') {
        if(spinObj.spinSegments[1].features.allThreeBasicPositionsOnSecondFoot) {
            spinHTML += `
                <li class="spin-additional-note">Adult Feature: All three primary basic positions must be achieved on second foot</li>`;
        }
    }
    spinHTML += "</ul>";
    return spinHTML;
}

export function getSpinSegmentHTML(segmentObj) {
    let segmentHTML = "";
    let rotationDirectionIconPathDark = '';
    let rotationDirectionIconPathLight = '';
    if(segmentObj.direction==='r') rotationDirectionIconPathDark = ccwIconPathDark;
    else rotationDirectionIconPathDark = cwIconPathDark;
    if(segmentObj.direction==='r') rotationDirectionIconPathLight = ccwIconPathLight;
    else rotationDirectionIconPathLight = cwIconPathLight;
    let footnessText = "";
    if(segmentObj.footness==='f') footnessText = "Forward";
    else footnessText = "Backward";
    segmentHTML += `
        <li class="spin-part">
            <div class="spin-part-header">
                <picture class="spin-icon">
                    <source srcset="${rotationDirectionIconPathDark}" media="(prefers-color-scheme: dark)">
                    <img src="${rotationDirectionIconPathLight}" width="25" height="25">
                </picture>
                <div class="spin-part-header-text">${footnessText}</div>
            </div>`;
    for(let i=0;i<segmentObj.spinPositions.length; i++) {
        segmentHTML += getSpinPositionHTML(segmentObj.spinPositions[i]);
        if(i!=segmentObj.spinPositions.length-1) segmentHTML += `<div class="spin-part-separator">+</div>`;
    }
    segmentHTML += `</li>`;
    return segmentHTML;
}

export function getSpinPositionHTML(spinPositionObj) {
    let positionText = capitalize(SpinPosition.prettyPrint(spinPositionObj));
    return `<div class="spin-part-part">${positionText}</div>`;
}


export function capitalize(string) {
    return string.replace(/\b\w/g, c => c.toUpperCase());
}
