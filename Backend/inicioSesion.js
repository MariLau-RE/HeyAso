// Importa las funciones que necesitas de los SDKs que necesitas
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./configDatabase.js"

const usuarios = collection(db, 'usuario');

// Obtén todos los documentos de la colección
const snapshot = await getDocs(usuarios);

function loginUser() {
  var email = getInputVal("email");
  var contrasenna = getInputVal("contrasenna");

  if(email == '' || contrasenna == ''){
    alert("Debe completar todos los campos");
  }else{
    snapshot.docs.forEach(doc => {
      if(doc.data().correo == email && doc.data().contraseña){
        console.log("INICIO SESION");
        if(doc.data().idTipo == "Estudiante"){
          window.location.href = "../MenuEstudiante.html";
        }else{
          window.location.href = "../MenuColaborador.html";
        }
      }else{
        alert("Usuario no encontrado.");
      }
    });
  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }
}


// Asigna loginUser al objeto window
window.loginUser = loginUser;