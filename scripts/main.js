"use strict";


// add hash to the shopping now btn

let elm = (elm) => document.querySelector(elm);

let menuBtn = elm('.nav-icon');
let menuBar = elm('.dropdown-menu');
let bannerBtn = elm('.banner-btn');
let heroSection = elm('.navbar-center h3');

menuBtn.addEventListener('click', () => {
    menuBar.style.transform.includes("rotateX(90deg)") 
        ? menuBar.style.transform = "translateY(70px) rotateX(0deg)"
        : menuBar.style.transform = "translateY(70px) rotateX(90deg)"
})

bannerBtn.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'products';
});

heroSection.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'top';
});