let container = document.getElementById("container");

const display = camera => {
    container.innerHTML += `
    <article id="cardsProduct" class="produit">
        <img src=${camera.imageUrl} alt="photos produits" />
        <div class="bloqueDescription">
            <h2> ${camera.name}</h2>
            <p>${camera.price / 100}€</p>
        </div>
        <p>${camera.description}</p>
        <a href="product.html?id=${camera.id}"> En savoir plus</a>
    </article>`
};

fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())  
    .then(function (listeProduct) {
        // boucle for prend un produit de la liste 
        for (let product of listeProduct) {
            let camera = new Camera(product)
            display(camera);
        }
    })

    .catch(function (err) {
        console.log("fetch Error")
        alert("Victime de son succès nos produits sont épuises")
    });