import { collection, deleteDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const asociaciones = collection(db, 'Asociacion');
const listaAsociacion = await getDocs(asociaciones);

var select = document.getElementById("asociacion");

listaAsociacion.docs.forEach(docAs => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = docAs.data().idAsociacion;
    option.text = docAs.data().nombre + " - " + docAs.data().idAsociacion;

    // Agregas la opción al select
    select.appendChild(option);
});


/*FALTA CONECTAR CON FRONT */
async function eliminarAsociacion() {
    var id = select.value;
    try {
        await deleteDoc(doc(asociaciones, id));
        console.log("Asociacion eliminada con ID: ", id);
        alert("Asociación eliminada con éxito.");
    } catch (e) {
        console.error("Error al eliminar el documento: ", e);
    }
}

// Asigna eliminarAsociacion al objeto window
window.eliminarAsociacion = eliminarAsociacion;