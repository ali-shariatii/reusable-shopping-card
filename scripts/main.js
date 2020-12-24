"use strict";

/* variable generators */
let elm = (elm) => document.querySelector(elm);
let elms = (elms) => document.querySelectorAll(elms);

/* variables declarations */
const landingPageSection = elm('.navbar-center h3');
const menuBtn = elms('.nav-icon')[0];
const menuBar = elm('.dropdown-menu');
const menuBarOptions = elms('.dropdown-menu li');
const cartBtn = elm('.cart-btn');
const page = elm('body');
const bannerBtn = elm('.banner-btn');
const cartOverly = elm('.cart-overlay');
const cart = elm('.cart');
const closeCart = elm('.close-cart');
const productsDisplayer = elm('.products-center');
const cartContent = elm('.cart-content');
const cartItems = elm('.cart-items');

/* page transitions (navbar & hero) */
landingPageSection.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'landingPageSection';
});

menuBtn.addEventListener('click', (ev) => {
    menuBar.style.transform.includes("rotateX(90deg)") 
        ? menuBar.style.transform = "translateY(70px) rotateX(0deg)"
        : menuBar.style.transform = "translateY(70px) rotateX(90deg)"
    ev.stopPropagation()
})

menuBarOptions[0].addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'landingPageSection';
});

menuBarOptions[1].addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'productsSection';
});

page.addEventListener('click', (ev) => {
    menuBar.style.transform = "translateY(70px) rotateX(90deg)";
    ev.stopPropagation()
});

bannerBtn.addEventListener('click', () => {
    location.hash = 'unknown';
    location.hash = 'productsSection';
});

/* displaying & hiding shopping cart sidebar */
cartBtn.addEventListener('click', () => {
    cartOverly.style.visibility = "visible";
    cart.style.right = "0%";
    page.style.overflowY = "hidden";
});

closeCart.addEventListener('click', () => {
    cartOverly.style.visibility = "hidden";
    cart.style.right = "-100%";
    page.style.overflowY = "scroll";
});

cartOverly.addEventListener('click', function(ev) {
    this.style.visibility = "hidden";
    cart.style.right = "-100%";
    page.style.overflowY = "scroll";
    ev.stopPropagation();
});

cart.addEventListener('click', (ev) => {
    ev.stopPropagation();
});

/* getting, displaying & adding products */
class Products {
    async getProducts() {
        try {
            const getData = await fetch('./products.json');
            if (getData.ok) {
                console.log('Products List Received');
                const data = await getData.json();
                return data;
            } else {
                console.log('No Products Available');
                productsDisplayer.innerHTML = "<p>no item available to purchase at the moment!</p>";
            }
        } catch(error) {
            console.log(`Fetch Error: ${error}`);
        }
    }

    async displayProducts() {
        try {
            const productsList = await this.getProducts()
            await productsList.items.forEach(element => {
                productsDisplayer.innerHTML +=
                `<div class="product">
                    <div class="img-container">
                        <img src=${element.image} alt="product image" class="product-img">
                        <button class="bag-btn" data-id="${element.id}">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Add to bag</span>
                        </button>
                    </div>
                    <h3 class="product-name">${element.name}</h3>
                    <h3 class="product-price">$${element.price}</h3>
                </div>`;
            });
            const availableProducts = productsDisplayer.getElementsByClassName('product');
            return availableProducts;
        } catch(error) {
            console.log(`Fetch Error: ${error}`);
        }
    }

    async addProducts() {
        try {
            const availableProducts = await this.displayProducts();
            let productsArray = Array.from(availableProducts);
            productsArray.forEach(element => {
                element.querySelector('button').addEventListener('click', function() {
                    const bagStat = this.querySelector('span').innerHTML;

                    if (bagStat.includes("bag")) {
                        cartContent.innerHTML +=
                        `<div class="cart-item">
                            <img src=${element.childNodes[1].childNodes[1].src} alt="product">
                            <div>
                                <h4>${element.childNodes[3].innerText}</h4>
                                <h5>${element.childNodes[5].innerText}</h5>
                                <span class="remove-item">remove</span>
                            </div>
                            <div>
                                <i class="fas fa-chevron-up"></i>
                                <p class="item-amount">1</p>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>`;

                        this.innerHTML = 
                        `<i class="fas fa-shopping-cart"></i>
                        <span>Added</span>`;

                        this.style.background = 'rgb(94, 175, 202)';
                        this.style.color = 'white';

                        cartItems.innerHTML ++;
                        CartList.itemsAmount();
                    } else {
                        cartOverly.style.visibility = "visible";
                        cart.style.right = "0%";
                        page.style.overflowY = "hidden";
                    }
                });
            }); 
        } catch(error) {
            console.log(`Fetch Error: ${error}`);
        }
    }
}


/* shopping cart sidebar */
class CartList {
    // chevron functions
     static itemsAmount() {
        // update item icon
        let addItem = elms('.fa-chevron-up');
        let itemsAmount = elms('.item-amount')
        let subtractItem = elms('.fa-chevron-up');
        
            // get access to each chevron number 
            // get access to each chevron up & down
            // on click change chevron item accordingly
    }
        
    // total
    cartTotal() {
        // update it based on the chevrons
    }
    // clear cart
}


/* invoking functions on DOM content load */
document.addEventListener('DOMContentLoaded', () => {
    //const cartList = new CartList();
    const products = new Products();


    products.addProducts();



    // getting, displaying & adding products

});














