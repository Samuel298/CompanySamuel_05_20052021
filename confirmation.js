//url id 
let paramsUrl = new URL(window.location).searchParams;
let orderId = paramsUrl.get("orderId");

//contact
let contact = JSON.parse(localStorage.getItem("contact"));

// total price
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

// display 
function display (){
    confirmation.innerHTML += `
        <p>
        Merci beaucoup  ${contact.firstName } ${contact.lastName} 
        </p>
        <hr>
        <p>Nous avons bien reçu votre commande N° ${orderId} </br>
        D'un montant de :${prixTotal}  </br>
        </p>
        Un email vous sera envoyer à l'adresse : </br> ${contact.email} a l'envoi de votre commande  
    `
};

display();