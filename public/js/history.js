import { getSpinHTML, getISUSpinCodeAsText, getSpinSegmentHTML, getSpinPositionHTML } from './app-utils.js';

const applicationContainer = document.getElementById('mainapplicationcontainer');
const ccwIconPath = "/assets/images/rotate_left_white.svg";
const cwIconPath = "/assets/images/rotate_right_white.svg";

const historyNavLeftButton = document.getElementById('history-nav-left');
const historyNavRightButton = document.getElementById('history-nav-right');
const historyNavCount = document.getElementById('history-nav-count');

const spinObjArray = JSON.parse(localStorage.getItem('SpinHistory'));
let currentIndex = null;

historyNavLeftButton.onclick = () => {
    if(spinObjArray===null) return; //empty array guard
    if(currentIndex===null) { currentIndex = spinObjArray.length-1; }
    else if(currentIndex==9||currentIndex==spinObjArray.length-1) { return; }
    else { currentIndex++; };
    let displayedIndex = 10-currentIndex;
    historyNavCount.innerHTML = `${displayedIndex}/10`;
    applicationContainer.innerHTML = getSpinHTML(spinObjArray[currentIndex]);
};

historyNavRightButton.onclick = () => {
    if(spinObjArray===null) return; //empty array guard
    if(currentIndex===null) { currentIndex = spinObjArray.length-1; }
    else if(currentIndex==0) { return; }
    else { currentIndex--; };
    let displayedIndex = 10-currentIndex;
    historyNavCount.innerHTML = `${displayedIndex}/10`;
    applicationContainer.innerHTML = getSpinHTML(spinObjArray[currentIndex]);
};

displayLastSpin();

function displayLastSpin() {
    if(spinObjArray===null) return; //empty array guard
    applicationContainer.innerHTML = getSpinHTML(spinObjArray[spinObjArray.length-1]); //display most recent spin spun
}
