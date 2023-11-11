// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnbOPKbQk_IcyAoLSh_Fv0EMd758d1ZuU",
  authDomain: "heyaso.firebaseapp.com",
  projectId: "heyaso",
  storageBucket: "heyaso.appspot.com",
  messagingSenderId: "785839676902",
  appId: "1:785839676902:web:8e4c740a48bd90764eca27",
  measurementId: "G-T2G3D81PBB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

export { db };

//Nota: Deben correr npm install firebase