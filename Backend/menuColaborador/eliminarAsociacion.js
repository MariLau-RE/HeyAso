import { collection, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const asociaciones = collection(db, 'Asociacion');
const listaAsociacion = await getDocs(asociaciones);

var select = document.getElementById("selectEvento");

listaAsociacion.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().idEvento;
    option.text = doc.data().titulo;

    // Agregas la opción al select
    select.appendChild(option);
});


/*FALTA CONECTAR CON FRONT */
async function eliminarAsociacion() {
    listaAsociacion.docs.forEach(async doc => {
        var id = select.value;
        if(doc.data().idAsociacion == id){
            try {
                await deleteDoc(doc(asociaciones, id));
                console.log("Asociacion eliminada con ID: ", id);
                alert("Asociación eliminada con éxito.")
            } catch (e) {
                console.error("Error al eliminar el documento: ", e);
            }
        }
      });
}

// Asigna eliminarAsociacion al objeto window
window.eliminarAsociacion = eliminarAsociacion;