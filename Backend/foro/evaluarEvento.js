import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const eventos = collection(db, 'Evento');
const evaluaciones = collection(db, 'Evaluacion');
const inscripciones = collection(db, 'Inscripcion');
const listaUsuario = await getDocs(usuarios);
const listaEvento = await getDocs(eventos);
const listaInscripcion = await getDocs(inscripciones);

var select = document.getElementById("selectEvento");
var selectCalif = document.getElementById("selectCalificacion");

listaEvento.docs.forEach(doc => {
    listaInscripcion.forEach(docIns =>{
        if(doc.data().idEvento == docIns.data().idEvento){
            listaUsuario.forEach(docUs =>{
                if(docIns.data().contactoUsuario == docUs.data().correo){
                      // Creas un nuevo elemento option
                      var option = document.createElement("option");

                      // Le asignas un valor y un texto
                      option.value = doc.data().idEvento;
                      option.text = doc.data().titulo;

                      // Agregas la opción al select
                      select.appendChild(option);
                }
            });
        }
    });
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
