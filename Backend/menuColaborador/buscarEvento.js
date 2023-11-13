import { collection, addDoc, getDocs, query, where} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const eventos = collection(db, 'Evento');
const listaEvento = await getDocs(eventos);
var selectEvento = document.getElementById("selectEvento");

listaEvento.docs.forEach(doc => {
    var option = document.createElement("option");
    option.text = doc.data().titulo;
    option.value = doc.data().idEvento;
    selectEvento.add(option);
});

selectEvento.addEventListener("change", function(){
    var valorSeleccionado = selectEvento.value;
    if (valorSeleccionado == "0") {
        document.getElementById("titulo").textContent = " - ";
        document.getElementById("fecha").textContent = " - ";
        document.getElementById("descripcion").textContent = " - ";
        document.getElementById("asociacion").textContent = " - ";
        document.getElementById("categoria").textContent = " - ";
        document.getElementById("duracion").textContent = " - ";
        document.getElementById("lugar").textContent = " - ";
        document.getElementById("capacidad").textContent = " - ";
        document.getElementById("requisitos").textContent = " - ";
        document.getElementById("encuesta").textContent = " - ";

    } else {
        listaEvento.docs.forEach(async doc => {
            if(doc.data().idEvento == valorSeleccionado){
                const nombre = await getAsociacion(doc.data().idAsociacion);
                document.getElementById("titulo").textContent = doc.data().titulo;
                document.getElementById("fecha").textContent = doc.data().fecha;
                document.getElementById("descripcion").textContent = doc.data().descripcion;
                document.getElementById("asociacion").textContent = nombre.nombre;
                document.getElementById("categoria").textContent = doc.data().categoria;
                document.getElementById("duracion").textContent = doc.data().duracion;
                document.getElementById("lugar").textContent = doc.data().lugar;
                document.getElementById("capacidad").textContent = doc.data().capacidad;
                document.getElementById("requisitos").textContent = doc.data().requisitos;
                document.getElementById("encuesta").textContent = doc.data().encuesta? "✔" : "✖";                
            }
        });
    }
});

async function getAsociacion(idAsociacion){
    const q = query(collection(db, "Asociacion"), where("idAsociacion", "==", idAsociacion));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
    } else {
        console.log("No such document!");
    }
}

async function buscarEvento(){

}

window.buscarEvento = buscarEvento;