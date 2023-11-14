import { collection, query, where, getDocs, updateDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const eventos = collection(db, 'Evento');
const asociaciones = collection(db, 'Asociacion');
const listaEvento = await getDocs(eventos);
const listaAsociacion = await getDocs(asociaciones);
var selectEvento = document.getElementById("selectEvento");
var selectAsociacion = document.getElementById("selectAso");
var titulo = document.getElementById("titulo");
var descripcion = document.getElementById("descripcion");
var fecha = document.getElementById("fecha");
var lugar = document.getElementById("lugar");
var duracion = document.getElementById("duracion");
var capacidad = document.getElementById("capacidad");
var requisitos = document.getElementById("requisitos");
var encuesta = document.getElementById("encuesta");
var selectCategoria = document.getElementById("selectCategoria");

listaEvento.docs.forEach(doc => {
    var fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    var fecha = doc.data().fecha;
    var partes = fecha.split("/");
    var fechaEvento = new Date(partes[2], partes[1]-1, partes[0]);
    console.log(fechaEvento);

    if (fechaHoy < fechaEvento) {
        var option = document.createElement("option");
        option.value = doc.data().idEvento;
        option.text = doc.data().idEvento + " - " + doc.data().titulo;
        selectEvento.appendChild(option);
    }
});

listaAsociacion.docs.forEach(doc => {
    var option = document.createElement("option");
    option.value = doc.data().idAsociacion;
    option.text = doc.data().idAsociacion + " - " +  doc.data().nombre;
    selectAsociacion.appendChild(option);
});

selectEvento.addEventListener('change', async (event) => {
    if (selectEvento.value === "0") {
        titulo.value = "";
        descripcion.value = "";
        fecha.value = "";
        lugar.value = "";
        duracion.value = "";
        capacidad.value = "";
        requisitos.value = "";
        encuesta.checked = false;
        selectAsociacion.value = "0";
        selectCategoria.value = "0";
        return;
    }
    else{
        const evento = await getEvento(event.target.value);
        if (evento !== null) {
            titulo.value = evento.data().titulo;
            descripcion.value = evento.data().descripcion;
            fecha.value = mostrarFecha(evento.data().fecha);
            lugar.value = evento.data().lugar;
            duracion.value = Number(evento.data().duracion);
            capacidad.value = Number(evento.data().capacidad);
            requisitos.value = evento.data().requisitos;
            encuesta.checked = evento.data().encuesta;
            selectAsociacion.value = evento.data().idAsociacion;
            selectCategoria.value = evento.data().categoria;
        }
    }
});

async function getEvento(idEvento) {
    const q = query(collection(db, "Evento"), where("idEvento", "==", idEvento));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0];
    } else {
        return null;
    }
}

function mostrarFecha(fecha){
    var partes = fecha.split("/");
    var fechaFormateada = partes[2] + "-" + partes[1] + "-" + partes[0];
    return fechaFormateada;
}

function modificarFecha(fecha){
    var partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

async function modificarEvento() {
    if(titulo == '' || lugar == '' || duracion == '' || fecha == '' || descripcion == '' || capacidad == '' || selectCategoria.text == 'Seleccione una categoría' || selectAsociacion.text == 'Seleccione una asociación'){
        alert("Debe completar todos los campos(no opcionales)");
    } 
    else{
        try {
            const evento = await getEvento(selectEvento.value);
            await updateDoc(evento.ref, {
                titulo: titulo.value,
                descripcion: descripcion.value,
                fecha: modificarFecha(fecha.value),
                lugar: lugar.value,
                duracion: duracion.value,
                capacidad: Number(capacidad.value),
                requisitos: requisitos.value,
                encuesta: encuesta.checked,
                idAsociacion: selectAsociacion.value,
                categoria: selectCategoria.value
            });
            alert("Evento modificado con éxito");
            window.location.href = "AdministrarEvento.html";
        } catch (e) {
            console.error("Error al modificar el documento: ", e);
        }
    }
}

window.modificarEvento = modificarEvento;