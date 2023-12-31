import { collection, deleteDoc, getDocs} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const eventos = collection(db, 'Evento');
const actividades = collection(db, 'Actividades');
const inscripciones = collection(db, 'Inscripcion');
const listaEvento = await getDocs(eventos);
const listaActividad = await getDocs(actividades);
const listaInscripcion = await getDocs(inscripciones);
var selectEvento = document.getElementById("selectEvento");


listaEvento.docs.filter(doc => {
    var fechaEvento = new Date(formatearFecha(doc.data().fecha));
    var fechaHoy = new Date();
    
    fechaHoy.setHours(0, 0, 0, 0);
    fechaEvento.setHours(0, 0, 0, 0);
    return fechaHoy <= fechaEvento; //retorna eventos que no hayan pasado

}).forEach(doc => {
    var option = document.createElement("option");
    option.value = doc.data().idEvento;
    option.text = doc.data().idEvento + " - " + doc.data().titulo;
    selectEvento.appendChild(option);
});

function formatearFecha(fecha){
    var partes = fecha.split("/");
    var fechaFormateada = partes[2] + "-" + partes[1] + "-" + partes[0];
    return fechaFormateada;
}

async function eliminarEvento() {
    var valorSeleccionado = selectEvento.value;
    //falta agregar la eliminacion de las actividades

    if (valorSeleccionado != "0") {
        
        listaInscripcion.docs.forEach(async docIns => {
            if(docIns.data().idEvento == valorSeleccionado){
                try {
                    await deleteDoc(docIns.ref);
                    console.log("Inscripción del evento eliminada");
                } catch (e) {
                    console.error("Error al eliminar el documento: ", e);
                }
            }
        });

        listaActividad.docs.forEach(async docAc => {
            if(docAc.data().idEvento == valorSeleccionado){
                try {
                    await deleteDoc(docAc.ref);
                    console.log("Actividad del evento eliminada");
                } catch (e) {
                    console.error("Error al eliminar el documento: ", e);
                }
            }
        });

        listaEvento.docs.forEach(async doc => {
            if(doc.data().idEvento == valorSeleccionado){
                try {
                    await deleteDoc(doc.ref);
                    alert("Evento eliminado con éxito.")
                    window.location.href = "AdministrarEvento.html";
                } catch (e) {
                    console.error("Error al eliminar el documento: ", e);
                }
            }
        });
    }
}

// Asigna eliminarEvento al objeto window
window.eliminarEvento = eliminarEvento;