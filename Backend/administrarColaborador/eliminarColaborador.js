import { collection, setDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'usuario');
const snapshot = await getDocs(usuarios);



async function eliminarColaborador() {
  var carnet = getInputVal("carnet");
  var nombre, carrera, correo, contrasenna, contacto, descripcion, idAsociacion, puesto;

  snapshot.docs.forEach(doc => {
    if(doc.data().carnet == carnet){
        nombre = doc.data().nombre;
        carrera = doc.data().carrera;
        correo = doc.data().correo;
        contrasenna = doc.data().contraseña;
        contacto = doc.data().contacto;
        descripcion = doc.data().descripcion;
        idAsociacion = doc.data().idAsociacion;
        puesto = doc.data().puesto;
    }
  });


  if(carnet == ''){
    alert("Debe completar el campo solicitado");
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
        idAsociacion: idAsociacion,
        puesto: puesto
      });
      console.log("Colaborador eliminado con ID: ", carnet);
      alert("Colaborador eliminado con éxito");
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}

// Asigna eliminarColaborador al objeto window
window.eliminarColaborador = eliminarColaborador;