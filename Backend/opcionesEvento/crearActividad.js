import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const duracion = collection(db, 'Actividad');

async function crearActividad() {
    var titulo = getInputVal("titulo");
    var descripcion = getInputVal("descripcion");
    var idEvento = getInputVal("idEvento");
    var recursos = getInputVal("recursos");
    var duracion = getInputVal("duracion");
    var encargado= getInputVal("encargado");
    var lugar = getInputVal("lugar");


    if(titulo == '' || recursos == '' || duracion == '' || idEvento == '' || descripcion == '' || lugar == '' || encargado == ''){
      alert("Debe completar todos los campos(no opcionales)");
    }else{
      try {
        const docRef = await addDoc(duracion, {
          idEvento: idEvento,
          titulo: titulo,
          descripcion: descripcion,
          idEvento: idEvento,
          recursos: recursos,
          duracion: duracion,
          encargado: encargado,
          lugar: lugar
        });
        console.log("Actividad creada con ID: ", docRef.id);
        alert("Actividad creada con éxito");
      } catch (e) {
        console.error("Error al agregar el documento: ", e);
      }
    }
  
    // Function to get form values
    function getInputVal(id) {
      return document.getElementById(id).value;
    }
  }

// Asigna crearencargadoal objeto window
window.crearencargado= crearActividad;