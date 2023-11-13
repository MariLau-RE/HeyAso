import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const propuestas = collection(db, 'Propuestas');
;const listaPropuesta = await getDocs(propuestas);

var select = document.getElementById("selectEvento");

listaPropuesta.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.id;
    option.text = doc.data().titulo;

    // Agregas la opción al select
    select.appendChild(option);
});

//FALTA MOSTRAR LA INFORMACION

async function procesarPropuesta(){
    var idPropuesta = select.value;

    try {
        const docRef = doc(propuestas, idPropuesta); // Obtiene la referencia al documento
        await updateDoc(docRef,{ estado: capacidad }); // Actualiza solo el campo encuesta
        console.log("Encuesta actualizada con éxito");   
    } catch (e) {
        console.error("Error al actualizar el documento: ", e);
    }

}

window.procesarPropuesta = procesarPropuesta;
