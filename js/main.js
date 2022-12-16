const nav = document.querySelector('.nav');

const showBodyScroll = () => {
	if (!nav.classList.contains('active')) document.body.classList.remove('no-scroll')
}

const changeNavStyle = () => {
	if (window.scrollY >= 150) nav.classList.add('nav-2');
	else nav.classList.remove('nav-2');
}

const removeMenuStyle = () => {
    const dropdown = document.querySelectorAll('.nav__dropdown');

    dropdown.forEach(elem => {
        elem.removeAttribute('style');
        elem.classList.remove('show-dropdown');
        elem.previousElementSibling.firstElementChild.classList.remove('rotate-arrow');
    });
    showBodyScroll();
}


// Change Menu style on resize when window has a min-width od 1024px
const changeMenuOnResize = () => {
	const breakpoint = window.matchMedia("(min-width: 1024px)");

	const changeStyle = e => {
		if (e.matches) {
			removeMenuStyle();
			nav.classList.remove("active");
			showBodyScroll();
		}
	}
	
	breakpoint.addListener(changeStyle);
}

document.addEventListener('click', e => {
    // Show Mobile menu
    if (e.target.matches(".nav__hamburger")) {
        nav.classList.toggle('active');
        showBodyScroll();

        if (nav.classList.contains('active')) {
        	document.body.classList.add("no-scroll");
        	removeMenuStyle();
        }
    }

    // Hide mobile menu
    else if (e.target.matches(".dark-background") ||
        e.target.matches(".nav-link")) {
        nav.classList.remove('active');
        removeMenuStyle()
    }

    // Show dropdown submenu
    else if (e.target.matches(".nav__menu__link")) {
    	e.preventDefault();
    	// If submenu is shown, hide it
        if (e.target.nextElementSibling.classList.contains("show-dropdown")) {
            e.target.nextElementSibling.removeAttribute('style');
            e.target.nextElementSibling.classList.remove('show-dropdown');
            e.target.firstElementChild.classList.remove('rotate-arrow');
        } else { // If submenu is not shown, show it
        	removeMenuStyle()
            const dropdown = e.target.nextElementSibling;
            const arrow = e.target.firstElementChild;
            dropdown.style.height = `${dropdown.scrollHeight}px`;
            dropdown.classList.add('show-dropdown');
            arrow.classList.add('rotate-arrow');
        }
    }
})

document.addEventListener('scroll', () => {
	changeNavStyle();

	if (document.querySelector('.show-dropdown')) removeMenuStyle()
})

document.addEventListener('DOMContentLoaded', () => {
	changeNavStyle()
	changeMenuOnResize()
})