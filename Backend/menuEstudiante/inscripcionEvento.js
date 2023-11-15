import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const listaUsuario = await getDocs(usuarios);
const eventos = collection(db, 'Evento');
const inscripciones = collection(db, 'Inscripcion');
const listaEvento = await getDocs(eventos);
const listaInscripcion = await getDocs(inscripciones);
var carnet = localStorage.getItem('carnet');
var correoInscrip;
var eventoInscrip ='';
console.log(carnet);
console.log("Inscrip", listaInscripcion.size);

var select = document.getElementById("selectEvento");
var label = document.getElementById("cupos");

var lista = document.getElementById("eventosInscritos");


listaUsuario.forEach(docUs =>{
    if(docUs.data().carnet == carnet){
        correoInscrip = docUs.data().correo;
    }
});

listaEvento.docs.filter(doc => {
    var fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    var fecha = doc.data().fecha;
    var partes = fecha.split("/");
    var fechaEvento = new Date(partes[2], partes[1]-1, partes[0]);
    return fechaHoy <= fechaEvento;
}).forEach(doc => {
    console.log("Evento", doc.data().idEvento);
    if(listaInscripcion.size == 0){
        // Creas un nuevo elemento option
        var option = document.createElement("option");
    
        // Le asignas un valor y un texto
        option.value = doc.data().idEvento;
        option.text = doc.data().titulo;
                            
        // Agregas la opción al select
        select.appendChild(option);
    }else{
        listaInscripcion.docs.forEach(docInscrip =>{
            if(docInscrip.data().idEvento == doc.data().idEvento){
                if(docInscrip.data().contactoUsuario == correoInscrip){
                    eventoInscrip = docInscrip.data().idEvento;
                }
            }
        });
        if(eventoInscrip != doc.data().idEvento){
            // Creas un nuevo elemento option
            var option = document.createElement("option");
        
            // Le asignas un valor y un texto
            option.value = doc.data().idEvento;
            option.text = doc.data().titulo;
                                
            // Agregas la opción al select
            select.appendChild(option);
        }
    } 
    if (eventoInscrip == doc.data().idEvento) {
        var li = document.createElement("li");
        li.textContent = doc.data().titulo;
        li.setAttribute('idEvento', doc.data().idEvento);
        console.log("siiiiiiiii", doc.data().idEvento);
        li.onclick = function() {
            if (confirm("¿Estás seguro de que quieres cancelar tu inscripción a este evento?")) {
                listaInscripcion.docs.forEach(async docIns => {
                    if(docIns.data().idEvento == this.getAttribute('idEvento')){
                        try {
                            await deleteDoc(docIns.ref);
                            alert("Inscripción cancelada con éxito.");
                            console.log("Inscripción del evento eliminada");
                            location.reload();
                        } catch (e) {
                            console.error("Error al eliminar el documento: ", e);
                        }
                    }
                });
            }
        };
        lista.appendChild(li);
    } 
});





function validarUsuario(contacto){
    var usuario = false;
    listaUsuario.docs.forEach(doc => {
        if(doc.data().correo == contacto){
            usuario = true;
        }
    });
    return usuario;
}

function inscribirse() {
    var nombre = getInputVal("nombre");
    var contacto = getInputVal("contacto");
    var valorSeleccionado = select.value;

    if(nombre == '' || contacto == '' || valorSeleccionado == '0'){
        alert("Debe completar todos los campos");
    }else{
        var verificaUsuario = validarUsuario(contacto);
        console.log(verificaUsuario);
        if(verificaUsuario== true){
            listaEvento.docs.forEach(async docData => {
                if(docData.data().idEvento == valorSeleccionado){
                    if(docData.data().capacidad == 0){
                        alert("No hay más cupos para este evento");
                    }else{
                        label.innerHTML = "#cupos";
                        var capacidad = docData.data().capacidad-1;
                        try {
                            const docRef = doc(eventos, docData.id); // Obtiene la referencia al documento
                            await updateDoc(docRef, { capacidad: capacidad }); // Actualiza solo el campo capacidad
                            console.log("Capacidad actualizada con éxito");   
                        } catch (e) {
                            console.error("Error al actualizar el documento: ", e);
                        }
    
                        try {
                            const docRef = await addDoc(inscripciones, {
                              idEvento: valorSeleccionado,
                              nombreUsuario: nombre,
                              contactoUsuario: contacto
                            });
                            localStorage.setItem('qrEvento', valorSeleccionado);
                            localStorage.setItem('qrInscripcion', valorSeleccionado+contacto+docRef.id);
                            alert("Su inscripción se realizó con éxito");
                            window.location.href = "../PantallaQR.html";
                        } catch (e) {
                            console.error("Error al agregar el documento: ", e);
                        }
                    }
                }
            });
        }else{
            alert("Usuario no encontrado. Revisar correo ingresado.");
        }
    }
  
    // Function to get form values
    function getInputVal(id) {
      return document.getElementById(id).value;
    }
}

async function disponibilidad(){
    const eventosActualizados = await getDocs(eventos);
    var valorSeleccionado = select.value;
    if(valorSeleccionado == '0'){
        alert("Seleccione un evento");
    }else{
        eventosActualizados.docs.forEach(doc => {
            if(doc.data().idEvento == valorSeleccionado){
                var capacidadActual = doc.data().capacidad;
                var capacidadTexto = capacidadActual.toString();
                label.innerHTML = capacidadTexto;
            }
        });
    }
}

window.inscribirse = inscribirse;
window.disponibilidad = disponibilidad;