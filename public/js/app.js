//This file defines top level functions that are used by the main web application; attempting to keep most of the moving parts in other files.
import { defaultPageContent_generate, pageGenerate_init } from '/js/pages/generate.js';
import { defaultPageContent_options, pageOptions_init } from '/js/pages/options.js';
import { defaultPageContent_history, pageHistory_init } from '/js/pages/history.js';
import { defaultPageContent_resources, pageResources_init } from '/js/pages/resources.js';
import { closeMenu as mobileMenuClose } from '/js/utils/mobile-menu.js'

const applicationContainer = document.getElementById('mainapplicationcontainer');
window.changeMainApplicationContent = (page) => { //uses global "window" object to make function usable by global scope. Scripts added to HTML as a module script will make variables and functions private by default.
    mobileMenuClose();
    updateActivePageMisc(page);
    switch(page) {
        case 'generate':
            document.getElementById('menu-item-generate').classList.add('menu-item-active');
            applicationContainer.innerHTML = defaultPageContent_generate;
            pageGenerate_init();
            break;
        case 'options':
            document.getElementById('menu-item-options').classList.add('menu-item-active');
            localStorage.setItem('lastpage','options');
            applicationContainer.innerHTML = defaultPageContent_options;
            pageOptions_init();
            break;
        case 'history':
            document.getElementById('menu-item-history').classList.add('menu-item-active');
            localStorage.setItem('lastpage','history');
            applicationContainer.innerHTML = defaultPageContent_history;
            pageHistory_init();
            break;
        case 'resources':
            document.getElementById('menu-item-resources').classList.add('menu-item-active');
            localStorage.setItem('lastpage','resources');
            applicationContainer.innerHTML = defaultPageContent_resources;
            pageResources_init();
            break;
        default:
            break;
    }
}

function updateActivePageMisc(page) {
    localStorage.setItem('lastpage',page);
    document.getElementById('menu-item-generate').classList.remove('menu-item-active');
    document.getElementById('menu-item-options').classList.remove('menu-item-active');
    document.getElementById('menu-item-history').classList.remove('menu-item-active');
    document.getElementById('menu-item-resources').classList.remove('menu-item-active');
}

let lastPage = localStorage.getItem('lastpage');
if(lastPage === null) changeMainApplicationContent('generate');
else changeMainApplicationContent(lastPage);
