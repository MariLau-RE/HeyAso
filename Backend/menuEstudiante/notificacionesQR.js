import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

function generarQR(texto, correoDestinatario){
    var qrcode = new QRCode(document.getElementById("qr"), {
        text: texto,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Espera a que se genere el código QR
    setTimeout(function() {
        // Obtén el elemento <img> dentro del <div>
        var imgElement = document.getElementById("qr").getElementsByTagName("img")[0];
    
        // Obtén la imagen del código QR como una cadena de datos en formato base64
        var imagenBase64 = imgElement.src;

        // Asegúrate de que la cadena Base64 de la imagen tenga el prefijo de datos adecuado
        if (!imagenBase64.startsWith('data:image/png;base64,')) {
                imagenBase64 = 'data:image/png;base64,' + imagenBase64;
        }
    
        // Ahora puedes usar la variable imagenBase64 como desees
        console.log(imagenBase64);
        sendEmail(imagenBase64, correoDestinatario);
    }, 1000);

    
}

function sendEmail(imagen, correoDestinatario){ 
    emailjs.send('service_wbig974', 'template_038qz2p', {
        to_email: correoDestinatario,
        qr_code: imagen,
    }, 'O-q83jW2lgienaoA8')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });
}


window.addEventListener('DOMContentLoaded', async (event) => {
    const usuarios = collection(db, 'Usuarios');
    const eventos = collection(db, 'Evento');
    var evento = localStorage.getItem('qrEvento');
    var texto = localStorage.getItem('qrInscripcion');
    var carnet = localStorage.getItem('carnet');
    var correoDestinatario;
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
            correoDestinatario = docUs.data().correo;
        }
    });

    generarQR(texto, correoDestinatario);
});
