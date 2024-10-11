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

                //Add content to created elements
                productImage.src = product.image.desktop;
                productCategory.textContent = product.category;
                productTitle.textContent = product.name;
                productPrice.textContent = product.price;
                addCartButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg><p>Add to Cart</p>';

                // Add functions to the add to cart button
                addCartButton.addEventListener('click', () => {

                    let currentProdId = 'product-' + index;

                    //Push the the product object and add an id to each product
                    if (!cartArray.find(prod => prod.id === currentProdId)){
                        cartArray.push({id: currentProdId, quantity: 1});
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

function updateButton(i){

    const addCartButton = document.getElementById(getCurrentId(i));

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
        addQuantityButton.textContent = '+';
        subtractQuantityButton.textContent = '-';
        productQuantity.textContent = getCurrentQuantity(i);

        addCartButton.innerHTML = '';
        addCartButton.append(addQuantityButton, productQuantity ,subtractQuantityButton);
        addCartButton.style.backgroundColor = 'var(--red)';
        addCartButton.style.color = 'var(--rose50)';

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
    }
}


//Declare the cart
const cartDiv = document.getElementById('cart');
const selectedOrder = document.getElementById('selected-order');
const cartPlaceholder = document.getElementById('cart-placeholder');
const cartQuantity = document.getElementById('cart-quantity');
const cartTotal = document.getElementById('cart-total');

//Function to add the products to the cart
function renderToCart(i){
    let totalQuantity = cartArray.reduce((total, product) => total + product.quantity, 0);
    cartQuantity.textContent = totalQuantity;
    
    if (cartArray.length > 0){
        cartPlaceholder.style.display= 'none';
        cartTotal.style.display = 'block';
    }else{
        cartPlaceholder.style.display= 'block';
        cartTotal.style.display = 'none';
    }

    //Get the product object from the product array
    let currentId = 'product-' + i;
    let currentCartId = 'cart-' + currentId;
    let currentName = productArray[i].name;
    let currentPrice = productArray[i].price;
    let currentQuantity = getCurrentQuantity(i);
    let removeProductButton = document.createElement('a');
    removeProductButton.innerHTML=`x`;
    removeProductButton.classList.add('remove-prod-btn');
    removeProductButton.addEventListener('click',() => removeProduct(i));

    let currentElement = selectedOrder.querySelector(`#${currentCartId}`);
    const prodDetailClass = 'cart-prod-detail';
    let elementContent = `
                <div class='${prodDetailClass}'>
                    <div>
                        <h4 class="cart-prod-title">${currentName}</h4>
                        <div>
                            <p>${currentQuantity} @ $${currentPrice} $${currentQuantity*currentPrice}</p>
                        <div>
                    <div>
                </div>`;

    if(currentQuantity > 0){
        if (currentElement) {
            //Updates if it exists
            currentElement.innerHTML = elementContent;
            currentElement.querySelector(`.${prodDetailClass}`).append(removeProductButton);
            
        } else {
             //If it doesn't, it'll add a new one
            let cartOrder = document.createElement('div');
            cartOrder.id = currentCartId;
            cartOrder.innerHTML= elementContent;
                cartOrder.querySelector(`.${prodDetailClass}`).append(removeProductButton);
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

function removeProduct(i){
    let currentId = getCurrentId(i);
    let arrayId = cartArray.findIndex(product => product.id === currentId);
    cartArray.splice(arrayId, 1);
    updateButton(i);
    renderToCart(i);
}