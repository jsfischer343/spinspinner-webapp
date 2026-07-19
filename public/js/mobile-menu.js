const mobileMenuDiv = document.getElementById('mobile-menu-selector');
const menu = document.getElementById('menu-nav');
const mobileMenuIconDark = document.getElementById('mobile-menu-selector-icon-dark');
const mobileMenuIconLight = document.getElementById('mobile-menu-selector-icon-light');

function toggleMenu() {
    if(menu.classList.contains('open')) {
        closeMenu();
    }
    else {
        openMenu();
    }
}

function openMenu() {
    menu.classList.add('open');
    mobileMenuIconDark.srcset = '/assets/images/close_white.svg';
    mobileMenuIconLight.src = '/assets/images/close_black.svg';
}

function closeMenu() {
    menu.classList.remove('open');
    mobileMenuIconDark.srcset = '/assets/images/menu_white.svg';
    mobileMenuIconLight.src = '/assets/images/menu_black.svg';
}

mobileMenuDiv.onclick = toggleMenu;
