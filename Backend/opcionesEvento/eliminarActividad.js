import { collection, deleteDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const actividades = collection(db, 'Actividades');
const eventos = collection(db, 'Evento');

const listaActividad = await getDocs(actividades);
const listaEvento = await getDocs(eventos);

var selectEvento = document.getElementById("selectEvento");
var selectAct = document.getElementById("selectActividad");


listaEvento.forEach(docEv =>{
    // Creas un nuevo elemento option
    var option = document.createElement("option");
          
    // Le asignas un valor y un texto
    option.value = docEv.data().idEvento;
    option.text = docEv.data().titulo;
                            
    // Agregas la opción al select
    selectEvento.appendChild(option);
});


selectEvento.addEventListener('change', function() {
    var eventSel = this.value;
    console.log(eventSel);;
  
    // Elimina todas las opciones existentes, excepto la primera
    while (selectAct.options.length > 1) {
        selectAct.remove(1);
    }

    if(eventSel == '0'){
      selectAct.value = '0';
    }else{
        listaActividad.docs.forEach(doc => {
            if(doc.data().idEvento == eventSel){
                // Creas un nuevo elemento option
                var option = document.createElement("option");
        
                // Le asignas un valor y un texto
                option.value = doc.id;
                option.text = doc.data().titulo;
        
                // Agregas la opción al select
                selectAct.appendChild(option);
            }
        });
    }
});


async function eliminarActividad() {
    var idEvento = selectEvento.value;
    var idActividad = selectAct.value;

    if(idEvento == '0' || idActividad == '0'){
        alert("Debe seleccionar un evento y una actividad");
    }else{
        try {
            await deleteDoc(doc(actividades, idActividad));
            alert("Actividad eliminada con éxito.");
            window.location.href="../AdministrarAgenda.html";
        } catch (e) {
            console.error("Error al eliminar el documento: ", e);
        }
    }
}

window.eliminarActividad = eliminarActividad;