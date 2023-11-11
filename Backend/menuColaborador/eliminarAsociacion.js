import { collection, deleteDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const asociaciones = collection(db, 'Asociacion');

const snapshot = await getDocs(asociaciones);

async function eliminarAsociacion(nombre) {
    snapshot.docs.forEach(async doc => {
        if(doc.data().nombre == nombre){
            try {
                await deleteDoc(doc(asociaciones, nombre));
                console.log("Usuario eliminado con ID: ", nombre);
                alert("Asociación eliminada con éxito.")
            } catch (e) {
                console.error("Error al eliminar el documento: ", e);
            }
        }
      });
}

// Asigna eliminarAsociacion al objeto window
window.eliminarAsociacion = eliminarAsociacion;