//// ---=----Gestion du basket----=--- ////
//recuperation du local storage pour le pannier 
let cameras = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];
//html
let container = document.getElementById("container");
// prix total du basket initaliser a zero 
let prixPanier = 0;
//id product
let addIdBasket = [];
//fonction calcul pour le prix  total du panier et send au local storage 
function priceTotalBasket(camera) {
   prixPanier += camera.quantity * camera.price / 100;
   //variable affichage du prix et send au local storage 
   let prixTotal = document.getElementById('prixTotal').textContent = prixPanier + " € ";
   localStorage.setItem('prixTotal', JSON.stringify(prixTotal));
};
//boucle pour le basket 
cameras.forEach((camera, i) => {
   container.innerHTML += `
    <tr>
        <td class="srcimage"><img src=${camera.imageUrl} alt="" /></td>
        <td>${camera.name}</td>
        <td>${camera.price / 100} €</td>
        <td>${camera.quantity}</td>
        <td><a href="#" class="deleteCamera" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
        <td >${camera.quantity * camera.price / 100} €</td>
    </tr>
  `;
   //appel function calcul pour le prix total 
   priceTotalBasket(camera)
    // boucle for id product 
   for (let i = 0; i < camera.quantity; i++) {
      addIdBasket.push(camera.id);
   }
});
    // function delete camera 
function deleteCamera(id) {
   let camera = cameras[id];
   if (camera.quantity > 1) {
      camera.quantity--;
   } else {
      cameras.splice(id, 1);
   }
   localStorage.setItem('panier', JSON.stringify(cameras));
   window.location.reload();
}

// supprime 1 elements au plus event listener click
document.querySelectorAll(".deleteCamera").forEach(delBtn => {
   delBtn.addEventListener('click', () => deleteCamera(delBtn.dataset.id))
});

let viderPanier = document.getElementById('viderPanier')
viderPanier.addEventListener('click', deleteBasket);

//  function delete basket
function deleteBasket() {
   if (cameras == null) {} else {
      container.remove();
      localStorage.clear();
      window.location.reload();
   }
};

//// --=---formulaire---=--////
function sendTheOrder() {
   let form = document.getElementById("form");
   if (form.reportValidity() == true && addIdBasket.length > 0) {
      let contact = {
         'firstName': document.getElementById("nom").value,
         'lastName': document.getElementById("prenom").value,
         'address': document.getElementById("adresse").value,
         'city': document.getElementById("ville").value,
         'email': document.getElementById("email").value
      };

      let products = addIdBasket;
      let formulaireClient = JSON.stringify({
         contact,
         products,
      });
      // appel l'api avec fetch et envoie avec post 
      fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
               'content-type': "application/json"
            },
            mode: "cors",
            body: formulaireClient
         })
         .then(function (response) {
            return response.json()
         })
         // stringify 
         .then(function (r) {
            localStorage.setItem("contact", JSON.stringify(r.contact));
            window.location.assign("confirmation.html?orderId=" + r.orderId);
         })
         //if proble; with api 
         .catch(function (err) {
            console.log("fetch Error");
         });
   } else {
      alert(" Une erreur est survenue , veuillez verifiez votre panier ")
   };
}

// envoie formulaire 
let envoiFormulaire = document.getElementById("envoiFormulaire");

envoiFormulaire.addEventListener('click', function (event) {
   event.preventDefault();
   sendTheOrder();
});