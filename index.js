// Esto es un quiz donde hay que adivinar el ingrediente faltante de una receta //

//// En primer lugar ingreso la clase que va a incluir: Nombre del plato, Pais de origen (por una idea futura para el juego), e ingredientes. 
//// A partir de funciones obtenemos el ingrediente faltante a adivinar y los ingredientes restantes para que sean el dato del Quiz.
//// Tambien sumo la función presentación para jugar

class Receta{
    constructor(nombre, pais, ingredientes){
        this.nombre = nombre;
        this.pais = pais;
        this.ingredientes = ingredientes;
        this.Presentacion = () => {return "Soy originario del país de la bandera y tengo estos ingredientes:"}
        this.puntaje = 0
    }
}


const recetasBase = [
    new Receta('Ceviche', 'Peru', ["Pescado fresco", "Limón/Lima", "Hielo" , "Ajo", "Cebolla morada", "Chiles", "Boniato", "Choclo"]),
    new Receta('Paella', 'España', ["Arroz bomba", "Azafrán", "Caldo", "Ajo", "Cebolla", "Morrón","Tomate","Frutos de mar"]),
    new Receta('Moqueca', 'Brasil', ["Pescado blanco", "Jugo de limón", "Jengibre", "Tomate", "Langostinos", "Ajo", "Cebolla", "Morrón",])
];

const recetas = JSON.parse(localStorage.getItem("recetasBase")) || recetasBase;


// const agregarReceta = ({nombre, pais, ingredientes})=>{
//     //Destuctura un objeto para recibir los datos
//     if(recetas.some(recetas=>recetas.nombre===nombre)){
//             console.warn("Ya existe un producto con ese id") // esto lo podemos ahcer a futuro con lirberias
//     } else {
//         const recetaNueva = new Producto(nombre, pais, ingredientes)
//         recetas.push(recetaNueva)
//         localStorage.setItem('recetas', JSON.stringify(recetas))
//     }
// }
const recetaDiv = document.createElement("div")

// Renderizar productos en el DOM
const renderizarRecetas = (arrayUtilizado)=>{
    const recetasContainer = document.getElementById("contenedorRecetas")
    // borramos para evitar clones viejos
    recetasContainer.innerHTML=""  
    arrayUtilizado.forEach(({nombre, pais, Presentacion, ingredientes}) => {
    const recetaDiv = document.createElement("div")
    recetaDiv.style = "width: 200px;height: 500px; margin:20px"
    recetaDiv.innerHTML = `
        <img src="./${pais}.png" class="card-img-top" alt="${pais}" width="150" height="100" style="margin-bottom: 10px;">  
        <p>${Presentacion()}</p>`
    let listaIngredientes = document.createElement("ul")
        ingredientes.forEach(function (ingrediente) {
             let li = document.createElement("li");
             li.appendChild(document.createTextNode(ingrediente));
             listaIngredientes.appendChild(li);
         });
         recetaDiv.appendChild(listaIngredientes);
    let inputIngrediente = document.createElement("input");
        inputIngrediente.type = "text";
        inputIngrediente.name = `${nombre}`;
        inputIngrediente.id = "Respuesta";
        inputIngrediente.placeholder = "Respuesta";
 recetaDiv.appendChild(inputIngrediente);
  recetasContainer.appendChild(recetaDiv)
  });
}

localStorage.setItem('recetas', JSON.stringify(recetas))


///// Acá comienzon con la parte del puntaje. Es acá donde empiezo a tener problemas

/// Me traigo el nodo de formulario y seteo el puntaje inicial en 0

let formularioRespuesta = document.getElementById("formulario");

// Event Listener para obtener el array de respuestas
// Agrego un eventListener al formulario para capturar el evento submit
formularioRespuesta.addEventListener("submit", function (event) {
    // Evito que el formulario se envíe (para que no se recargue la página)
    event.preventDefault();
    // Obtengo todos los inputs dentro del formulario
    const informacion = new FormData(event.target)
    const respuestasUsuario = Object.fromEntries(informacion);
    console.log(respuestasUsuario)


    // Comparo las respuestas del usuario con los ingredientes faltantes reales
    const puntajeReceta = recetasBase.map(receta => {
        const respuestaUsuario = respuestasUsuario[receta.nombre] || "";

        return {
            Plato: receta.nombre,
            RespuestaUsuario: respuestaUsuario,
            Correcto: respuestaUsuario.toLowerCase() === receta.nombre.toLowerCase()
        };
    });

      // Calcular el puntaje total
    const puntajeTotalActual = puntajeReceta.filter(item => item.Correcto).length;

      // Mostrar SweetAlert con el puntaje total
      Swal.fire({
          icon: 'success',
          title: '¡Puntaje total!',
          text: `Tu puntaje total es: ${puntajeTotalActual}`
      });
  });



// Testing
const app = ()=>{
    renderizarRecetas(recetas)
}

//ejecuto mi aplicacion
app()
