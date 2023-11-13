import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const asociaciones = collection(db, 'Asociacion');
const listaAsociacion = await getDocs(asociaciones);
var select = document.getElementById("asociacion");

select.addEventListener('change', function() {
  var asoSelect = this.value;
  console.log(asoSelect);

  listaAsociacion.docs.forEach(docAs => {
    if(docAs.data().idAsociacion == asoSelect){
      document.getElementById("nombre").value = docAs.data().nombre;
      document.getElementById("codigo").value = docAs.data().codCarrera;
      document.getElementById("contacto").value = docAs.data().contacto;
      document.getElementById("descripcion").value = docAs.data().descripcion;
    }else{
      document.getElementById("nombre").value = '';
      document.getElementById("codigo").value = '';
      document.getElementById("contacto").value = '';
      document.getElementById("descripcion").value = '';
    }
  });
});

listaAsociacion.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().idAsociacion;
    option.text = doc.data().nombre + " - " + doc.data().idAsociacion;

    // Agregas la opción al select
    select.appendChild(option);
});

async function modificarAsociacion() {
  var nombre = getInputVal("nombre");
  var codCarrera = getInputVal("codigo");
  var contacto = getInputVal("contacto");
  var descripcion = getInputVal("descripcion");
  var id = select.value;
 

  if(nombre == '' || codCarrera == '' || descripcion == ''  || contacto == ''){
    alert("Debe completar todos los campos");
  }else{
    try {
      const docRef = doc(asociaciones, id); // Obtiene la referencia al documento
      await updateDoc(docRef, { 
        nombre: nombre,
        codCarrera: codCarrera,
        contacto: contacto,
        descripcion: descripcion
       });
       console.log("Asocia registrada con ID: ", id);
       alert("Asociación modificada con éxito");
    } catch (e) {
      console.error("Error al actualizar el documento: ", e);
    }
  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}

// Asigna registroEstudiante al objeto window
window.modificarAsociacion = modificarAsociacion;