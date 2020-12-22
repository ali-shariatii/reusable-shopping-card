"use strict";


// add hash to the shopping now btn

let elm = (elm) => document.querySelector(elm);
let elms = (elms) => document.querySelectorAll(elms);

let menuBtn = elm('.nav-icon');
let menuBar = elm('.dropdown-menu');
let menuBarOptions = elms('.dropdown-menu li');
let heroSection = elm('.navbar-center h3');
let bannerBtn = elm('.banner-btn');
let page = elm('body');

menuBtn.addEventListener('click', (ev) => {
    menuBar.style.transform.includes("rotateX(90deg)") 
        ? menuBar.style.transform = "translateY(70px) rotateX(0deg)"
        : menuBar.style.transform = "translateY(70px) rotateX(90deg)"
    ev.stopPropagation()
})

page.addEventListener('click', (ev) => {
    menuBar.style.transform = "translateY(70px) rotateX(90deg)";
    ev.stopPropagation()
});

bannerBtn.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'products';
});

menuBarOptions[1].addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'products';
});

heroSection.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'top';
});

menuBarOptions[0].addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'top';
});
