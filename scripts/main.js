"use strict";

/* variable generators */
let qElm = (qElm, parent = document) => parent.querySelector(qElm);
let qElms = (qElms, parent = document) => parent.querySelectorAll(qElms);
let cElms = (cElms, parent = document) => parent.getElementsByClassName(cElms);

/* variables declarations */
const landingPageSection = qElm('.navbar-center h3');
const menuBtn = qElms('.nav-icon')[0];
const menuBar = qElm('.dropdown-menu');
const menuBarOptions = qElms('.dropdown-menu li');
const cartBtn = qElm('.cart-btn');
const page = qElm('body');
const bannerBtn = qElm('.banner-btn');
const cartOverly = qElm('.cart-overlay');
const cart = qElm('.cart');
const closeCart = qElm('.close-cart');
const productsDisplayer = qElm('.products-center');
const cartContent = qElm('.cart-content');
const cartItemsNumber = qElm('.cart-items-number');

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
            const availableProducts = cElms('product', productsDisplayer);
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
                qElm('button', element).addEventListener('click', function() {
                    const bagStat = qElm('span', this).innerHTML;

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

                        cartItemsNumber.innerHTML ++;
                        CartList.itemsAmount();
                        CartList.totalPrice();
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
    static itemsAmount() {
        let cartItems = cElms('cart-item');
        let cartItemsArray = Array.from(cartItems);

        cartItemsArray.forEach(element => {
            let itemAmount = qElm('.item-amount', element);
            let addAmount = qElm('.fa-chevron-up', element);
            let subtractAmount = qElm('.fa-chevron-down', element);
            let removeItem = qElm('.remove-item', element);

            addAmount.addEventListener('click', () => {
                itemAmount.innerHTML ++;
                this.totalItemsNumber();
                this.totalPrice();
            });

            subtractAmount.addEventListener('click', () => {
                if (itemAmount.innerHTML === '1') {
                    itemAmount.innerHTML = 1;
                    removeItem.style.animation = 'alert 0.3s';
                    this.totalItemsNumber();
                    this.totalPrice();
                    setTimeout(() => {
                        removeItem.style.removeProperty('animation');
                    }, 300);
                } else {
                    itemAmount.innerHTML --;
                    this.totalItemsNumber();
                    this.totalPrice();
                }
            });
        });
    }

    static totalItemsNumber() {
        let totalItemsNumber = qElms('.item-amount', cartContent);
        let totalItemsNumberArray = [];
        totalItemsNumber.forEach(element => totalItemsNumberArray.push(Number(element.innerHTML)));
        let totalResult = 0;
        
        (() => {
            for(let i = 0; i < totalItemsNumberArray.length; i++) {
                totalResult += totalItemsNumberArray[i];
                cartItemsNumber.innerHTML = totalResult;
            }
        })();
    }
        
    static totalPrice() {
        // item-cart h5 > price
        // item-amount > amount
    }
}

/* invoking functions on DOM content load */
document.addEventListener('DOMContentLoaded', () => {
    const cartList = new CartList();
    const products = new Products();

    products.addProducts();

    // getting, displaying & adding products
// cartList.totalItemsNumber();
});














