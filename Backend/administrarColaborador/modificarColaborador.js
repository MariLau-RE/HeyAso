import { collection, updateDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const asociaciones = collection(db, 'Asociacion');
const listaUsuario = await getDocs(usuarios);
const listaAsociacion = await getDocs(asociaciones);

var select = document.getElementById("colaboradores");
var puestoSelect = document.getElementById("puesto");
var asoSelect = document.getElementById("asociacion");

select.addEventListener('change', function() {
    var usuSelect = this.value;
    console.log(usuSelect);
  
    if(usuSelect == '0'){
      document.getElementById("nombre").value = '';
      document.getElementById("carrera").value = '';
      document.getElementById("puesto").value = '0';
      document.getElementById("asociacion").value = '0';
      document.getElementById("correo").value = '';
      document.getElementById("contacto").value = '';
    }else{
      listaUsuario.docs.forEach(docUs => {
        if(docUs.data().carnet == usuSelect){
            document.getElementById("nombre").value = docUs.data().nombre;
            document.getElementById("carrera").value = docUs.data().carrera;
            puestoSelect.value = docUs.data().puesto;
            asoSelect.value = docUs.data().idAsociacion;
            document.getElementById("correo").value = docUs.data().correo;
            document.getElementById("contacto").value = docUs.data().contacto;
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

listaUsuario.docs.forEach(doc => {
    if(doc.data().idTipo == "Admin"){
        // Creas un nuevo elemento option
        var option = document.createElement("option");

        // Le asignas un valor y un texto
        option.value = doc.data().carnet;
        option.text = doc.data().nombre;

        // Agregas la opción al select
        select.appendChild(option);
    }
});

async function modificarColab(){
    var colaborador = select.value;
    var puesto = puestoSelect.value;
    var asocia = asoSelect.value;

    try {
        const docRef = doc(usuarios, colaborador); // Obtiene la referencia al documento
        await updateDoc(docRef, { 
          puesto: puesto,
          idAsociacion: asocia
         });
         console.log("Colaborador actualizado con ID: ", colaborador);
         alert("Colaborador actualizado con éxito");
         window.location.href="../AdministrarColaborador.html";
      } catch (e) {
        console.error("Error al actualizar el documento: ", e);
      }
}

window.modificarColab = modificarColab;