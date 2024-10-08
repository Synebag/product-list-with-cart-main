//Declaring array for products and cart to hold data from the json file after they've been fetched
let productArray = [];
let cartArray = [];
let quantityArray = [];

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
                productID = 'product-' + index;
                addCartButton.id = productID;

                //Add content to created elements
                productImage.src = product.image.desktop;
                productCategory.textContent = product.category;
                productTitle.textContent = product.name;
                productPrice.textContent = product.price;
                addCartButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg><p>Add to Cart</p>';
                
                function updateButton(i){
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

                    addCartButton.innerHTML = '';
                    addCartButton.append(addQuantityButton, productQuantity ,subtractQuantityButton);
                    addCartButton.style.backgroundColor = 'var(--red)';
                    addCartButton.style.color = 'var(--rose50)';
                }

                // Add functions to the add to cart button
                addCartButton.addEventListener('click', () => {

                    updateButton(index);

                    //Push the the product object and add an id to each product
                    cartArray.push({...productArray[index], id: 'product' + index});
                    renderToCart(cartArray.length - 1);

                });

                //Append elements to productDiv and productList
                productDiv.append(productImage, productCategory, productTitle, productPrice, addCartButton);
                productList.appendChild(productDiv);
            });

        })
}

//Declare the cart
const cartDiv = document.getElementById('cart');
const selectedOrder = document.getElementById('selected-order');
const cartPlaceholder = document.getElementById('cart-placeholder');
const cartQuantity = document.getElementById('cart-quantity');

//Function to add the products to the cart
function renderToCart(i){
    cartQuantity.textContent = cartArray.length;
    cartPlaceholder.style.display= 'none';

    //Get the product object from the product array
    let currentId = cartArray[i].id;
    let currentCartId = 'cart' + currentId;
    let currentName = cartArray[i].name;
    let currentPrice = cartArray[i].price;
    let currentQuantity = getCurrentQuantity(i);

    //Checks if the cart has the object with the same id
    if(selectedOrder.querySelector(`#${currentCartId}`)){//if it does, it updates the existing innerHTML
        let currentElement = document.getElementById(currentCartId);
        currentElement.innerHTML=`
            <h4>${currentName}</h4>
            <p>${currentQuantity} @ $${currentPrice} $${currentQuantity*currentPrice}</p>`;
    } else {
        //If it doesn't, it'll add a new one
        let cartOrder = document.createElement('div');
        cartOrder.id = currentCartId;
        cartOrder.innerHTML=`
            <h4>${currentName}</h4>
            <p>${currentQuantity} @ $${currentPrice} $${currentQuantity*currentPrice}</p>` 
        selectedOrder.append(cartOrder);
    }
}

//Function to get the current quantity
function getCurrentQuantity(i){
    let currentId = cartArray[i].id;
    let currentQuantity = cartArray.reduce((accumulator, prod) =>{
        return prod.id === currentId ? accumulator + 1 : accumulator;
    }, 0);
    
    return currentQuantity;
}

//Function add quantity
function addQuantity(i){
    let currentId = cartArray[i].id;//get the current product ID
    let arrayId = quantityArray.findIndex(product => product.id === currentId);//Get index of the array with currentId, and return -1 if there isn't one
    if (arrayId !== -1){ //If the index is anything other than -1, do the following
        quantityArray[arrayId].quantity += 1;
    } else {
        quantityArray.push({id: currentId, quantity: 1});
    }
}

//Function to subtract quantity
function subtractQuantity(i){
    let currentId = cartArray[i].id;
    let arrayId = quantityArray.findIndex(product => product.id === currentId);
    if (arrayId !== -1){
        if(quantityArray[arrayId].quantity !== 0){
            quantityArray[arrayId].quantity -= 1;
        }else{
            //function that changes the innerHTML of addCartButton
        }
    }
}