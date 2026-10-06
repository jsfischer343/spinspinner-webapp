import { SpinSpinner } from '/js/spinnerlogic/spinspinner.js'; //used to generate the javascript spin object
import { getSpinHTML } from '/js/utils/app-utils.js'; //used to convert spin object to HTML

export const defaultPageContent_generate = `
    <div class="spin-container" id="spincontainer">
    </div>
    <div class="spin-button-container">
      <button id="spinbutton" onclick="pageGenerate_spin()">Spin</button>
    </div>
`

window.pageGenerate_spin = () => {
    let spinDirection = false;
    let normalize = true;
    if(localStorage.getItem('spinoption-spindirection')==='Clockwise') spinDirection = true;
    if(localStorage.getItem('spinoption-lessweirdness')==='0') normalize = false;
    let spinner = new SpinSpinner(spinDirection,normalize);
    let spinType = localStorage.getItem('spinoption-spintype');
    let spinLevel = localStorage.getItem('spinoption-spinlevel');
    validateSpinLevel(spinLevel);
    updateSpinnerRuleSet(spinner);

    if(spinType === 'Any') spinner.spin(spinLevel);
    else if(spinType === 'Camel') spinner.spin('c',spinLevel);
    else if(spinType === 'Sit') spinner.spin('s',spinLevel);
    else if(spinType === 'Upright') spinner.spin('u',spinLevel);
    else if(spinType === 'Layback') spinner.spin('l',spinLevel);
    else if(spinType === 'Combo') spinner.spin('k',spinLevel);
    else throw new Error('No valid spin option preset');

    //Output HTML
    document.getElementById('spincontainer').innerHTML = getSpinHTML(spinner.spinHistory[0]);
    //And to console (for debugging)
    console.log(spinner.spinHistoryToCode());
    //Cache spin history to browser so user can lookup previous spun spins
    cacheSpin(spinner.spinHistory[0]);
    //cleanup
    spinner.spinHistory = [];
}

function cacheSpin(spinObj) {
    let spinObjArray = JSON.parse(localStorage.getItem('SpinHistory'));
    if(spinObjArray===null) { spinObjArray = [spinObj]; }
    else {
        if(spinObjArray.length<10) { spinObjArray.push(spinObj); }
        else {
            spinObjArray.shift(); //remove first element
            spinObjArray.push(spinObj);
        }
    }
    localStorage.setItem('SpinHistory',JSON.stringify(spinObjArray));
}

function displayLastSpin() {
    let spinObjArray = JSON.parse(localStorage.getItem('SpinHistory'));
    if(spinObjArray===null) pageGenerate_spin(); //If no last spin then generate new spin
    else document.getElementById('spincontainer').innerHTML = getSpinHTML(spinObjArray[spinObjArray.length-1]); //display most recent spin spun
}

function updateSpinnerRuleSet(spinner) {
    spinner.adultRuleFlags = {
        active: false,
        junior_senior: false,
        intermediate_novice: false,
        gold: false,
        silver: false,
        bronze: false,
    };

    let ruleSet = localStorage.getItem('spinoption-ruleset');
    //update ruleset
    if(ruleSet!=='Standard') spinner.adultRuleFlags.active = true;
    if(ruleSet==='Adult Junior-Senior') spinner.adultRuleFlags.junior_senior = true;
    else if(ruleSet==='Adult Junior-Senior') spinner.adultRuleFlags.junior_senior = true;
    else if(ruleSet==='Adult Intermediate-Novice') spinner.adultRuleFlags.intermediate_novice = true;
    else if(ruleSet==='Adult Gold') spinner.adultRuleFlags.gold = true;
    else if(ruleSet==='Adult Silver') spinner.adultRuleFlags.silver = true;
    else if(ruleSet==='Adult Bronze') spinner.adultRuleFlags.bronze = true;
}

function validateSpinLevel(spinLevel) {
    let ruleSet = localStorage.getItem('spinoption-ruleset');
    if(ruleSet==='Adult Gold'&&spinLevel==='4') {
        spinLevel = 3;
    }
    else if(ruleSet==='Adult Silver'&&(spinLevel==='4'||spinLevel==='3')) {
        spinLevel = 2;
    }
    else if(ruleSet==='Adult Bronze'&&(spinLevel==='4'||spinLevel==='3'||spinLevel==='2')) {
        spinLevel = 1;
    }
}

function registerDefaultOptions() {
    if(localStorage.getItem('spinoption-spintype') === null) {
        localStorage.setItem('spinoption-spintype','Any');
    }
    if(localStorage.getItem('spinoption-spinlevel') === null) {
        localStorage.setItem('spinoption-spinlevel','Any');
    }
    if(localStorage.getItem('spinoption-spindirection') === null) {
        localStorage.setItem('spinoption-spindirection','Counterclockwise');
    }
    if(localStorage.getItem('spinoption-ruleset') === null) {
        localStorage.setItem('spinoption-ruleset','Standard');
    }
    if(localStorage.getItem('spinoption-lessweirdness') === null) {
        localStorage.setItem('spinoption-lessweirdness','1');
    }
}

export function pageGenerate_init() { //called once when switched to the page
    displayLastSpin();
}

registerDefaultOptions(); //called once as soon as index.html is loaded
