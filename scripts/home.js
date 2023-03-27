const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";


let events = [];
let categoryList;

const getApi = async () => {
  events = [];
  let response = await fetch(urlAPI);
  let data = await response.json();

  events = data.events;
  renderCards(events, '.cards_home');
  categoryList = extractCategories(events);
  searchByTitleAndDescription();
  generateChecksByCategory();
  listenAndFilter();
}
getApi();

/*------------------------------GENERO UN ARRAY CON CATEGORÍAS SIN REPETIR------------------------------ */
function extractCategories(events) {
  let categories = [];
  events.forEach(element => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });
  return categories;
}

/*------------------------------GENERO LOS CHECKS EN EL HTML POR CADA CATEGORÍA------------------------------ */
const generateChecksByCategory = () => {
  let form = document.querySelector("form.form_check");
  let HTMLchecks = "";
  for (let category of categoryList) {
    HTMLchecks += `<label><input type="checkbox" id="${(category.toLowerCase()).replace(/\s+/g, '')}" value="${(category)}">${category}</label><br>`
  }
  form.innerHTML = HTMLchecks;
}

/*----------------------------ESCUCHO LOS CAMBIOS EN LOS CHECKBOXES Y FILTRO------------------------------ */

const listenAndFilter = () => {
  let inputsChecked = [];
  //Selecciono todos los input de tipo checkbox de mi html.
  let divChecks = document.querySelectorAll("input[type=checkbox]");
  //Recorro cada uno de los input checks.
  divChecks.forEach(inputCheck => {
    //Escucho si existe algún cambio en ellos y ejecuto la funcion tarjetaSeleccionada().
    inputCheck.addEventListener("change", function selectedCard() {
      let ArrInputsChecked = [];
      divChecks.forEach(inputCheck => {
        //Recorro cada uno de los input checks y pregunto si estan en estado "checked" guardo su valor en el array creado anteriormente.
        if (inputCheck.checked) {
          ArrInputsChecked.push(inputCheck.value);
        }
      });
      //Hora de imprimir cards:
      //Si no existe ningún input checkeado imprimo todas las cards disponibles con la función imprimirCards().
      if (ArrInputsChecked.length === 0) {
        renderCards(events, '.cards_home')
      } else {
        //Si no hay texto en el buscador, imprimo las cards correspondientes a los checks marcados con la función imprimirCards() y guardo esa condicion en la variable inputCheckeados.
        if (searchedInputs.length == 0) {
          let selectedcategories = events.filter(event => ArrInputsChecked.includes(event.category));

          renderCards(selectedcategories, '.cards_home');
          inputsChecked = selectedcategories;
        } else {
          //Sino filtro en base a los resultados del buscador de texto que traigo desde la función: busquedaPorNombreyCoincidencia().
          let selectedcategories = searchedInputs.filter(event => ArrInputsChecked.includes(event.category));
          renderCards(selectedcategories, '.cards_home');

          if (selectedcategories == false) {
            let messageErrorFilters = document.querySelector('.cards_home');
            messageErrorFilters.innerHTML = "";
            messageErrorFilters.innerHTML += `
              <div class="mensaje_error_filtros">
                <h5>¡ATTENTION!</h5>
                <p>¡No results found, please try another filter combination!</p>
              </div>
            `
          }
        }
      }
    });
  });
}

/*---------------------------BUSCAR POR NOMBRE Y COINCIDENCIA DE DESCRIPCION------------------------------ */

let searchedInputs = [];

const searchByTitleAndDescription = () => {
  //Capturo el formulario y el input del html.
  let form = document.getElementById('form_searchId');
  let input = document.getElementById('inputSearch');

  //Escucho el evento de tipo submit.
  form.addEventListener('submit', (e) => {
    //Evito que se recargue la página.
    e.preventDefault();
    //Creo una variable busqueda con su input estandarizado.
    const search = input.value.toLowerCase().trim();
    const ArrInputsChecked = [];
    //Selecciono todos los input de tipo checkbox de mi html.
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    //Recorro cada uno de los input checks y pregunto si estan en estado "checkd" guardo su valor en el array creado anteriormente.
    checkboxes.forEach(inputCheck => {
      if (inputCheck.checked) {
        ArrInputsChecked.push(inputCheck.value);
      }
    });
    //Ahora vemos si hay checkboxes seleccionados, filtramos los eventos que coinciden con el input de busqueda utilizando el metodo filter.
    if (ArrInputsChecked.length === 0) {
      const coincidences = events.filter(event => event.name.toLowerCase().includes(search) || event.description.toLowerCase().includes(search)
      );
      //Actualizamos el array con los resultados.
      searchedInputs = coincidences;
      // Llamo a la función imprimirCards() para mostrar los resultados en la página.
      renderCards(coincidences, '.cards_home');
      //Por el contrario si hay checkboxes seleccionados, filtra los eventos que coinciden con el input de busqueda y categoria seleccionada.
      //Mensaje de advertencia, sin resutlados.
      //Sino existen coincidencias con el input de busqueda, muestro el resultado vacio con la función  imprimirCards() junto a un mensaje de advertencia.
      if (coincidences === 0) {
        let messageErrorFilters = document.querySelector('.cards_home');
        messageErrorFilters.innerHTML = "";
        messageErrorFilters.innerHTML += `
        <div class="mensaje_error_filtros">
        <h5>¡ATTENTION!</h5>
        <p>¡No results found, please try another filter combination!</p>
      </div>
      `
      }

    } else {
      const selectedcategories = events.filter(event => ArrInputsChecked.includes(event.category));
      //Almaceno los resultados en la variable coincidencias
      const coincidences = selectedcategories.filter(event => event.name.toLowerCase().includes(search) || event.description.toLowerCase().includes(search));
      //También llama a la función imprimirCards() para mostrar los resultados en la página.
      renderCards(coincidences, '.cards_home');
      //Mensaje de advertencia, sin resultados.
      //Sino existen coincidencias con el input de busqueda, muestro el resultado vacio con la función  imprimirCards() junto a un mensaje de advertencia.
      if (coincidences == false) {
        let messageErrorFilters = document.querySelector('.cards_home');
        messageErrorFilters.innerHTML = "";
        messageErrorFilters.innerHTML += `
        <div class="mensaje_error_filtros">
        <h5>¡ATTENTION!</h5>
        <p>¡No results found, please try another filter combination!</p>
      </div>
      `
      }
    }
  });
};

/*-------------------------------------FUNCION PARA IMPRIMIR CARDS---------------------------------------- */

//Imprime las cards, hay que pasarle por parametro el array que se quiere filtrar y el contenedor donde se lo quiere colocar en el html
function renderCards(arrayToFilter, contentHtml) {
  let containerCards = document.querySelector(contentHtml);
  containerCards.innerHTML = "";
  arrayToFilter.forEach(elementObject => {
    containerCards.innerHTML += `
    <div class="tarjeta">
    <img class="tarjeta-imagen" src="${elementObject.image}" alt="imagen de la card">
      <div class="tarjeta-cuerpo">
        <h5 class="tarjeta-titulo">${elementObject.name}</h5>
      <p class="tarjeta-texto">${elementObject.description}</p>
        <p class="tarjeta-category"><b class="category_card" >Category: </b>${elementObject.category}</p>
      </div>
      <div class="tarjeta-elementos">
        <p class="tarjeta-precio"><b>Price: </b>$${elementObject.price}</p>
        <a class="tarjeta-boton" href="./details.html?id=${elementObject._id}">View more</a>
      </div>
  </div>`;
  });
}








