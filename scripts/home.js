const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";


let eventos = [];
let listaCategorias;

const getApi = async () => {
  eventos = [];
  let response = await fetch(urlAPI);
  let datos = await response.json();

  eventos = datos.events;
  imprimirCards(eventos, '.cards_home');
  listaCategorias = extraerCategorias(eventos);
  busquedaPorNombreyCoincidencia();
  generarChecksPorCategoria();
  escucharyFiltrarCheckBoxes();
}
getApi();

/*------------------------------GENERO UN ARRAY CON CATEGORÍAS SIN REPETIR------------------------------ */
function extraerCategorias(eventos) {
  let categorias = [];
  eventos.forEach(element => {
    if (!categorias.includes(element.category)) {
      categorias.push(element.category);
    }
  });
  return categorias;
}

/*------------------------------GENERO LOS CHECKS EN EL HTML POR CADA CATEGORÍA------------------------------ */
const generarChecksPorCategoria = () => {
  let form = document.querySelector("form.form_check");
  let HTMLchecks = "";
  for (let category of listaCategorias) {
    HTMLchecks += `<label><input type="checkbox" id="${(category.toLowerCase()).replace(/\s+/g, '')}" value="${(category)}">${category}</label><br>`
  }
  form.innerHTML = HTMLchecks;
}

/*----------------------------ESCUCHO LOS CAMBIOS EN LOS CHECKBOXES Y FILTRO------------------------------ */
const escucharyFiltrarCheckBoxes = () => {
  let inputCheckeados = [];
  //Selecciono todos los input de tipo checkbox de mi html.
  let divChecks = document.querySelectorAll("input[type=checkbox]");
  //Recorro cada uno de los input checks.
  divChecks.forEach(inputCheck => {
    //Escucho si existe algún cambio en ellos y ejecuto la funcion tarjetaSeleccionada().
    inputCheck.addEventListener("change", function tarjetaSeleccionada() {
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
        imprimirCards(inputBuscados, '.cards_home')
      } else {
        //Si no hay texto en el buscador, imprimo las cards correspondientes a los checks marcados con la función imprimirCards() y guardo esa condicion en la variable inputCheckeados.
        if (inputBuscados.length == 0) {
          let categoriasSeleccionadas = eventos.filter(evento => ArrInputsChecked.includes(evento.category));

          imprimirCards(categoriasSeleccionadas, '.cards_home');
          inputCheckeados = categoriasSeleccionadas;
        } else {
          //Sino filtro en base a los resultados del buscador de texto que traigo desde la función: busquedaPorNombreyCoincidencia().
          let categoriasSeleccionadas = inputBuscados.filter(evento => ArrInputsChecked.includes(evento.category));
          imprimirCards(categoriasSeleccionadas, '.cards_home');

          if (categoriasSeleccionadas == false) {
            let mensajeErrorFiltros = document.querySelector('.cards_home');
            mensajeErrorFiltros.innerHTML = "";
            mensajeErrorFiltros.innerHTML += `
              <div class="mensaje_error_filtros">
                <h5>¡ATENCIÓN!</h5>
                <p>¡No se han encontrado resultados, intente probando con otra combinación de filtros!</p>
              </div>
            `
          }
        }
      }
    });
  });
}

/*---------------------------BUSCAR POR NOMBRE Y COINCIDENCIA DE DESCRIPCION------------------------------ */

let inputBuscados = [];

const busquedaPorNombreyCoincidencia = () => {
  //Capturo el formulario y el input del html.
  let form = document.getElementById('form_searchId');
  let input = document.getElementById('inputBusqueda');

  //Escucho el evento de tipo submit.
  form.addEventListener('submit', (e) => {
    //Evito que se recargue la página.
    e.preventDefault();
    //Creo una variable busqueda con su input estandarizado.
    const busqueda = input.value.toLowerCase().trim();
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
      const coincidencias = eventos.filter(evento => evento.name.toLowerCase().includes(busqueda) || evento.description.toLowerCase().includes(busqueda)
      );
      //Actualizamos el array con los resultados.
      inputBuscados = coincidencias;
      // Llamo a la función imprimirCards() para mostrar los resultados en la página.
      imprimirCards(coincidencias, '.cards_home');
      //Por el contrario si hay checkboxes seleccionados, filtra los eventos que coinciden con el input de busqueda y categoria seleccionada.
      //Mensaje de advertencia, sin resutlados.
      //Sino existen coincidencias con el input de busqueda, muestro el resultado vacio con la función  imprimirCards() junto a un mensaje de advertencia.
      if (coincidencias === 0) {
        let mensajeErrorFiltros = document.querySelector('.cards_home');
        mensajeErrorFiltros.innerHTML = "";
        mensajeErrorFiltros.innerHTML += `
        <div class="mensaje_error_filtros">
          <h5>¡ATENCIÓN!</h5>
          <p>¡No se han encontrado resultados, intente probando con otra combinación de filtros!</p>
        </div>
      `
      }

    } else {
      const categoriasSeleccionadas = eventos.filter(evento => ArrInputsChecked.includes(evento.category));
      //Almaceno los resultados en la variable coincidencias
      const coincidencias = categoriasSeleccionadas.filter(evento => evento.name.toLowerCase().includes(busqueda) || evento.description.toLowerCase().includes(busqueda));
      //También llama a la función imprimirCards() para mostrar los resultados en la página.
      imprimirCards(coincidencias, '.cards_home');
      //Mensaje de advertencia, sin resultados.
      //Sino existen coincidencias con el input de busqueda, muestro el resultado vacio con la función  imprimirCards() junto a un mensaje de advertencia.
      if (coincidencias == false) {
        let mensajeErrorFiltros = document.querySelector('.cards_home');
        mensajeErrorFiltros.innerHTML = "";
        mensajeErrorFiltros.innerHTML += `
        <div class="mensaje_error_filtros">
          <h5>¡ATENCIÓN!</h5>
          <p>¡No se han encontrado resultados, intente probando con otra combinación de filtros!</p>
        </div>
      `
      }
    }
  });
};

/*-------------------------------------FUNCION PARA IMPRIMIR CARDS---------------------------------------- */

//Imprime las cards, hay que pasarle por parametro el array que se quiere filtrar y el contenedor donde se lo quiere colocar en el html
function imprimirCards(arrayAfiltrar, contenedorHtml) {
  let contenedorCards = document.querySelector(contenedorHtml);
  contenedorCards.innerHTML = "";
  arrayAfiltrar.forEach(elementObject => {
    contenedorCards.innerHTML += `
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








