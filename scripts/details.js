let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";


const getApi = async () => {
    eventos = [];
    let response = await fetch(urlAPI);
    let datos = await response.json();

    eventos = datos.events;


    const queryString = location.search; //guardo en una variable la ruta o link que nosotros vamos a tener en el navegador, es decir en la que nos vamos a encontrar en ese momento.CAPTURAMOS RUTA CON ID DE JUGADOR

    const params = new URLSearchParams(queryString); //es una interfaz que atraves de metodos nos va a permitir acceder/obyener los distintos strings de una ruts, es decir los valores y consultas que se le está haciedno.INSTANCIAND/CREANDO NUEVO URLSEARCHPARAMS CON ESA RUTA

    const id = params.get("id"); //capturo a traves del metodo get el id.Y DE DICHA RUTA SACANDO EL PARAMETRO LLAMADO ID

    const elementObject = eventos.find(evento => evento._id == id)//IDENTFICAMOS AL EVENTOS QUE SE LE HACE CLICK Y ASI HACER LA TARJETA

    const divContenedor = document.querySelector(".card_detail");
    divContenedor.innerHTML = `
<img class="tarjeta-imagen-detail" src="${elementObject.image}" alt="imagen de la card">
<div class="content_box_details">
<h2 class="tarjeta-titulo-detail">${elementObject.name}</h2>
<p class="description_details">${elementObject.description}</p>
<div class="another_info_details">
<p><b class="b_details">Category: <br></b>${elementObject.category}.</p>
<p><b class="b_details">Place: <br></b>${elementObject.place}.</p>
<p><b class="b_details">Capacity: <br></b>${elementObject.capacity} people.</p><br>
${elementObject.assistance ? `<p><b class="b_details">Assistance: <br></b>${elementObject.assistance} people.</p>` : ''}
${elementObject.estimate ? `<p><b class="b_details">Estimate: <br></b>${elementObject.estimate}.</p>` : ''}
<p><b class="b_details">Price: <br></b>$${elementObject.price}.</p>
</div>
<br>
<br>
<p><b class="b_details">Date: </b>${elementObject.date}.</p>
</div>
`;

}
getApi();

