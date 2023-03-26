async function getConditionalEvents(time = 0) {
  //Toma una lista de data desde una api y retorna los eventos de un conjunto de datos,
  try{
    const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')    
    const data = await respuesta.json()
    const eventos = await data.events
    const currentDate = await data.currentDate
    // console.log(eventos)
    // console.log(currentDate)
    switch (time){
      case -1:
        eventosFiltrados = Array.from(eventos).filter((event) => event.date < currentDate)
      break;
      case 0:
        eventosFiltrados = eventos;
      break;
      case 1:
        eventosFiltrados = Array.from(eventos).filter((event) => event.date > currentDate)
      break;
    }
    return eventosFiltrados
  }
  catch(error){
    console.log(error)
    // alert('An error has ocurred obtaining the cards')
  }
}


function getCategorys(events) {
  // Toma un array de eventos y devuelve un array de categorias unicas
  let categorys = []

  for (let event of events) {
    if (categorys.indexOf(event.category) == -1) {
      categorys.push(event.category);
    }
  }
  return categorys
}

function searchByName(eventos, value) {
  let eventosFiltrados = eventos.filter((elemento) => (elemento.name.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}

function searchByCategory(eventos, value) {
  let eventosFiltrados = eventos.filter((elemento) => (elemento.category.toLowerCase()).match(value.toLowerCase()))
  return eventosFiltrados
}

async function makeSearch() {
  let value = search.value;
  let eventosFiltrados = []
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let checked = Array.from(checkboxes).filter((checkbox) => checkbox.checked)
  let checkedValues = checked.map(element => element.value.toLowerCase())
  let checkedSome = checked.some((element) => element.checked)
  // console.log(value)
  showingElements = await events;

  if (checkedSome) {
    checkedValues.forEach(element => {
    eventosFiltrados.push(searchByCategory(showingElements, element));
    eventosFiltrados = eventosFiltrados.flat();

    });
    if (value != 0) {
      showingElements = searchByName(eventosFiltrados,value)
    } else {
      showingElements = eventosFiltrados
    }
} else {
  eventosFiltrados = events
  if (value != 0) {
    showingElements = searchByName(showingElements,value)
  }
}
if (showingElements.length == 0){
  cardInserter(eventosFiltrados)
  alert(`We cannot find anything, please try another word or category`)
} else {
  cardInserter(showingElements)
}
}

searchBtn.addEventListener('click', (evento) => {
  makeSearch()
  evento.preventDefault();
}
);
checkboxGroup.addEventListener('change', () => {
  makeSearch()
});