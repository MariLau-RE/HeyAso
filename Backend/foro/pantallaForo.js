import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

document.addEventListener("DOMContentLoaded", async function() {
    const usuarios = collection(db, 'Usuarios');
    const listaUsuario = await getDocs(usuarios);
    var btnProcesar = document.getElementById("btn_procesar");
    var carnet = localStorage.getItem('carnet');

    listaUsuario.forEach(docUs =>{
        if(docUs.data().carnet == carnet){
            if(docUs.data().idTipo == "Admin"){
                btnProcesar.style.display = "block";
            }
        }
    });
});