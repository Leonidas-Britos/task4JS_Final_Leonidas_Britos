// let urlAPI = "https://rickandmortyapi.com/api/character";

let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
eventos = [];



async function GetApi() {
    let response = await fetch(urlAPI);
    let datos = await response.json();

     eventos = datos.events;

     console.log(eventos);
     return eventos;
}
GetApi();

