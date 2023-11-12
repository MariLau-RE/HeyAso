import { collection, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const eventos = collection(db, 'Evento');
const listaEvento = await getDocs(eventos);
var select = document.getElementById("selectEvento");

listaEvento.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().idEvento;
    option.text = doc.data().titulo;

    // Agregas la opción al select
    select.appendChild(option);
});