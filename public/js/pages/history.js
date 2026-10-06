import { getSpinHTML } from '/js/utils/app-utils.js';

export const defaultPageContent_history = `
    <div class="history-controls-container">
        <div class="history-nav-count" id="history-nav-count">1/10</div>
        <div class="history-nav-arrows" id="history-nav-left" onclick="pageHistory_prevSpin()">&#60;</div>
        <div class="history-nav-arrows" id="history-nav-right" onclick="pageHistory_nextSpin()">&#62;</div>
    </div>
    <div class="history-container" id="historycontainer">
    </div>
`

let maxIndex = 0;
let currentIndex = null;

window.pageHistory_prevSpin = () => {
    let spinObjArray = JSON.parse(localStorage.getItem('SpinHistory'));
    if(spinObjArray===null) return; //empty array guard
    if(currentIndex===null) { currentIndex = spinObjArray.length-1; }
    if(currentIndex==maxIndex||currentIndex==spinObjArray.length-1) { return; }
    else { currentIndex++; };
    let displayedIndex = (maxIndex+1)-currentIndex;
    document.getElementById('history-nav-count').innerHTML = `${displayedIndex}/${maxIndex+1}`;
    document.getElementById('historycontainer').innerHTML = getSpinHTML(spinObjArray[currentIndex]);
}
window.pageHistory_nextSpin = () => {
    let spinObjArray = JSON.parse(localStorage.getItem('SpinHistory'));
    if(spinObjArray===null) return; //empty array guard
    if(currentIndex===null) { currentIndex = spinObjArray.length-1; }
    if(currentIndex==0) { return; }
    else { currentIndex--; };
    let displayedIndex = (maxIndex+1)-currentIndex;
    document.getElementById('history-nav-count').innerHTML = `${displayedIndex}/${maxIndex+1}`;
    document.getElementById('historycontainer').innerHTML = getSpinHTML(spinObjArray[currentIndex]);
}

export function pageHistory_init() { //called once when switched to the page
    let spinObjArray = JSON.parse(localStorage.getItem('SpinHistory'));
    if(spinObjArray === null) {
        document.getElementById('history-nav-count').innerHTML = `0/0`;
    }
    else
    {
        maxIndex = spinObjArray.length-1;
        document.getElementById('history-nav-count').innerHTML = `1/${maxIndex+1}`;
        document.getElementById('historycontainer').innerHTML = getSpinHTML(spinObjArray[maxIndex]);
    }
}
