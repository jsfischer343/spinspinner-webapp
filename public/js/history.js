import { getSpinHTML, getISUSpinCodeAsText, getSpinSegmentHTML, getSpinPositionHTML } from './app-utils.js';

const applicationContainer = document.getElementById('mainapplicationcontainer');
const ccwIconPath = "/assets/images/rotate_left_white.svg";
const cwIconPath = "/assets/images/rotate_right_white.svg";

const historyNavLeftButton = document.getElementById('history-nav-left');
const historyNavRightButton = document.getElementById('history-nav-right');
const historyNavCount = document.getElementById('history-nav-count');

const spinObjArray = JSON.parse(localStorage.getItem('SpinHistory'));
let maxIndex = 0;

historyNavLeftButton.onclick = () => {
    if(spinObjArray===null) return; //empty array guard
    if(currentIndex===null) { currentIndex = spinObjArray.length-1; }
    if(currentIndex==maxIndex||currentIndex==spinObjArray.length-1) { return; }
    else { currentIndex++; };
    let displayedIndex = (maxIndex+1)-currentIndex;
    historyNavCount.innerHTML = `${displayedIndex}/${maxIndex+1}`;
    applicationContainer.innerHTML = getSpinHTML(spinObjArray[currentIndex]);
};

historyNavRightButton.onclick = () => {
    if(spinObjArray===null) return; //empty array guard
    if(currentIndex===null) { currentIndex = spinObjArray.length-1; }
    if(currentIndex==0) { return; }
    else { currentIndex--; };
    let displayedIndex = (maxIndex+1)-currentIndex;
    historyNavCount.innerHTML = `${displayedIndex}/${maxIndex+1}`;
    applicationContainer.innerHTML = getSpinHTML(spinObjArray[currentIndex]);
};


function displayLastSpin() {
    if(spinObjArray===null) return; //empty array guard
    applicationContainer.innerHTML = getSpinHTML(spinObjArray[spinObjArray.length-1]); //display most recent spin spun
}


let currentIndex = null;
if(spinObjArray === null) {
    historyNavCount.innerHTML = `0/0`;
}
else
{
    maxIndex = spinObjArray.length-1;
    historyNavCount.innerHTML = `1/${maxIndex+1}`;
    displayLastSpin();
}
