//Declaring array for products and cart to hold data from the json file after they've been fetched
let productArray = [];
let cartArray = [];

loadProducts();

function loadProducts(){
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            let productID = '';
            productArray = data;

            data.forEach((product, index) => {
                // Create elements for from json file
                const productDiv = document.createElement('div');
                const productImage = document.createElement('img');
                const productCategory = document.createElement('p');
                const productTitle = document.createElement('p');
                const productPrice = document.createElement('p');
                const addCartButton = document.createElement('div');

                // Add classes to elements
                productDiv.classList.add('product');
                productImage.classList.add('product-img');
                addCartButton.classList.add('add-cart-btn');

                // Add an ID to every product so it can be refered and added to the cart
                productID = getCurrentId(index);
                addCartButton.id = productID;
                productImage.id = 'prod-img-' + index;

                //Add content to created elements
                productImage.src = product.image.desktop;
                productCategory.textContent = product.category;
                productTitle.textContent = product.name;
                productPrice.textContent = formatPrice(product.price);
                addCartButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg><p>Add to Cart</p>';

                // Add functions to the add to cart button
                addCartButton.addEventListener('click', () => {

                    let currentProdId = 'product-' + index;

                    //Push the the product object and add an id to each product
                    if (!cartArray.find(prod => prod.id === currentProdId)){
                        cartArray.push({id: currentProdId, quantity: 1, price: formatPrice(product.price)});
                    };

                    updateButton(index);
                    renderToCart(index);

                });

                //Append elements to productDiv and productList
                productDiv.append(productImage, productCategory, productTitle, productPrice, addCartButton);
                productList.appendChild(productDiv);
            });

        })
}

//Function to turn prices to 2 decimal points
function formatPrice(price){
    return parseFloat(price).toFixed(2);
}

function updateButton(i){

    let imageId = 'prod-img-' + i;
    const addCartButton = document.getElementById(getCurrentId(i));
    const currentProductImage = document.getElementById(imageId);
    console.log(currentProductImage);

    if(getCurrentQuantity(i) !== 0){
        //Change button color and add the quantity buttons
        const addQuantityButton = document.createElement('a');
        const subtractQuantityButton = document.createElement('a');
        const productQuantity = document.createElement('p');

        //Add the '+' and '-' button to in the button
        addQuantityButton.classList.add('add-quantity', 'quantity-btn');
        subtractQuantityButton.classList.add('subtract-quantity', 'quantity-btn');
        productQuantity.id = 'product-' + i + '-quantity';

        //change the text context accordingly
        addQuantityButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>';
        subtractQuantityButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>';
        productQuantity.textContent = getCurrentQuantity(i);

        addCartButton.innerHTML = '';
        addCartButton.append(addQuantityButton, productQuantity ,subtractQuantityButton);
        addCartButton.style.backgroundColor = 'var(--red)';
        addCartButton.style.color = 'var(--rose50)';
        currentProductImage.style.border = "2px solid var(--red)"

        addQuantityButton.addEventListener('click',(event) => {
            event.stopPropagation();
            addQuantity(i);
        });
        subtractQuantityButton.addEventListener('click',(event) => {
            event.stopPropagation();
            subtractQuantity(i);
        });
    } else {
        addCartButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg><p>Add to Cart</p>';
        addCartButton.style.backgroundColor = 'var(--rose50)';
        addCartButton.style.color = 'var(--black)';
        currentProductImage.style.border = "none";
    }
}


//Declare the cart
const cartDiv = document.getElementById('cart');
const selectedOrder = document.getElementById('selected-order');
const cartPlaceholder = document.getElementById('cart-placeholder');
const cartQuantity = document.getElementById('cart-quantity');
const cartTotal = document.getElementById('cart-total');
const totalAmount = document.getElementById('total-amount');
const confirmOrderSection= document.getElementById('confirm-order-section');
const confirmOrderButton = document.getElementById('confirm-order-btn');
const modalContainer = document.getElementById('modal-container');
const modalConfirmedOrder = document.getElementById('confirmed-order');
const modalStartNewButton = document.getElementById('start-new-btn');
const modalTotal = document.getElementById('modal-total');

confirmOrderButton.addEventListener('click', modalPopup);
modalStartNewButton.addEventListener('click', modalClose);

document.addEventListener('DOMContentLoaded', function() {
    modalContainer.style.height = '100vh';
});

