const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      paginas: ["Home", "Upcoming Events", "Past Events", "Contact", "Stats"],
      index: 0,
      eventos: "esperandoAPI",
      showEvents: [],
      currentDate: "esperando API",
      categorias: [],
    };
  },
  created() {
    // whenever question changes, this function will run
    this.getEvents();
  },
  mounted() {},
  methods: {
    async getEvents() {
      this.eventos = "Obteniendo datos";
      try {
        const res = await fetch(
          "https://mindhub-xj03.onrender.com/api/amazing"
        );
        const data = await res.json();
        this.eventos = await data.events;
        this.currentDate = await data.currentDate;
        this.showEvents = await this.eventos
        this.getCategorys()
      } catch (error) {
        this.eventos = "Error! Could not reach the API. " + error;
      }
    },
    getCategorys() {
      // Toma un array de eventos y devuelve un array de categorias unicas
      this.categorias = [];
      for (let evento of this.showEvents) {
        if (this.categorias.indexOf(evento.category) == -1) {
          this.categorias.push(evento.category);
        }
      }
    },
    sumar() {
      this.index == 4 ? (this.index = 0) : this.index++;
    },
    restar() {
      this.index == 0 ? (this.index = 4) : this.index--;
    },
    filterEvents() {
      switch (this.index) {
        case 0:
          this.showEvents = this.eventos;
          this.getCategorys();
          break;
        case 1:
          this.showEvents = Array.from(this.eventos).filter(
            (event) => event.date > this.currentDate
          );
          this.getCategorys();
          break;
        case 2:
          this.showEvents = Array.from(this.eventos).filter(
            (event) => event.date < this.currentDate
          );
          this.getCategorys();
          break;
      }
    },
  },
  computed: {
    paginaSeleccionada() {
      return this.paginas[this.index];
    },
  },
}).mount("#app");
