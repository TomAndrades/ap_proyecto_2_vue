/* let persona = {
    nombre: 'Eduardo',
    apellido: 'Mendoza',
    saludar(){
        return 'Hola, me llamo ' + this.nombre + ' ' + this.apellido
    },
    caracteristicas:{

    }
}

const { nombre, apellido: pepito } = persona

console.log(nombre)

console.log(pepito) */

const { createApp } = Vue

const app = createApp({
    data(){
        return {
            mensaje: 'Hola desde VUE!',
            nombre: 'Eduardo',
            edad: 33,
            contador: 0,
            texto: '',
            foto: 'gato',
            frutas: ['melon','pera','sandia',null,'tomate',null],
            fruta: '',
        }
    },
    created(){
        console.log('app creada');
        console.log(this.mensaje);
        let h1 = document.querySelector('h1')
        console.log(h1);
    },
    mounted(){
        console.log('app montada');
        console.log(this.mensaje);
        let h1 = document.querySelector('h1')
        console.log(h1);
    },
    methods:{
        contar(){
            this.contador++
        },
        agregarElemento(){
            this.frutas.push(this.fruta)
            this.fruta = ''
        }
    },
    computed:{
        miEdadyMiNombre(){
            return `Hola, me llamo ${this.nombre} y tengo ${this.edad} años.`
        }
    }
}).mount('#app')

