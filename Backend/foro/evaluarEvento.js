import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const eventos = collection(db, 'Evento');
const evaluaciones = collection(db, 'Evaluacion');
const inscripciones = collection(db, 'Inscripcion');
const listaUsuario = await getDocs(usuarios);
const listaEvento = await getDocs(eventos);
const listaInscripcion = await getDocs(inscripciones);
const listaEvaluaciones = await getDocs(evaluaciones);

var carnet = localStorage.getItem('carnet');
var correoInscrip;

var select = document.getElementById("selectEvento");
var selectCalif = document.getElementById("selectCalificacion");

listaUsuario.forEach(docUs =>{
  if(docUs.data().carnet == carnet){
      correoInscrip = docUs.data().correo;
  }
});

// Obtén los eventos en los que el usuario está inscrito
var eventosInscritos = listaInscripcion.docs.filter(doc => doc.data().contactoUsuario == correoInscrip).map(doc => doc.data().idEvento);

// Obtén las evaluaciones que el usuario ha realizado
var eventosEvaluados = listaEvaluaciones.docs.filter(doc => doc.data().carnet == carnet).map(doc => doc.data().idEvento);

// Encuentra los eventos en los que el usuario está inscrito pero que aún no ha evaluado
var eventosPendientes = eventosInscritos.filter(idEvento => !eventosEvaluados.includes(idEvento));
console.log(eventosPendientes);


listaEvento.docs.filter(doc => {
  var fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0);
  var fecha = doc.data().fecha;
  var partes = fecha.split("/");
  var fechaEvento = new Date(partes[2], partes[1]-1, partes[0]);
  return fechaHoy >= fechaEvento;
}).forEach(doc => {
  if(eventosPendientes.includes(doc.data().idEvento)){
    if(doc.data().encuesta == true){
      // Creas un nuevo elemento option
      var option = document.createElement("option");
  
      // Le asignas un valor y un texto
      option.value = doc.data().idEvento;
      option.text = doc.data().titulo;
                                    
      // Agregas la opción al select
      select.appendChild(option);
    }
  }
});

async function evaluarEvento() {
    var comentario = getInputVal("comentario");
    var calificacion = selectCalif.value;
    var evento = select.value;
    var carnet = localStorage.getItem('carnet');
   
    if(comentario == '' || calificacion == '0'){
      alert("Debe completar todos los campos");
    }else{
      if(evento == '0'){
        alert("Debe seleccionar un evento");
      }else{
        try {
          const docRef = await addDoc(evaluaciones, {
            idEvento: evento,
            comentario: comentario,
            calificacion: calificacion,
            carnet: carnet
          });
          console.log("Evaluacion creada con ID: ", docRef.id);
          alert("Su evaluación ha sido enviada con éxito");
          window.location.href = "../PantallaForo.html";
        } catch (e) {
          console.error("Error al agregar el documento: ", e);
        }
      }
    }
  
    // Function to get form values
    function getInputVal(id) {
      return document.getElementById(id).value;
    }
}

window.evaluarEvento = evaluarEvento;
