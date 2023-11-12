import { collection, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const eventos = collection(db, 'Evento');
const listaEvento = await getDocs(eventos);
var select = document.getElementById("selectEvento");

listaEvento.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().idEvento;
    option.text = doc.data().titulo;

    // Agregas la opción al select
    select.appendChild(option);
});


function eliminarEvento() {
    var valorSeleccionado = select.value;

    listaEvento.docs.forEach(async doc => {
        if(doc.data().idEvento = valorSeleccionado){
            try {
                await deleteDoc(doc(eventos, valorSeleccionado));
                alert("Evento eliminado con éxito.")
            } catch (e) {
                console.error("Error al eliminar el documento: ", e);
            }
        }
    });
}

// Asigna eliminarEvento al objeto window
window.eliminarEvento = eliminarEvento;