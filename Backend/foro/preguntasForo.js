import { collection, getDocs, addDoc, serverTimestamp  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const comentarios = collection(db, 'Comentarios');
const usuarios = collection(db, 'Usuarios');

const submitButton = document.getElementById("submit-button");
const commentInput = document.getElementById("comment-input");
const commentsContainer = document.getElementById("comments-container");

document.addEventListener("DOMContentLoaded", function() {
    cargarComentarios();
});

async function cargarComentarios() {
    const listaComentario = await getDocs(comentarios);
    
    if(listaComentario.size != 0){
        listaComentario.forEach(doc =>{
            const comment = doc.data().usuario+": "+doc.data().mensaje;
            const commentElement = document.createElement("div");
            commentElement.innerHTML = comment;
            commentElement.style.textAlign = "left";
            commentsContainer.appendChild(commentElement);
        });
    }
}


submitButton.addEventListener("click", async function() {
    var carnet = localStorage.getItem('carnet');
    var nombreUsuario;

    const listaUsuario = await getDocs(usuarios);

    listaUsuario.forEach(docUs =>{
        if(docUs.data().carnet == carnet){
            nombreUsuario = docUs.data().nombre;
        }
    })

    const comment = nombreUsuario+": "+commentInput.value;
    const mensaje = commentInput.value;
    const commentElement = document.createElement("div");
    commentElement.innerHTML = comment;
    commentElement.style.textAlign = "right";
    commentsContainer.appendChild(commentElement);
    commentInput.value = "";



    // Crea un nuevo timestamp con la fecha y hora actuales del servidor
    var miTimestamp = serverTimestamp();

    try {
        const docRef = await addDoc(comentarios, {
          usuario: nombreUsuario,
          mensaje: mensaje,
          timestamp: miTimestamp
        });
        console.log("Comentario creado con ID: ", docRef.id);
    } catch (e) {
        console.error("Error al agregar el documento: ", e);
    }
});


