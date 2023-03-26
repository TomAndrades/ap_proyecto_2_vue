async function crearTABLA() {
  try {
    const respuesta = await fetch(
      "https://mindhub-xj03.onrender.com/api/amazing"
    );
    const data = await respuesta.json();
    const eventos = await data.events;
    setPercent(await eventos);

    console.log(eventos);

    let pastEvents = Array.from(eventos).filter((evento) =>
      Object.hasOwn(evento, "assistance")
    );
    
    let upcomingEvents = Array.from(eventos).filter((evento) =>
      Object.hasOwn(evento, "estimate")
    );

    let sortHighestAttendance = pastEvents.sort((a, b) => {
      if (a.percent < b.percent) {
        return 1;
      }
      if (a.percent > b.percent) {
        return -1;
      } else {
        return 0;
      }
    });

    let highestAttendance = sortHighestAttendance[0];
    let lowestAttendance =
      sortHighestAttendance[sortHighestAttendance.length - 1];
    let mostCapacity = pastEvents.reduce(
      (acc, act) => {
        if (act.capacity > acc.capacity) {
          return act;
        } else {
          return acc;
        }
      },
      { capacity: 0 }
    );
    
    //Tabla 1
    let eventStadistics = {
      titulo: "Event Stadistics",
      subtitulo: [
        "Event with the highest percentage of attendance",
        "Event with the lowest percentage of attendance",
        "Event with larger capacity",
      ],
      data: [
        `${highestAttendance.name} ${highestAttendance.percent.toFixed(2)}%`,
        `${lowestAttendance.name} ${lowestAttendance.percent.toFixed(2)}%`,
        `${mostCapacity.name} ${mostCapacity.capacity}`,
      ],
    };
    createStadisticsTable(eventStadistics)

    //Tabla 2
    let upcomingStadistics = {
      titulo: "Upcoming events stadistics by Category",
      subtitulo: ["Category", "Revenues", "% of attendance"],
      data: getCategoryStats(upcomingEvents, false),
    };
    createCategoryStatsTable(upcomingStadistics)
    //Tabla 3
    let pastStadistics = {
      titulo: "Past events stadistics by Category",
      subtitulo: ["Category", "Revenues", "% of attendance"],
      data: getCategoryStats(pastEvents, true),
    };
    createCategoryStatsTable(pastStadistics)  
  } catch (error) {
    console.log(error);
  }
}
function getCategorys(events) {
  // Toma un array de eventos y devuelve un array de categorias unicas
  let categorys = [];

  for (let event of events) {
    if (categorys.indexOf(event.category) == -1) {
      categorys.push(event.category);
    }
  }
  return categorys;
}

function getCategoryStats(events,past) {
  let eventStats = []
  getCategorys(events).forEach((category) => {
    let acumulador = 0;
    let revenue = events.reduce((acc, act) => {
      if (category == act.category) {
        if(past){
          return acc + act.price * act.assistance;
        }
        return acc + act.price * act.estimate;
      } else {
        return acc;
      }
    }, 0);
    let percent =
      events.reduce((acc, act) => {
        if (category == act.category) {
          acumulador++;
          return acc + act.percent;
        } else {
          return acc;
        }
      }, 0) / acumulador;
    eventStats.push({
      name: category,
      revenue: revenue,
      percent: percent,
    });
  });
  return eventStats
}


function htmlAdder(elementId, elementToInsert) {
  //Toma un padre del documento por el ID y un string a insertar y lo inserta en el html
  let element = document.getElementById(elementId);
  element.innerHTML += elementToInsert;
}

function createHeader(eventStadistics) {
  let template = `<table class="border bg-light">
                    <thead>
                    <tr class="border text-bg-dark text-center">
                        <th class="border" colspan="3">
                            <h3>${eventStadistics.titulo}</h3>
                        </th>
                    </tr>
                    </thead>
                    <tbody>`;
  template += crearLinea(eventStadistics.subtitulo, true);
  return template;
}
function createStadisticsTable(eventStadistics) {
  let template = createHeader(eventStadistics) + crearLinea(eventStadistics.data) + "</tbody></table>"
  htmlAdder("tabla", template);
}

function createCategoryStatsTable(categoryStats){
let template = createHeader(categoryStats)
    categoryStats.data.forEach((i) => {
      template += crearLinea([i.name,i.revenue,`${i.percent.toFixed(1)} %`])
    })
    template += "</table>"
    htmlAdder("tabla",template)
  }

function crearLinea(data, bold = false) {
  let template = `<tr class="border">`;
  data.forEach((element) => {
    if(bold){
      template += `<td class="border fw-bold">
    ${element}
  </td>`;
    } else {
    template += `<td class="border">
    ${element}
  </td>`;
    }
  });
  template += `</tr>`;
  return template;
}

function setPercent(eventos) {
  eventos.forEach((evento) => {
    let percent = 0;
    if (Object.hasOwn(evento, "assistance")) {
      percent = (evento.assistance / evento.capacity) * 100;
    } else {
      percent = (evento.estimate / evento.capacity) * 100;
    }
    Object.defineProperty(evento, "percent", {
      value: percent,
    });
  });
}

crearTABLA();