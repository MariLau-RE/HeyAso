import { collection, deleteDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const actividades = collection(db, 'Actividad');
const listaActividad = await getDocs(actividades);

var select = document.getElementById("selectEvento");

listaActividad.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().id;
    option.text = doc.data().titulo;

    // Agregas la opción al select
    select.appendChild(option);
});

async function eliminarActividad() {
    var id = select.value; 
    try {
        await deleteDoc(doc(actividades, id));
        alert("Actividad eliminada con éxito.")
    } catch (e) {
        console.error("Error al eliminar el documento: ", e);
    }
}

/*CONECTAR AL FRONT */

window.eliminarActividad = eliminarActividad();