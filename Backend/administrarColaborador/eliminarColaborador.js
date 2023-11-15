import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const asociaciones = collection(db, 'Asociacion');
const listaUsuario = await getDocs(usuarios);
const listaAsociacion = await getDocs(asociaciones);

var usuSelect = document.getElementById("colaborador");
var asoSelect = document.getElementById("asociacion");

asoSelect.addEventListener('change', function() {
  var asoSelect = this.value;
  console.log(asoSelect);

  // Elimina todas las opciones existentes, excepto la primera
  while (usuSelect.options.length > 1) {
    usuSelect.remove(1);
  }

  if(asoSelect == '0'){
    usuSelect.value = '0';
  }else{
    listaUsuario.docs.forEach(docUs => {
      if(docUs.data().idTipo == "Admin" && docUs.data().idAsociacion == asoSelect){
          // Creas un nuevo elemento option
          var option = document.createElement("option");

          // Le asignas un valor y un texto
          option.value = docUs.data().carnet;
          option.text = docUs.data().nombre;
        
          // Agregas la opción al select
          usuSelect.appendChild(option);
      }
    });
  }

});


listaAsociacion.docs.forEach(doc => {
  // Creas un nuevo elemento option
  var option = document.createElement("option");

  // Le asignas un valor y un texto
  option.value = doc.data().idAsociacion;
  option.text = doc.data().nombre + " - " + doc.data().idAsociacion;

  // Agregas la opción al select
  asoSelect.appendChild(option);
});


async function eliminarColaborador() {
  var carnet = usuSelect.value;
  var asocia = asoSelect.value;

  if(asocia == '0' || carnet == '0'){
    alert("Debe seleccionar una asociación y un colaborador.");
  }else{
    try {
      const docRef = doc(usuarios, carnet); // Obtiene la referencia al documento
      await updateDoc(docRef, { 
          idAsociacion: "",
          idTipo: "Estudiante",
          puesto: ""
       });
       console.log("Colaborador eliminado/actualizado");
       alert("Colaborador eliminado con éxito");
       window.location.href="index.html";
    } catch (e) {
      console.error("Error al actualizar el documento: ", e);
    }
  }
}

// Asigna eliminarColaborador al objeto window
window.eliminarColaborador = eliminarColaborador;