import { collection, updateDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const actividades = collection(db, 'Actividades');
const eventos = collection(db, 'Evento');
const usuarios = collection(db, 'Usuarios');

const listaEvento = await getDocs(eventos);
const listaActividad = await getDocs(actividades);
const listaUsuario = await getDocs(usuarios);

var selectEvento = document.getElementById("selectEvento");
var selectAct = document.getElementById("selectActividad");
var selectColab = document.getElementById("selectEncargado");

listaEvento.forEach(docEv =>{
    // Creas un nuevo elemento option
    var option = document.createElement("option");
          
    // Le asignas un valor y un texto
    option.value = docEv.data().idEvento+","+docEv.data().idAsociacion;
    option.text = docEv.data().titulo;
                            
    // Agregas la opción al select
    selectEvento.appendChild(option);
});


selectEvento.addEventListener('change', function() {
    var eventSel = this.value.split(",")[0];
    var evenSel2 = this.value.split(",")[1];
    console.log(eventSel);
    console.log(evenSel2);
  
  
    // Elimina todas las opciones existentes, excepto la primera
    while (selectAct.options.length > 1) {
        selectAct.remove(1);
    }

    while (selectColab.options.length > 1) {
        selectColab.remove(1);
    }
  
    if(eventSel == '0'){
      selectAct.value = '0';
      selectColab.value ='0'
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

        listaUsuario.forEach(docUs =>{
            if(docUs.data().idAsociacion == evenSel2){
              // Creas un nuevo elemento option
              var option = document.createElement("option");
                  
              // Le asignas un valor y un texto
              option.value = docUs.data().carnet;
              option.text = docUs.data().nombre;
                                    
              // Agregas la opción al select
              selectColab.appendChild(option);
            }
        });
    }
});


selectAct.addEventListener('change', function() {
    var actSel = this.value;
    console.log(actSel);

    if(actSel != '0'){
        listaActividad.docs.forEach(doc => {
            if(doc.id == actSel){
                document.getElementById("titulo").value = doc.data().titulo;
                document.getElementById("descripcion").value = doc.data().descripcion;
                document.getElementById("duracion").value = doc.data().duracion;
                document.getElementById("lugar").value = doc.data().lugar;
                document.getElementById("recursos").value = doc.data().recursos;

                listaUsuario.forEach(docUs =>{
                    if(docUs.id == doc.data().encargado){
                        selectColab.value = docUs.data().carnet;
                    }
                });
            }
        });
    }
});


async function modificarActividad(){
    var titulo = getInputVal("titulo");
    var lugar = getInputVal("lugar");
    var duracion = getInputVal("duracion");
    var descripcion = getInputVal("descripcion");
    var recursos = getInputVal("recursos");

    var idActividad = selectAct.value;
    var idEvento = selectEvento.value.split(",")[0];
    var encargado = selectColab.value;

    if( titulo == '' || lugar == '' || duracion == '' || descripcion == '' || recursos == ''
    || idActividad == '0' || idEvento == '0' || encargado == '0'){
        alert("Debe completar todos los campos");
    }else{
        try {
            const docRef = doc(actividades, idActividad); // Obtiene la referencia al documento
            await updateDoc(docRef, { 
                idEvento: idEvento,
                titulo: titulo,
                lugar: lugar,
                duracion: duracion,
                descripcion: descripcion,
                recursos: recursos,
                encargado: encargado
             });
             console.log("Actividad actualizada con ID: ", idActividad);
             alert("Actividad actualizada con éxito");
             window.location.href="../AdministrarAgenda.html";
        } catch (e) {
            console.error("Error al actualizar el documento: ", e);
        }

    }

    // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}

window.modificarActividad = modificarActividad;