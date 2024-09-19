loadProducts();

function loadProducts(){
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');

            data.forEach(product => {
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

                //Add content to created elements
                productImage.src = product.image.desktop;
                productCategory.textContent = product.category;
                productTitle.textContent = product.name;
                productPrice.textContent = product.price;
                addCartButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg><p>Add to Cart</p>';
                
                // Add functions to the add to cart button
                addCartButton.addEventListener('click', function(){
                    addToCart(addCartButton);
                });

                //Append elements to productDiv
                productDiv.append(productImage, productCategory, productTitle, productPrice, addCartButton);
                productList.appendChild(productDiv);
            });

        })
}

function addToCart(btn){
    btn.innerHTML = '<a>+</a> <p>1</p> <a>-</a>';
    btn.style.backgroundColor = 'var(--red)';
    btn.style.color = 'var(--rose50)';

}