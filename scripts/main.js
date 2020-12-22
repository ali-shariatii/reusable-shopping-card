"use strict";

let elm = (elm) => document.querySelector(elm);
let elms = (elms) => document.querySelectorAll(elms);

let landingPageSection = elm('.navbar-center h3');
let menuBtn = elm('.nav-icon');
let menuBar = elm('.dropdown-menu');
let menuBarOptions = elms('.dropdown-menu li');
let page = elm('body');
let bannerBtn = elm('.banner-btn');

/* global settings */
/* end of global settings */

/* navbar */
landingPageSection.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'top';
});

menuBtn.addEventListener('click', (ev) => {
    menuBar.style.transform.includes("rotateX(90deg)") 
        ? menuBar.style.transform = "translateY(70px) rotateX(0deg)"
        : menuBar.style.transform = "translateY(70px) rotateX(90deg)"
    ev.stopPropagation()
})

menuBarOptions[0].addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'top';
});

menuBarOptions[1].addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'products';
});

page.addEventListener('click', (ev) => {
    menuBar.style.transform = "translateY(70px) rotateX(90deg)";
    ev.stopPropagation()
});
/* end of navbar */

/* hero */
bannerBtn.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'products';
});
/* end of hero */

/* products */
/* a single product */
/* end of a single product */
/* end of products */

/* shopping cart sidebar */
/* a single cart item */
/* end of a single cart item */
/* cart footer */
/* end of cart footer */
/* end of shopping cart sidebar */














