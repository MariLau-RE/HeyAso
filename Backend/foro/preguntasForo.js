import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const comentarios = collection(db, 'Comentario');
const listaComentario = await getDocs(comentarios);