//Function to add the products to the cart
function renderToCart(i){
    let totalQuantity = cartArray.reduce((total, product) => total + product.quantity, 0);
    let priceTotal = formatPrice(cartArray.reduce((total,product) => total + (product.quantity * product.price), 0));
    cartQuantity.textContent = totalQuantity;
    totalAmount.textContent = '$' + priceTotal;
    
    if(cartArray.length > 0){
        cartPlaceholder.style.display = 'none';
        cartTotal.style.display = 'flex';
        confirmOrderSection.style.display = 'flex'; 

    }else{
        cartPlaceholder.style.display = 'flex';
        cartTotal.style.display = 'none';
        confirmOrderSection.style.display = 'none';
    }

    //Get the product object from the product array
    let currentId = 'product-' + i;
    let currentCartId = 'cart-' + currentId;
    let currentName = productArray[i].name;
    let currentPrice = formatPrice(productArray[i].price);
    let currentQuantity = getCurrentQuantity(i);
    let removeProductButton = document.createElement('a');
    removeProductButton.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>`;
    removeProductButton.classList.add('remove-prod-btn');
    removeProductButton.addEventListener('click',() => removeProduct(i));

    let currentElement = selectedOrder.querySelector(`#${currentCartId}`);
    const prodDetailClass = 'cart-prod-detail';
    const hrTag = document.createElement('hr');
    let elementContent = `
                <div class='${prodDetailClass}'>
                    <div>
                        <h5 class="cart-prod-title">${currentName}</h5>
                        <div>
                            <p>${currentQuantity}x @ $${currentPrice} $${formatPrice(currentQuantity*currentPrice)}</p>
                        <div>
                    <div>
                </div>`;

    if(currentQuantity > 0){
        if (currentElement) {
            //Updates if it exists
            currentElement.innerHTML = elementContent;
            currentElement.querySelector(`.${prodDetailClass}`).appendChild(removeProductButton);
            currentElement.append(hrTag);
            
        } else {
             //If it doesn't, it'll add a new one
            let cartOrder = document.createElement('div');
            cartOrder.id = currentCartId;
            cartOrder.innerHTML= elementContent;
            cartOrder.querySelector(`.${prodDetailClass}`).appendChild(removeProductButton);
            cartOrder.append(hrTag);
            selectedOrder.append(cartOrder);
        }
    }else if (currentElement){//if it's less than 0 and it still exists in the array, remove it.
        setTimeout(() => currentElement.remove(), 0);
        console.log('product removed');
    }

}

//Helper function to get the current ID of a function
function getCurrentId(i){
    return 'product-' + i;
}

//Function to get the current quantity
function getCurrentQuantity(i){
    let currentId = getCurrentId(i);
    let currentQuantity = cartArray.find(prod => prod.id === currentId);

    if (!currentQuantity){
        return 0;
    }else{
        return currentQuantity.quantity;
    }
}

//Function add quantity
function addQuantity(i){
    let currentId = getCurrentId(i);//get the current product ID
    let arrayId = cartArray.findIndex(product => product.id === currentId);//Get index of the array with currentId, and return -1 if there isn't one
        cartArray[arrayId].quantity += 1;
    updateButton(i);
    renderToCart(i);
}

//Function to subtract quantity
function subtractQuantity(i){
    let currentId = getCurrentId(i);
    let arrayId = cartArray.findIndex(product => product.id === currentId);
    if (arrayId !== -1){//if the product exists in array
        if (cartArray[arrayId].quantity > 0) {//if it's more than 0
            cartArray[arrayId].quantity -= 1;//deduct quantity by 1
            console.log(cartArray);
            if(cartArray[arrayId].quantity === 0){
                cartArray.splice(arrayId, 1);
                console.log(cartArray);
            }

            updateButton(i);
            renderToCart(i);
        }
    }
}

//Function to remove product from cart
function removeProduct(i){
    let currentId = getCurrentId(i);
    let arrayId = cartArray.findIndex(product => product.id === currentId);
    cartArray.splice(arrayId, 1);
    updateButton(i);
    renderToCart(i);
}

//Function to pop up the modal
function modalPopup(){
    modalContainer.style.display = 'flex';
    modalConfirmedOrder.innerHTML = ''; //Empty out the modal to reset

    let priceTotal = cartArray.reduce((total,product) => total + (product.quantity * product.price), 0);
    priceTotal = formatPrice(priceTotal);
    modalTotal.innerHTML = `<p>Order Total</p> <h2>$${priceTotal}</h2>`;

    cartArray.forEach((product) => {
        const productIndex = productArray.findIndex(p => `product-${productArray.indexOf(p)}` === product.id);// For each product in productArray, get the first index that equals to product.id. 
        let selected = productArray[productIndex];
        let content = `
                <div class='modal-prod'>
                    <div class="cart-prod">
                        <img class="modal-thumbnail" src="${selected.image.thumbnail}">
                        <div class="cart-prod-desc">
                            <h5 class="cart-prod-title">${selected.name}</h5>
                            <p>${product.quantity}x  @$${formatPrice(product.price)}</p>
                        </div>
                        <p class="cart-prod-total">$${formatPrice(product.quantity*product.price)}</p>
                    </div>
                </div>
                <hr>`;
        modalConfirmedOrder.innerHTML += content;
    });


    
    console.log(cartArray);
}

//Function to close modal 
function modalClose(){
    modalContainer.style.display = 'none';
    modalConfirmedOrder.innerHTML = '';
    [...cartArray].forEach((product) => {
        console.log(product.id);
        let index = product.id.replace('product-','');
        removeProduct(index);
    });
    console.log(cartArray);
}

