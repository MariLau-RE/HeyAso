//const nodemailer = require('nodemailer');
const QRCode = require('qrcode');


function generarQR(){
    var texto = localStorage.getItem('qrInscripcion');
    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: texto,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}




/*// Genera el código QR y lo guarda como una imagen
let qrText = 'https://www.ejemplo.com';
let qrImage = 'qrcode.png';


QRCode.toFile(qrImage, qrText, function (err) {
    if (err) throw err

    // Configura el transporte de correo
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'oficialheyaso@gmail.com',
            pass: 'knwwogxjwktttent'
        }
    });

    // Configura las opciones de correo
    let mailOptions = {
        from: 'oficialheyaso@gmail.com',
        to: 'correo-destino@example.com',
        subject: 'Aquí está tu código QR',
        text: 'Encuentra adjunto el código QR.',
        attachments: [
            {
                filename: 'qrcode.png',
                path: __dirname + '/' + qrImage
            }
        ]
    };

    // Envía el correo
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
});*/

