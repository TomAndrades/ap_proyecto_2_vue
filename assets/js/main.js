const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      paginas: ["Home", "Upcoming Events", "Past Events", "Contact", "Stats"],
      index: 0,
      eventos: [],
      backupEventos: [],
      currentDate: "",
      categorias: [],
      categoriasSeleccionadas: [],
      texto: "",
    };
  },
  created() {
    this.getEvents();
  },
  mounted() {

  },
  methods: {
    async getEvents() {
      try {
        const res = await fetch(
          "https://mindhub-xj03.onrender.com/api/amazing"
        );
        const data = await res.json();
        this.eventos = await data.events;
        this.currentDate = await data.currentDate;
        this.backupEventos = this.eventos;
        this.getCategorys(this.eventos)
      } catch (error) {
        this.eventos = "Error! Could not reach the API. " + error;
      }
    },
    getCategorys(array) {
      // Toma un array de eventos y devuelve un array de categorias unicas
      array.forEach(element => {
        if (!this.categorias.includes(element.category)) {
          this.categorias.push(element.category);
        }
      });
    },
    sumar() {
      this.index == 4 ? (this.index = 0) : this.index++;
    },
    restar() {
      this.index == 0 ? (this.index = 4) : this.index--;
    },
    
  },
  computed: {
    paginaSeleccionada() {
      return this.paginas[this.index];
    },
    // filtradoPorTexto() {
    //   this.eventos = this.backupEventos.filter((evento) =>
    //     evento.name.toLowerCase().includes(this.texto.toLowerCase())
    //   );
    // },
    // filtrarPorCategoria() {
    //   if(!this.categoriasSeleccionadas.length){
    //     this.eventos = this.backupEventos
    //   } else {
    //     this.eventos = this.backupEventos.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
    //   }
    // },
    filtroDoble(){
      let primerFiltro = this.eventos = this.backupEventos.filter((evento) =>
        evento.name.toLowerCase().includes(this.texto.toLowerCase())
      );
      if(!this.categoriasSeleccionadas.length){
        this.eventos = primerFiltro
      } else {
        this.eventos = primerFiltro.filter(evento => this.categoriasSeleccionadas.includes(evento.category))
      }
    },
    filterEvents() {
      switch (this.index) {
        case 0:
          this.eventos = this.backupEventos;
          break;
        case 1:
          this.eventos = this.backupEventos.filter(
            (event) => event.date > this.currentDate
          );
          break;
        case 2:
          this.eventos = this.backupEventos.filter(
            (event) => event.date < this.currentDate
          );
          break;
      }
    },
  },
}).mount("#app");
