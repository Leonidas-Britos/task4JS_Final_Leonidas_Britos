let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

const getApi = async () => {
    let eventos = [];
    let response = await fetch(urlAPI);
    let datos = await response.json();
    eventos = datos.events;


    /*/////////////////////////////////////*/


    const maxCapacityEvent = eventos.reduce((maxCapacityEvent, event) => {
        return event.capacity > maxCapacityEvent.capacity ? event : maxCapacityEvent;
    }, eventos[0]);
    /*/////////////////////////////////////*/

    let maxPercentage = 0;
    let maxEvent = null;

    for (let i = 0; i < eventos.length; i++) {
        const percentage = (eventos[i].assistance / eventos[i].capacity) * 100;

        if (percentage > maxPercentage) {
            maxPercentage = percentage;
            maxEvent = eventos[i];
        }
    }
    /*/////////////////////////////////////*/
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
    /*/////////////////////////////////////*/
    

    /*/////////////////////////////////////*/

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

    let contenedorStats2 = document.querySelector(".contenido_stats2");
    contenedorStats2.innerHTML = "";
    contenedorStats2.innerHTML +=`
        <h3>Upcoming events statistics</h3>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Categories</th>
                        <th>Revenues</th>
                        <th>Percentage of attendance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br>
        <h3>Past Events statistic by category</h3>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Categories</th>
                        <th>Revenues</th>
                        <th>Percentage of attendance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>

                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>`;

}
getApi();