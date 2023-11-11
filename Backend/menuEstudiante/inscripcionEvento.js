import { collection, getDocs, addDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const eventos = collection(db, 'Evento');
const inscripciones = collection(db, 'Inscripcion');
const listaEvento = await getDocs(eventos);
const listaUsuario = await getDocs(usuarios);

var select = document.getElementById("selectEvento");
var label = document.getElementById("cupos");

listaEvento.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor y un texto
    option.value = doc.data().idEvento;
    option.text = doc.data().titulo;

    // Agregas la opción al select
    select.appendChild(option);
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
                            console.log("Inscripcion creada con ID: ", docRef.id);
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