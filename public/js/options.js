const lessWeirdnessOption = document.getElementById('option-lessweirdness');
const lessWeirdnessCheckbox = document.getElementById('option-lessweirdness-checkbox');

lessWeirdnessOption.onclick = () => {
    if(lessWeirdnessCheckbox.checked) {
        lessWeirdnessCheckbox.checked = false;
        localStorage.setItem('spinoption-lessweirdness','0');
    }
    else {
        lessWeirdnessCheckbox.checked = true;
        localStorage.setItem('spinoption-lessweirdness','1');
    }
}

checkAndUpdateDefaults();
updateValidOptions();

//SpinType Dropdown
document.getElementById('option-spintype-any').onclick = () => {
    localStorage.setItem('spinoption-spintype','Any');
    document.getElementById('option-selected-text-spintype').innerHTML = 'Any';
}
document.getElementById('option-spintype-camel').onclick = () => {
    localStorage.setItem('spinoption-spintype','Camel');
    document.getElementById('option-selected-text-spintype').innerHTML = 'Camel';
}
document.getElementById('option-spintype-sit').onclick = () => {
    localStorage.setItem('spinoption-spintype','Sit');
    document.getElementById('option-selected-text-spintype').innerHTML = 'Sit';
}
document.getElementById('option-spintype-upright').onclick = () => {
    localStorage.setItem('spinoption-spintype','Upright');
    document.getElementById('option-selected-text-spintype').innerHTML = 'Upright';
}
document.getElementById('option-spintype-layback').onclick = () => {
    localStorage.setItem('spinoption-spintype','Layback');
    document.getElementById('option-selected-text-spintype').innerHTML = 'Layback';
}
document.getElementById('option-spintype-combo').onclick = () => {
    localStorage.setItem('spinoption-spintype','Combo');
    document.getElementById('option-selected-text-spintype').innerHTML = 'Combo';
}

//SpinLevel Dropdown
document.getElementById('option-spinlevel-any').onclick = () => {
    localStorage.setItem('spinoption-spinlevel','Any');
    document.getElementById('option-selected-text-spinlevel').innerHTML = 'Any';
}
document.getElementById('option-spinlevel-base').onclick = () => {
    localStorage.setItem('spinoption-spinlevel','Base');
    document.getElementById('option-selected-text-spinlevel').innerHTML = 'Base';
}
document.getElementById('option-spinlevel-1').onclick = () => {
    localStorage.setItem('spinoption-spinlevel','1');
    document.getElementById('option-selected-text-spinlevel').innerHTML = '1';
}
document.getElementById('option-spinlevel-2').onclick = () => {
    localStorage.setItem('spinoption-spinlevel','2');
    document.getElementById('option-selected-text-spinlevel').innerHTML = '2';
}
document.getElementById('option-spinlevel-3').onclick = () => {
    localStorage.setItem('spinoption-spinlevel','3');
    document.getElementById('option-selected-text-spinlevel').innerHTML = '3';
}
document.getElementById('option-spinlevel-4').onclick = () => {
    localStorage.setItem('spinoption-spinlevel','4');
    document.getElementById('option-selected-text-spinlevel').innerHTML = '4';
}

//SpinDirection Dropdown
document.getElementById('option-spindirection-cc').onclick = () => {
    localStorage.setItem('spinoption-spindirection','Counterclockwise');
    document.getElementById('option-selected-text-spindirection').innerHTML = 'Counterclockwise';
}
document.getElementById('option-spindirection-c').onclick = () => {
    localStorage.setItem('spinoption-spindirection','Clockwise');
    document.getElementById('option-selected-text-spindirection').innerHTML = 'Clockwise';
}

//RuleSet Dropdown
document.getElementById('option-ruleset-s').onclick = () => {
    localStorage.setItem('spinoption-ruleset','Standard');
    document.getElementById('option-selected-text-ruleset').innerHTML = 'Standard';
    updateValidOptions();
}
document.getElementById('option-ruleset-ajs').onclick = () => {
    localStorage.setItem('spinoption-ruleset','Adult Junior-Senior');
    document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Junior-Senior';
    updateValidOptions();
}
document.getElementById('option-ruleset-ain').onclick = () => {
    localStorage.setItem('spinoption-ruleset','Adult Intermediate-Novice');
    document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Intermediate-Novice';
    updateValidOptions();
}
document.getElementById('option-ruleset-ag').onclick = () => {
    localStorage.setItem('spinoption-ruleset','Adult Gold');
    document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Gold';
    updateValidOptions();
}
document.getElementById('option-ruleset-as').onclick = () => {
    localStorage.setItem('spinoption-ruleset','Adult Silver');
    document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Silver';
    updateValidOptions();
}
document.getElementById('option-ruleset-ab').onclick = () => {
    localStorage.setItem('spinoption-ruleset','Adult Bronze');
    document.getElementById('option-selected-text-ruleset').innerHTML = 'Adult Bronze';
    updateValidOptions();
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
