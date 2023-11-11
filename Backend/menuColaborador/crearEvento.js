import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Evento');

async function crearEvento() {
  var titulo = getInputVal("titulo");
  var descripcion = getInputVal("descripcion");
  var lugar = getInputVal("lugar");
  var duracion = getInputVal("duracion");
  var fecha = getInputVal("fecha");
  var categoria = getInputVal("categoria");
  var requisitos = getInputVal("requisitos");
  var capacidad = getInputVal("capacidad");
  //encuesta falta
  

  if(titulo == '' || lugar == '' || duracion == '' || fecha == '' || categoria == '' || descripcion == ''){
    alert("Debe completar todos los campos(no opcionales)");
  }else{
    try {
      const docRef = await addDoc(usuarios, {
        titulo: titulo,
        descripcion: descripcion,
        lugar: lugar,
        duracion: duracion,
        fecha: fecha,
        categoria: categoria,
        requisitos: requisitos,
        capacidad: capacidad
      });
      console.log("Evento creado con ID: ", docRef.id);
      alert("Evento creado con éxito");
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}

// Asigna crearEvento al objeto window
window.crearEvento = crearEvento;
