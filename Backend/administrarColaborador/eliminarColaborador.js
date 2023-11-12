import { collection, setDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const listaUsuario = await getDocs(usuarios);

var select = document.getElementById("selectEvento");

listaUsuario.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().carnet;
    option.text = doc.data().nombre;

    // Agregas la opción al select
    select.appendChild(option);
});

/*FALTA CONECTAR AL FRONT */

async function eliminarColaborador() {
  var carnet = select.value;
  var nombre, carrera, correo, contrasenna, contacto, descripcion, idAsociacion, puesto;

  if(carnet == '0'){
    alert("Debe seleccionar un estudiante.");
  }else{
    
    listaUsuario.docs.forEach(doc => {
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
}

// Asigna eliminarColaborador al objeto window
window.eliminarColaborador = eliminarColaborador;