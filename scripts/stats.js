let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

const getApi = async () => {
    let eventos = [];
    let response = await fetch(urlAPI);
    let datos = await response.json();
    eventos = datos.events;

    const maxCapacityEvent = eventos.reduce((maxCapacityEvent, event) => {
        return event.capacity > maxCapacityEvent.capacity ? event : maxCapacityEvent;
    }, eventos[0]);

    let maxPercentage = 0;
    let maxEvent = null;

    for (let i = 0; i < eventos.length; i++) {
        const percentage = (eventos[i].assistance / eventos[i].capacity) * 100;

        if (percentage > maxPercentage) {
            maxPercentage = percentage;
            maxEvent = eventos[i];
        }
    }

    let minPercentage = 100;
    let minEvent = null;

    for (let i = 0; i < eventos.length; i++) {
        const event = eventos[i];
        const percentage = (eventos[i].assistance / eventos[i].capacity) * 100;

        if (percentage < minPercentage) {
            minPercentage = percentage;
            minEvent = eventos[i];
        }
    }

    let contenedorStats1 = document.querySelector(".contenido_stats1");
    contenedorStats1.innerHTML = "";
    contenedorStats1.innerHTML += `<h3>Events statistics</h3>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Events with the highest percentage of attendance</th>
                        <th>Events with the lowest percentage of attendance</th>
                        <th>Event with larger capacity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${maxEvent.name}: ${maxPercentage}%</td>
                        <td>${minEvent.name}: ${minPercentage}%</td>
                        <td>${maxCapacityEvent.name}: ${maxCapacityEvent.capacity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        `
        let categorys = [];

        function extraerCategorias(eventos) {
            categorias = [];
            eventos.forEach(element => {
              if (!categorias.includes(element.category)) {
                categorias.push(element.category);
              }
            });
            return categorias;
          }

    let contenedorStats2 = document.querySelector("tbody.tbody2");

    categorys = extraerCategorias(eventos);
    let tableStatsHTML = "";
    categorys.forEach(category => {
         tableStatsHTML +=`<tr>
                         <td>${category}</td>
                         <td>-</td>
                         <td>-</td>
                         </tr>`;
        })
        contenedorStats2.innerHTML = tableStatsHTML;


        let contenedorStats3 = document.querySelector("tbody.tbody3");

    categorys = extraerCategorias(eventos);


    let tableStatsHTML3 = "";

    categorys.forEach(category => {
        tableStatsHTML3 +=`<tr>
                         <td>${category}</td>
                         <td>-</td>
                         <td>-</td>
                         </tr>`;
        })
        contenedorStats3.innerHTML = tableStatsHTML3;
    
}
getApi();