//const nodemailer = require('nodemailer');
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

function generarQR(texto){
    var qrcode = new QRCode(document.getElementById("qr"), {
        text: texto,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}


window.addEventListener('DOMContentLoaded', async (event) => {
    const usuarios = collection(db, 'Usuarios');
    const eventos = collection(db, 'Evento');
    var evento = localStorage.getItem('qrEvento');
    var texto = localStorage.getItem('qrInscripcion');
    var carnet = localStorage.getItem('carnet');
    const listaEvento = await getDocs(eventos);
    const listaUsuario = await getDocs(usuarios);

    listaEvento.forEach(doc =>{
        if(doc.data().idEvento == evento){
            var elementoEvento = document.getElementById('evento');
            var elementoFecha = document.getElementById('fecha');
            var elementoLugar = document.getElementById('lugar');
        
            elementoEvento.textContent = doc.data().titulo;
            elementoFecha.textContent = doc.data().fecha;
            elementoLugar.textContent = doc.data().lugar;
        }
    });

    listaUsuario.forEach(docUs =>{
        if(docUs.data().carnet == carnet){
            var elementoEstudiante = document.getElementById('estudiante');
            elementoEstudiante.textContent = docUs.data().nombre;
        }
    });

    generarQR(texto);
});
