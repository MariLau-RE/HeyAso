import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'usuario');

async function modificarEstudiante() {
  var nombre = getInputVal("nombre");
  var carrera = getInputVal("carrera");
  var carnet = getInputVal("carnet");
  var correo = getInputVal("email");
  var contrasenna = getInputVal("contrasenna");
  var contacto = getInputVal("contacto");
  var descripcion = getInputVal("descripcion");

  if(nombre == '' || carrera == '' || carnet == '' || correo == '' || contrasenna == '' || contacto == ''){
    alert("Debe completar todos los campos(no opcionales)");
  }else{
    try {
      await setDoc(doc(usuarios, carnet), {
        nombre: nombre,
        carrera: carrera,
        carnet: carnet,
        correo: correo,
        contraseña: contrasenna,
        contacto: contacto,
        descripcion: descripcion,
        idTipo: "Estudiante",
        idAsociacion: "",
        puesto: ""
      });
      console.log("Usuario modificado con ID: ", carnet);
      alert("Cuenta modificada con éxito");
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
window.modificarEstudiante = modificarEstudiante;