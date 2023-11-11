import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const asociaciones = collection(db, 'Asociacion');

async function registroAsociacion() {
  var nombre = getInputVal("name");
  var descripcion = getInputVal("descripcion");
  var codCarrera = getInputVal("idcarrera");
  var identificador = getInputVal("idAso");
  var contacto = getInputVal("telefono");
 

  if(nombre == '' || codCarrera == '' || descripcion == ''  || contacto == '' || identificador == ''){
    alert("Debe completar todos los campos");
  }else{
    try {
      await setDoc(doc(asociaciones, identificador), {
        idAsociacion: identificador,
        nombre: nombre,
        codCarrera: codCarrera,
        contacto: contacto,
        descripcion: descripcion,
      });
      console.log("Asocia registrada con ID: ", identificador);
      alert("Asociación creada con éxito");
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
window.registroAsociacion = registroAsociacion;