export const defaultPageContent_options = `
    <ul class="option-list">
        <li class="option-item has-dropdown">
            <div class="option-desc-text">SpinType</div>
            <div class="option-selected-text" id="option-selected-text-spintype">Any</div>
            <ul class="dropdown-content">
            <li id="option-spintype-any" onclick="pageOptions_setSpinType('Any')">Any</li>
            <li id="option-spintype-camel" onclick="pageOptions_setSpinType('Camel')">Camel</li>
            <li id="option-spintype-sit" onclick="pageOptions_setSpinType('Sit')">Sit</li>
            <li id="option-spintype-upright" onclick="pageOptions_setSpinType('Upright')">Upright</li>
            <li id="option-spintype-layback" onclick="pageOptions_setSpinType('Layback')">Layback</li>
            <li id="option-spintype-combo" onclick="pageOptions_setSpinType('Combo')">Combo</li>
            </ul>
        </li>
        <li class="option-item has-dropdown">
            <div class="option-desc-text">Spin Level</div>
            <div class="option-selected-text" id="option-selected-text-spinlevel">Any</div>
            <ul class="dropdown-content">
            <li id="option-spinlevel-any" onclick="pageOptions_setSpinLevel('Any')">Any</li>
            <li id="option-spinlevel-base" onclick="pageOptions_setSpinLevel('Base')">Base</li>
            <li id="option-spinlevel-1" onclick="pageOptions_setSpinLevel('1')">1</li>
            <li id="option-spinlevel-2" onclick="pageOptions_setSpinLevel('2')">2</li>
            <li id="option-spinlevel-3" onclick="pageOptions_setSpinLevel('3')">3</li>
            <li id="option-spinlevel-4" onclick="pageOptions_setSpinLevel('4')">4</li>
            </ul>
        </li>
        <li class="option-item has-dropdown">
            <div class="option-desc-text">Preferred Spin Direction</div>
            <div class="option-selected-text" id="option-selected-text-spindirection">Counterclockwise</div>
            <ul class="dropdown-content">
            <li id="option-spindirection-cc" onclick="pageOptions_setSpinDirection('Counterclockwise')">Counterclockwise</li>
            <li id="option-spindirection-c" onclick="pageOptions_setSpinDirection('Clockwise')">Clockwise</li>
            </ul>
        </li>
        <li class="option-item has-dropdown">
            <div class="option-desc-text">Rule Set</div>
            <div class="option-selected-text" id="option-selected-text-ruleset">Standard</div>
            <ul class="dropdown-content">
            <li id="option-ruleset-s" onclick="pageOptions_setSpinRuleSet('Standard')">Standard</li>
            <li id="option-ruleset-ajs" onclick="pageOptions_setSpinRuleSet('Adult Junior-Senior')">Adult Junior-Senior</li>
            <li id="option-ruleset-ain" onclick="pageOptions_setSpinRuleSet('Adult Intermediate-Novice')">Adult Intermediate-Novice</li>
            <li id="option-ruleset-ag" onclick="pageOptions_setSpinRuleSet('Adult Gold')">Adult Gold</li>
            <li id="option-ruleset-as" onclick="pageOptions_setSpinRuleSet('Adult Silver')">Adult Silver</li>
            <li id="option-ruleset-ab" onclick="pageOptions_setSpinRuleSet('Adult Bronze')">Adult Bronze</li>
            </ul>
        </li>
        <li class="option-item place-center" id="option-lessweirdness" onclick="pageOptions_toggleLessWeirdness()">
            <label for="option-lessweirdness" class="option-item-label" id="optiontext-lessweirdness">Less Weirdness</label>
            <input type="checkbox" id="option-lessweirdness-checkbox" disabled>
        </li>
    </ul>
`

//SpinType Dropdown
window.pageOptions_setSpinType = (type) => {
    localStorage.setItem('spinoption-spintype',type);
    document.getElementById('option-selected-text-spintype').innerHTML = type;
}

//SpinLevel Dropdown
window.pageOptions_setSpinLevel = (level) => {
    localStorage.setItem('spinoption-spinlevel',level);
    document.getElementById('option-selected-text-spinlevel').innerHTML = level;
}

//SpinDirection Dropdown
window.pageOptions_setSpinDirection = (direction) => {
    localStorage.setItem('spinoption-spindirection',direction);
    document.getElementById('option-selected-text-spindirection').innerHTML = direction;
}

//RuleSet Dropdown
window.pageOptions_setSpinRuleSet = (ruleset) => {
    localStorage.setItem('spinoption-ruleset',ruleset);
    document.getElementById('option-selected-text-ruleset').innerHTML = ruleset;
    updateValidOptions();
}

//Less weirdness Toggle
window.pageOptions_toggleLessWeirdness = () => {
    let lessWeirdnessCheckbox = document.getElementById('option-lessweirdness-checkbox');
    if(lessWeirdnessCheckbox.checked) {
        lessWeirdnessCheckbox.checked = false;
        localStorage.setItem('spinoption-lessweirdness','0');
    }
    else {
        lessWeirdnessCheckbox.checked = true;
        localStorage.setItem('spinoption-lessweirdness','1');
    }
}

