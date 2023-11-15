import { collection, query, where, getDocs, updateDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const eventos = collection(db, 'Evento');
const asociaciones = collection(db, 'Asociacion');
const usuarios = collection(db, 'Usuarios');
const listaEvento = await getDocs(eventos);
const listaAsociacion = await getDocs(asociaciones);
const listaUsuario = await getDocs(usuarios);
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

function generarQR(texto, correoDestinatario){
    // Crea un elemento canvas temporal
    var canvas = document.createElement('canvas');

    var qrcode = new QRCode(canvas, {
        text: texto,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Espera a que se genere el código QR
    setTimeout(function() {
        // Obtén la imagen del código QR como una cadena de datos en formato base64
        var imagenBase64 = canvas.toDataURL("image/png");

        // Ahora puedes usar la variable imagenBase64 como desees
        console.log(imagenBase64);
        sendEmail(imagenBase64, correoDestinatario);
    }, 1000);
}

function sendEmail(imagen, correoDestinatario){ 
    emailjs.send('service_wbig974', 'template_2c9otga', {
        to_email: correoDestinatario,
        qrCode: imagen,
    }, 'O-q83jW2lgienaoA8')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });
}

//------------------------- FUNCIONES -------------------------------------------------------------
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
    var carnet = localStorage.getItem('carnet');

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
        } catch (e) {
            console.error("Error al modificar el documento: ", e);
        }

        var texto = selectEvento.value+carnet;
        listaUsuario.forEach(docUs =>{
            generarQR(texto, docUs.data().correo);
        });

        window.location.href = "AdministrarEvento.html";
    }
}

window.modificarEvento = modificarEvento;