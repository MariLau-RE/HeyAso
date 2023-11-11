// Importa las funciones que necesitas de los SDKs que necesitas
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'usuario');

// Obtén todos los documentos de la colección
const snapshot = await getDocs(usuarios);

function loginUser() {
  var encontroUsuario = false;
  var email = getInputVal("email");
  var contrasenna = getInputVal("contrasenna");

  if(email == '' || contrasenna == ''){
    alert("Debe completar todos los campos");
  }else{
    snapshot.docs.forEach(doc => {
      if(doc.data().correo == email && doc.data().contraseña == contrasenna){
        console.log("INICIO SESION");
        //localStorage.setItem('carnet', carnet);
        if(doc.data().idTipo == "Estudiante"){
          encontroUsuario = true;
          window.location.href = "../MenuPrincipalEstudiante.html";
        }else{
          encontroUsuario = true;
          window.location.href = "../MenuPrincipalColaborador.html";
        }
      }
    });

    if(encontroUsuario == false){
      alert("Usuario no encontrado");
    }

  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}


// Asigna loginUser al objeto window
window.loginUser = loginUser;