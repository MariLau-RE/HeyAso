import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const listaUsuario = await getDocs(usuarios);
var btnProcesar = document.getElementById("btn_procesar");
var carnet = localStorage.getItem('carnet');


document.addEventListener("DOMContentLoaded", async function() {
    listaUsuario.forEach(docUs =>{
        if(docUs.data().carnet == carnet){
            if(docUs.data().idTipo == "Admin"){
                btnProcesar.style.display = "block";
            }
        }
    });
});


function menu(){
    listaUsuario.forEach(docUs =>{
        if(docUs.data().carnet == carnet){
            if(docUs.data().idTipo == "Admin"){
                window.location.href='../MenuPrincipalColaborador.html';
            }else{
                window.location.href='../MenuPrincipalEstudiante.html';
            }
        }
    });
}

window.menu = menu;