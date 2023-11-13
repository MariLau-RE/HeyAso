import { collection, deleteDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const asociaciones = collection(db, 'Asociacion');
const usuarios = collection(db, 'Usuarios');
const eventos = collection(db, 'Evento');
const listaAsociacion = await getDocs(asociaciones);
const listaUsuario = await getDocs(usuarios);
const listaEvento = await getDocs(eventos);
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

async function eliminarAsociacion() {
    var id = select.value;

    listaUsuario.docs.forEach(async docUs => {
        if(docUs.data().idAsociacion == id){
            try {
                const docRef = doc(usuarios, docUs.id); // Obtiene la referencia al documento
                await updateDoc(docRef, { 
                    idAsociacion: "",
                    idTipo: "Estudiante",
                    puesto: ""
                 });
                 console.log("Colaborador actualizado");
            } catch (e) {
                console.error("Error al actualizar el documento: ", e);
            }
        }
    });

    listaEvento.docs.forEach(async docEv => {
        if(docEv.data().idAsociacion == id){
            try {
                await deleteDoc(doc(eventos, docEv.id));
                console.log("Evento eliminado con ID: ", docEv.id);
            } catch (e) {
                console.error("Error al eliminar el documento: ", e);
            }
        }
    });

    try {
        await deleteDoc(doc(asociaciones, id));
        console.log("Asociacion eliminada con ID: ", id);
        alert("Asociación eliminada con éxito.");
        localStorage.removeItem('carnet');  
        window.location.href="../PaginaPrincipal.html";
    } catch (e) {
        console.error("Error al eliminar el documento: ", e);
    }
}

// Asigna eliminarAsociacion al objeto window
window.eliminarAsociacion = eliminarAsociacion;