function updateSelectedOptionText() {
    //SpinType Dropdown

    if(localStorage.getItem('spinoption-spintype') === 'Any')
        document.getElementById('option-selected-text-spintype').innerHTML = 'Any';

    if(localStorage.getItem('spinoption-spintype') === 'Camel')
        document.getElementById('option-selected-text-spintype').innerHTML = 'Camel';

    if(localStorage.getItem('spinoption-spintype') === 'Sit')
        document.getElementById('option-selected-text-spintype').innerHTML = 'Sit';

    if(localStorage.getItem('spinoption-spintype') === 'Upright')
        document.getElementById('option-selected-text-spintype').innerHTML = 'Upright';

    if(localStorage.getItem('spinoption-spintype') === 'Layback')
        document.getElementById('option-selected-text-spintype').innerHTML = 'Layback';

    if(localStorage.getItem('spinoption-spintype') === 'Combo')
        document.getElementById('option-selected-text-spintype').innerHTML = 'Combo';

    //SpinLevel Dropdown

    if(localStorage.getItem('spinoption-spinlevel') === 'Any')
        document.getElementById('option-selected-text-spinlevel').innerHTML = 'Any';

    if(localStorage.getItem('spinoption-spinlevel') === 'Base')
        document.getElementById('option-selected-text-spinlevel').innerHTML = 'Base';

    if(localStorage.getItem('spinoption-spinlevel') === '1')
        document.getElementById('option-selected-text-spinlevel').innerHTML = '1';

    if(localStorage.getItem('spinoption-spinlevel') === '2')
        document.getElementById('option-selected-text-spinlevel').innerHTML = '2';

    if(localStorage.getItem('spinoption-spinlevel') === '3')
        document.getElementById('option-selected-text-spinlevel').innerHTML = '3';

    if(localStorage.getItem('spinoption-spinlevel') === '4')
        document.getElementById('option-selected-text-spinlevel').innerHTML = '4';

    //SpinDirection Dropdown

    if(localStorage.getItem('spinoption-spindirection') === 'Counterclockwise')
        document.getElementById('option-selected-text-spindirection').innerHTML = 'Counterclockwise';

    if(localStorage.getItem('spinoption-spindirection') === 'Clockwise')
        document.getElementById('option-selected-text-spindirection').innerHTML = 'Clockwise';

    //RuleSet Dropdown

    if(localStorage.getItem('spinoption-ruleset') === 'Standard')
        document.getElementById('option-selected-text-ruleset').innerHTML = 'Standard';

    if(localStorage.getItem('spinoption-ruleset') === 'Adult Junior-Senior')
        document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Junior-Senior';

    if(localStorage.getItem('spinoption-ruleset') === 'Adult Intermediate-Novice')
        document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Intermediate-Novice';

    if(localStorage.getItem('spinoption-ruleset') === 'Adult Gold')
        document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Gold';

    if(localStorage.getItem('spinoption-ruleset') === 'Adult Silver')
        document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Silver';

    if(localStorage.getItem('spinoption-ruleset') === 'Adult Bronze')
        document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Bronze';

    //LessWeirdness Toggle
    let lessWeirdnessCheckbox = document.getElementById('option-lessweirdness-checkbox');
    if(localStorage.getItem('spinoption-lessweirdness')==='1') {
        lessWeirdnessCheckbox.checked = true;
    }
    else {
        lessWeirdnessCheckbox.checked = false;
    }
}

function checkAndUpdateDefaults() {
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

function updateValidOptions() {
    let ruleSet = localStorage.getItem('spinoption-ruleset');
    let currentLevel = localStorage.getItem('spinoption-spinlevel');
    let optionLevel4 = document.getElementById('option-spinlevel-4');
    let optionLevel3 = document.getElementById('option-spinlevel-3');
    let optionLevel2 = document.getElementById('option-spinlevel-2');
    if(ruleSet==='Standard'||
        ruleSet==='Adult Junior-Senior'||
        ruleSet==='Adult Intermediate-Novice'
    ) {
        optionLevel4.classList.remove('no-display');
        optionLevel3.classList.remove('no-display');
        optionLevel2.classList.remove('no-display');
    }
    else if(ruleSet==='Adult Gold') {
        optionLevel4.classList.add('no-display');
        optionLevel3.classList.remove('no-display');
        optionLevel2.classList.remove('no-display');
        if(currentLevel==='4') localStorage.setItem('spinoption-spinlevel','3');
    }
    else if(ruleSet==='Adult Silver') {
        optionLevel4.classList.add('no-display');
        optionLevel3.classList.add('no-display');
        optionLevel2.classList.remove('no-display');
        if(currentLevel==='4'||currentLevel==='3') localStorage.setItem('spinoption-spinlevel','2');

    }
    else if(ruleSet==='Adult Bronze') {
        optionLevel4.classList.add('no-display');
        optionLevel3.classList.add('no-display');
        optionLevel2.classList.add('no-display');
        if(currentLevel==='4'||currentLevel==='3'||currentLevel==='2') localStorage.setItem('spinoption-spinlevel','1');
    }
    updateSelectedOptionText();
}


export function pageOptions_init() { //called once when switched to the page
    updateValidOptions();
}

checkAndUpdateDefaults(); //called once as soon as index.html is loaded
