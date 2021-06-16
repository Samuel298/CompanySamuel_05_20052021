// parametres de requete de l'url pour la page produit 
let para = (new URL(document.location)).searchParams;

const id = para.get("id");

//creation de l'enplacement html
let container = document.getElementById("container");

// constante pour envoie vers localStorage
const addLocalStorage = panier => {
  localStorage.setItem('panier', JSON.stringify(panier));
};
// Display du container html 
const display = camera => {
  container.innerHTML +=`
    <div class="appareil" id="cardsProduct">
      <img src=${camera.imageUrl} alt="">
      <div class="description">
        <p class="nom">${camera.name}</p>
        <span class="appareil-description">
          ${camera.description}
        </span>
        <select class="options" id ="option">
          <option>choix disponibles</option>
        </select>
        <p class="prix"> Prix Unitaire: ${camera.price/ 100}€</p>
        <select class="quantite" id="quantity">           
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>         
        <a href ="basket.html"><button type ="submit" id="panier" value="submit"> Ajouter au panier</button></a>
      </div>
    </div>
  `;
  // creation des option lenses/lentilles
  for (let lenses of camera.lenses){
    document.getElementById('option').innerHTML+=
    `<option value="1">${lenses}</option>`
  }
  // event listener sur le click + fonction ajout au basket
  document.getElementById('panier').addEventListener('click', function () {
    addProductBasket(camera)
  });
};

//Fonction pour l'ajout au panier 
const addProductBasket = camera=> {
  camera.quantity = parseInt(document.getElementById('quantity').value);

  //RECUPERE PANIER//memo : let variable=(condition)? "valeursi vrai": "valeur si faux"
  let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

  //BOUCLE FOR BASKET
  let cameraExistIndex = false;
  for (let i = 0; i < panier.length; i++) {
    let product = panier[i];
    //CONDITION CI PRODUIT EXISTE
    if (product.id === camera.id) {
      cameraExistIndex = i;
    }
  };
  // Caméra existe dans le panier
  if (false !== cameraExistIndex) {
    panier[cameraExistIndex].quantity = parseInt(panier[cameraExistIndex].quantity) + camera.quantity;
  } else {
    panier.push(camera);
  };
  addLocalStorage(panier)
};

// APPELLE API AVEC FETCH
fetch("http://localhost:3000/api/cameras/" + id)
  .then(response => response.json())
  .then(function (product) {
    let camera = new Camera(product)
    display(camera);
  })
  // SI PROBLEME API
  .catch(function(err){
  console.log("fetch Error")
});