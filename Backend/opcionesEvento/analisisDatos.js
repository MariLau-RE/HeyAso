import { collection, deleteDoc, getDocs} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"
import { updateChart } from "./analisisDatosChart.js";

const eventos = collection(db, 'Evento');
const evaluaciones = collection(db, 'Evaluacion');
const listaEventos = await getDocs(eventos);
const listaEvaluaciones = await getDocs(evaluaciones);

var listaEventosComentarios = [];
var listaEventosEvaluaciones = [];

function formatearFecha(fecha){
    var partes = fecha.split("/");
    var fechaFormateada = partes[2] + "-" + partes[1] + "-" + partes[0];
    return fechaFormateada;
}

function getComentariosFromEvento(idEvento){
    var comentarios = [];
    listaEvaluaciones.docs.filter(doc => {
        return doc.data().idEvento == idEvento;
    }).forEach(doc => {
        comentarios.push(doc.data().comentario);
        console.log(doc.data().comentario);
    });
    return comentarios;
}

function getEvaluacionesFromEvento(idEvento){
    var evaluaciones = [];
    listaEvaluaciones.docs.filter(doc => {
        return doc.data().idEvento == idEvento;
    }).forEach(doc => {
        evaluaciones.push(doc.data().calificacion);
    });
    return evaluaciones;
}

listaEventos.docs.filter(doc => {
    var fechaEvento = new Date(formatearFecha(doc.data().fecha));
    var fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    fechaEvento.setHours(0, 0, 0, 0);
    return fechaHoy > fechaEvento; //retorna eventos que ya pasaron
}).forEach(doc => {
    listaEventosComentarios.push({
        id: doc.data().idEvento,
        nombre: doc.data().titulo,
        comentarios: getComentariosFromEvento(doc.data().idEvento).length,
    });
});

listaEventos.docs.filter(doc => {
    var fechaEvento = new Date(formatearFecha(doc.data().fecha));
    var fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    fechaEvento.setHours(0, 0, 0, 0);
    return fechaHoy > fechaEvento; //retorna eventos que ya pasaron

}).forEach(doc => {
    listaEventosEvaluaciones.push({
        id: doc.data().idEvento,
        nombre: doc.data().titulo,
        evaluaciones: getEvaluacionesFromEvento(doc.data().idEvento),
    });
});


updateChart(listaEventosComentarios, listaEventosEvaluaciones);