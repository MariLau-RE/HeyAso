import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const asociaciones = collection(db, 'Asociacion');

async function modificarAsociacion() {
  var nombre = getInputVal("nombre");
  var descripcion = getInputVal("descripcion");
  var codCarrera = getInputVal("codCarrera");
  var contacto = getInputVal("contacto");
 

  if(nombre == '' || codCarrera == '' || descripcion == ''  || contacto == ''){
    alert("Debe completar todos los campos");
  }else{
    try {
      await setDoc(doc(asociaciones, nombre), {
        nombre: nombre,
        codCarrera: codCarrera,
        contacto: contacto,
        descripcion: descripcion,
      });
      console.log("Asocia registrada con ID: ", nombre);
      alert("Asociación modificada con éxito");
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}

// Asigna registroEstudiante al objeto window
window.modificarAsociacion = modificarAsociacion;