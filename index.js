
function scrollHeader() {
    const header = document.getElementById('header')

    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)



function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)





let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// =====OPEN & CLOSE=======
cartIcon.onclick = () => {
    cart.classList.add('active');
}

closeCart.onclick = () => {
    cart.classList.remove('active');
}

// =====REMOVING ITEMS=======

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}


function ready() {
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    //  quantity
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }

    // add to cart

    let addCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // buy button

    document.getElementsByClassName('buy-btn')[0]
    .addEventListener('click', buyBtnClicked)
}

    // buy button
function buyBtnClicked(){
    alert('You Order is placed');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal();
}




function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}



// =====QUANTITY=======
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// =====ADD TO CART=======
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('menu__name')[0].innerText;
    let price = shopProducts.getElementsByClassName('menu__price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('menu__img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {

        if(cartItemsNames[i].innerHTML == title){
        alert('You have already add this item to cart');
        return;
        }
    }



    let cartBoxContent = `
                <img src="${productImg} " alt="" class="cart-img">

                <div class="detail-box">
                   <div class="cart-product-title">${title}</div>
                   <div class="cart-price">${price}</div>
                   <input type="number" value="1" class="cart-quantity">
                </div>

                 <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);

    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);


}




// =====TOTAL=======

function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = document.getElementsByClassName('cart-box');
    let total = 0

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // with cents
        total = Math.round((total * 100) / 100);

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
}



// icon
let addsCart = document.getElementsByClassName('add-cart')
for(but of addsCart)
{
    but.addEventListener('click', (e) =>{
        let add = Number(cartIcon.getAttribute('data-count') || 0);
        cartIcon.setAttribute('data-count', add + 1);
        cartIcon.classList.add('zero')
    })
}
