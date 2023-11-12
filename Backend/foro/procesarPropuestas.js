import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const propuestas = collection(db, 'Propuestas');
;const listaPropuesta = await getDocs(propuestas);

var select = document.getElementById("selectEvento");

listaPropuesta.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.id;
    option.text = doc.data().titulo;

    // Agregas la opción al select
    select.appendChild(option);
});

//FALTA MOSTRAR LA INFORMACION
//FALTA CAMBIAR EL ESTADO SEGÚN LA RECHACE O APRUEBE