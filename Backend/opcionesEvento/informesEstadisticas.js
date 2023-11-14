import { collection, getDoc, getDocs, doc, query, where} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"


async function getEvento(idEvento){
    const q = query(collection(db, "Evento"), where("idEvento", "==", idEvento));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
    } else {
        console.log("No such document!");
    }
}

async function getAsociacion(idAsociacion){
    const q = query(collection(db, "Asociacion"), where("idAsociacion", "==", idAsociacion));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
    } else {
        console.log("No such document!");
    }
}

async function getCantInscripciones(id){
    const q = query(collection(db, "Inscripcion"), where("idEvento", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
}

window.addEventListener('DOMContentLoaded', async (event) => {
    const eventos = collection(db, 'Evento');
    const listaEventos = await getDocs(eventos);
    const selectEvento = document.getElementById("evento");

    // Cargar un evento informe
    listaEventos.docs.forEach(doc => {
        var option = document.createElement("option");
    
        option.value = doc.data().idEvento;
        option.text = doc.data().idEvento + " - " + doc.data().titulo;
    
        selectEvento.appendChild(option);
    });

    selectEvento.addEventListener('change', async (event) => {
        const labelAsociacion = document.getElementById("asociacion");
        const labelParticipantes = document.getElementById("participantes");
        const labelInscripciones = document.getElementById("inscripciones");
        const labelLugar = document.getElementById("lugar");

        if (event.target.value === "0") {
            labelAsociacion.textContent = "No hay registros";
            labelParticipantes.textContent = "No hay registros";
            labelInscripciones.textContent = "No hay registros";
            labelLugar.textContent = "No hay registros";
        } else {
            const eventoData = await getEvento(event.target.value);
            const asociacionData = await getAsociacion(eventoData.idAsociacion);
            const cantInscripciones = await getCantInscripciones(event.target.value);

            labelParticipantes.textContent = eventoData.capacidad;
            labelAsociacion.textContent = asociacionData.nombre;
            labelInscripciones.textContent = cantInscripciones;
            labelLugar.textContent = eventoData.lugar;
        }
    })

    // Cargar generalidades estdisticas de los eventos
    const today = new Date();
    today.setHours(0, 0, 0, 0); // la comparación se hace solo en base a la fecha

    const eventosPasados = listaEventos.docs.filter(doc => {
        const eventoData = doc.data();
        const [day, month, year] = eventoData.fecha.split("/");
        const fechaEvento = new Date(`${month}/${day}/${year}`);
        console.log(fechaEvento);
        return fechaEvento < today;
    });

    if (eventosPasados.length === 0) {
        document.getElementById("promedioInscripciones").textContent = "No hay registros";
        document.getElementById("promedioParticipantes").textContent = "No hay registros";
        document.getElementById("promedioDuracion").textContent = "No hay registros";
        document.getElementById("topCategoria").textContent = "No hay registros";
    } else {
        const capacidades = eventosPasados.map(doc => doc.data().capacidad);
        const duracion = eventosPasados.map(doc => doc.data().duracion);
        const categoria = eventosPasados.map(doc => doc.data().categoria);
        const cantInscripcionesPorEventoPromises = eventosPasados.map(doc => getCantInscripciones(doc.data().idEvento));
        const cantInscripcionesPorEvento = await Promise.all(cantInscripcionesPorEventoPromises);

        // reducce funciona como iteracion en un array
        const promedioInscripciones = cantInscripcionesPorEvento.reduce((a, b) => a + b, 0) / cantInscripcionesPorEvento.length;
        const promedioParticipantes = capacidades.reduce((a, b) => a + b, 0) / capacidades.length;
        const promedioDuracion = duracion.reduce((a, b) => a + Number(b), 0) / duracion.length; 
        const topCategoria = categoria.sort((a, b) => categoria.filter(v => v === a).length - categoria.filter(v => v === b).length).pop();

        document.getElementById("promedioInscripciones").textContent = promedioInscripciones.toFixed(2);
        document.getElementById("promedioParticipantes").textContent = promedioParticipantes.toFixed(2);
        document.getElementById("promedioDuracion").textContent = promedioDuracion.toFixed(2);
        document.getElementById("topCategoria").textContent = topCategoria;
    }
});