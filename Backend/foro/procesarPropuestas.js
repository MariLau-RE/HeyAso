import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const propuestas = collection(db, 'Propuestas');
;const listaPropuesta = await getDocs(propuestas);

var select = document.getElementById("selectPropuesta");
var btnAceptar = document.getElementById("btn_aceptar");
var btnRechazar = document.getElementById("btn_rechazar");
var label = document.getElementById("info");


btnAceptar.addEventListener("click", async function() {
    var idPropuesta = select.value;

    if(idPropuesta == '0'){
        alert("Debe seleccionar una propuesta");
    }else{
        try {
            const docRef = doc(propuestas, idPropuesta); // Obtiene la referencia al documento
            await updateDoc(docRef,{ estado: "Aceptada" }); // Actualiza solo el campo encuesta
            alert("Propuesta aceptada con éxito.");
            window.location.href="../PantallaForo.html";   
        } catch (e) {
            console.error("Error al actualizar el documento: ", e);
        }
    }
});


btnRechazar.addEventListener("click", async function() {
    var idPropuesta = select.value;

    if(idPropuesta == '0'){
        alert("Debe seleccionar una propuesta");
    }else{
        try {
            const docRef = doc(propuestas, idPropuesta); // Obtiene la referencia al documento
            await updateDoc(docRef,{ estado: "Rechazada" }); // Actualiza solo el campo encuesta
            alert("Propuesta rechazada con éxito.");
            window.location.href="../PantallaForo.html";    
        } catch (e) {
            console.error("Error al actualizar el documento: ", e);
        }
    }
});


select.addEventListener('change', function() {
    var select = this.value;
      
    if(select == '0'){
        label.innerText = "No hay selección de propuesta"
    }else{
      listaPropuesta.docs.forEach(docAs => {
        if(docAs.id == select){
            var texto = "Título: "+docAs.data().titulo+"\n"
            +"Objetivos: "+docAs.data().objetivos+"\n"
            +"Descripción: "+docAs.data().descripcion+"\n"
            +"Categoría: "+docAs.data().categoria+"\n"
            +"Actividades: "+docAs.data().actividades
            label.innerText = texto;
        }
      });
    }
  });


listaPropuesta.docs.forEach(doc => {
    if(doc.data().estado == "SinCalificar"){
        // Creas un nuevo elemento option
        var option = document.createElement("option");

        // Le asignas un valor y un texto
        option.value = doc.id;
        option.text = doc.data().titulo;

        // Agregas la opción al select
        select.appendChild(option);
    }
});


