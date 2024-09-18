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
                const productTitle = document.createElement('h2');
                const productPrice = document.createElement('h3');
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

                //Append elements to productDiv
                productDiv.append(productImage, productCategory, productTitle, productPrice, productPrice);
                productList.appendChild(productDiv);
            });

        })
}

loadProducts();