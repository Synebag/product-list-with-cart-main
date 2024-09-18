
window.addEventListener("load", (event)=> {
    loadProducts();   
});

function loadProducts(){
    fetch(data.json)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');

            data.forEach(product => {
                // Create elements for from json file
                const product = document.createElement('div');
                const productImage = document.createElement('img');
                const productCategory = document.createElement('p');
                const productTitle = document.createElement('h2');
                const productPrice = document.createElement('h3');
                const addCartButton = document.createElement('div');

                // Add classes to elements
                product.classList.add('product');
                productImage.classList.add('product-img');
                addCartButton.classList.add('add-cart-btn');


            });

        })
}a