//Variables
const formulario = document.querySelector('#formulario');
const tituloForm = document.querySelector('#titulo-formulario')
const task = document.querySelector(".tareas")
const total = document.querySelector("#total")
const completadas = document.querySelector("#completadas")
let tareas = [];

//eventos
//funcion invocar

function eventos() {
    formulario.addEventListener("submit", validarFormulario);
    task.addEventListener("click", eliminarTarea);
    task.addEventListener("click", tareaCompletada); 
}

eventos();




//funciones
function validarFormulario(e) {
    e.preventDefault();

    // validar datos del input, validamos con if

    const tarea = document.querySelector("#tarea").value;

    if (tarea.length < 1) {
        tituloForm.textContent = 'Formulario Vacio' //sustitución por un alert

        setTimeout(() => {
            tituloForm.textContent = 'Formulario'

        }, 2000)

    } else {

        //crear un objeto, contiene los datos de cada tarea

        const objTarea = {
            id: Date.now(),
            tarea: tarea,
            estado: false
        }

        tareas = [...tareas, objTarea]; //damos persistencia a los datos anteriores y que agregue la nueva tarea
        formulario.reset();
        mostrarHTML();
    }
}

function mostrarHTML() {

    task.innerHTML = ""; //evitamos que se dupliquen las tarea al pintarse
    if (tareas.length < 1) {
        const mensaje = document.createElement("h5");
        mensaje.textContent = "- Sin Tareas -"
        return
    }

    tareas.forEach((item) => { //item hace referencia a cada objeto del arreglo

        //linea 68 agregaremos una xondición por medio de un operador ternario, viene de tarea completada
        const itemTarea = document.createElement("div");
        itemTarea.classList.add("item-tarea");
        itemTarea.innerHTML = `
          ${item.estado ? (
                `<p class="completa" >${item.tarea}</p>`
            ) : (
                `<p>${item.tarea}</p>`
                

            )}
          <div class="botones">
              <button data-id="${item.id}"  class="eliminar">X</button>
              <button data-id="${item.id}" class="completada">↑</button>
          </div>
          
          `;
        task.appendChild(itemTarea);
     
    })

    //mostrar el total y completadas
    const totalTareas = tareas.length;
    total.textContent = `Total Tareas : ${totalTareas}`;

    const totalCompletadas = tareas.filter(item => item.estado === true).length;
    completadas.textContent = `Completadas: ${totalCompletadas}`;


}




//función eliminar tarea

function eliminarTarea(e) {
    if (e.target.classList.contains("eliminar")) {
        const tareaId = Number(e.target.getAttribute("data-id")); //estraer el id para poder eliminarlo, hay que envolver el evento en Number

        const newTask = tareas.filter((item) => item.id !== tareaId);
        tareas = newTask;
        console.log(newTask)
        mostrarHTML();

    }
}

function tareaCompletada(e) {

    if (e.target.classList.contains("completada")) {
        const tareaId = Number(e.target.getAttribute("data-id")); //estraer el id para poder eliminarlo, hay que envolver el evento en Number

        const nuevaTarea = tareas.map((item) => {
            if( item.id === tareaId){
                item.estado = !item.estado;
                return item
            } else{
                return item;
            }



        })
            tareas = nuevaTarea;
            console.log(nuevaTarea)
            mostrarHTML();
    }



}

