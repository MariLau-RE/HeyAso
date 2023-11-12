import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const propuestas = collection(db, 'Propuestas');

/*FALTA CONECTAR CON EL FRONT */
async function propuestaEvento() {
  var titulo = getInputVal("titulo");
  var descripcion = getInputVal("descripcion");
  var categoria = getInputVal("categoria");
  var objetivos = getInputVal("objetivos");
  var actividades = getInputVal("actividades");
 
  var estado = getInputVal("estado"); //revisar porque es un checkbox en el html

  if(titulo == '' || objetivos == '' || actividades == '' || categoria == '' || descripcion == ''){
    alert("Debe completar todos los campos(no opcionales)");
  }else{
    try {
      const docRef = await addDoc(propuestas, {
        idEvento: idEvento,
        titulo: titulo,
        descripcion: descripcion,
        categoria: categoria,
        objetivos: objetivos,
        actividades: actividades,
        estado: null
      });
      console.log("Propuesta creada con ID: ", docRef.id);
      alert("Propuesta enviada con éxito");
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}

// Asigna propuestaEvento al objeto window
window.propuestaEvento = propuestaEvento;