
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
                const productCatergory = document.createElement('p');
                const productTitle = document.createElement('h2');
                const productPrice = document.createElement('h3');
                const addCartButton = document.createElement('div');


            });

        })
}a