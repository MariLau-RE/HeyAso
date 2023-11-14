import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const propuestas = collection(db, 'Propuestas');
var select = document.getElementById("selectCategoria");

async function propuesta() {
  var titulo = getInputVal("titulo");
  var descripcion = getInputVal("descripcion");
  var objetivos = getInputVal("objetivos");
  var actividades = getInputVal("actividades");
  var valorSeleccionado = select.value;
 
  if(titulo == '' || objetivos == '' || actividades == '' || descripcion == ''){
    alert("Debe completar todos los campos");
  }else{
    if(valorSeleccionado == '0'){
      alert("Debe seleccionar una categoría");
    }else{
      try {
        const docRef = await addDoc(propuestas, {
          titulo: titulo,
          descripcion: descripcion,
          categoria: valorSeleccionado,
          objetivos: objetivos,
          actividades: actividades,
          estado: "SinCalificar"
        });
        console.log("Propuesta creada con ID: ", docRef.id);
        alert("Propuesta enviada con éxito");
        window.location.href = "PantallaForo.html";
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

window.propuesta = propuesta;
