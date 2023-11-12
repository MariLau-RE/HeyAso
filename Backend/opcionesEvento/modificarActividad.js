import { collection, setDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const actividades = collection(db, 'Actividad');
const listaActividad = await getDocs(actividades);

var select = document.getElementById("selectEvento");

listaActividad.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().carnet;
    option.text = doc.data().nombre;

    // Agregas la opción al select
    select.appendChild(option);
});

/*FALTA MOSTRAR LA INFORMACION DE LA BUSQUEDA
TOMAR LOS VALORES CAMBIADOS Y HACER EL UPDATE
CONECTAR AL FRONT */