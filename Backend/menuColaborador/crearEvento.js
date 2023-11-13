import { collection, addDoc, getDocs, query, where} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const selectAso = document.getElementById("selectAso");
const selectCategoria = document.getElementById("selectCategoria");

async function verificarIdEvento(idEvento) {
  const q = query(collection(db, "Evento"), where("idEvento", "==", idEvento));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
      return false
  } else {
      return true;
  }
}

function formatearFecha(fecha){
  var partes = fecha.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

async function crearEvento() {
  const eventos = collection(db, 'Evento');
  console.log("Creando evento");

  var idEvento = document.getElementById("identificador").value;
  var titulo = document.getElementById("titulo").value;
  var descripcion = document.getElementById("descripcion").value;
  var lugar = document.getElementById("lugar").value;
  var duracion = document.getElementById("duracion").value;
  var fecha = document.getElementById("fecha").value;
  var categoria = selectCategoria.options[selectCategoria.selectedIndex];
  var asociacion = selectAso.options[selectAso.selectedIndex];
  var requisitos = document.getElementById("requisitos").value;
  var capacidad = document.getElementById("capacidad").value;
  var encuesta = document.getElementById("encuesta").checked;

  if(idEvento == '' || titulo == '' || lugar == '' || duracion == '' || fecha == '' || descripcion == '' || capacidad == '' || categoria.text == 'Seleccione una categoría' || asociacion.text == 'Seleccione una asociación'){
    alert("Debe completar todos los campos(no opcionales)");
  } 
  else if(!await verificarIdEvento("Evento" + idEvento)){
    alert("El identificador ya está en uso");
  }
  else{
    try {
      const docRef = await addDoc(eventos, {
        idEvento: "Evento" + idEvento,
        idAsociacion: asociacion.value,
        titulo: titulo,
        descripcion: descripcion,
        lugar: lugar,
        duracion: duracion,
        fecha: formatearFecha(fecha),
        categoria: categoria.text,
        requisitos: requisitos,
        capacidad: Number(capacidad),
        encuesta: encuesta
      });
      alert("Evento creado con éxito");
      window.location.href = "AdministrarEvento.html";
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  } 
}

window.addEventListener('DOMContentLoaded', async (event) => {
  // Cargar una asociacion
  const asociaciones = collection(db, 'Asociacion');
  const listaAsociaciones = await getDocs(asociaciones);
  const selectAsociacion = document.getElementById("selectAso");

  listaAsociaciones.docs.forEach(doc => {
    var option = document.createElement("option");
    option.value = doc.data().idAsociacion;
    option.text = doc.data().idAsociacion + " - " + doc.data().nombre;
    selectAsociacion.appendChild(option);
  });


});

// Asigna crearEvento al objeto window
window.crearEvento = crearEvento;
