import { collection, getDocs, updateDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const usuarios = collection(db, 'Usuarios');
const asociaciones = collection(db, 'Asociacion');
const listaUsuario = await getDocs(query(usuarios, where("idTipo", "==", "Estudiante")));
const listaAsociacion = await getDocs(asociaciones);

const selectCarnet = document.getElementById("carnet");
const selectPuesto = document.getElementById("puesto");
const selectAsociacion = document.getElementById("asociacion");

listaUsuario.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor
    option.value = doc.data().carnet;
    option.text = doc.data().nombre;

    // Agregas la opción al select
    selectCarnet.appendChild(option);
});

listaAsociacion.docs.forEach(doc => {
    // Creas un nuevo elemento option
    var option = document.createElement("option");

    // Le asignas un valor
    option.value = doc.data().idAsociacion;
    option.text = doc.data().nombre + " - " + doc.data().idAsociacion;

    // Agregas la opción al select
    selectAsociacion.appendChild(option);
});

async function asignarColaborador() {
    var carnet = selectCarnet.value;
    var puestoValue = selectPuesto.options[selectPuesto.selectedIndex].value;
    var puestoText = selectPuesto.options[selectPuesto.selectedIndex].text;
    var asociacion = selectAsociacion.value;

    console.log(carnet + " " + puestoValue + " " + asociacion)

    if(carnet == '0' || puestoValue == '0' || asociacion == '0'){
      alert("Debe completar todos los campos");
    }else{
        try {
            // Obtén una referencia al documento
            const docRef = doc(usuarios, carnet);

            // Actualiza el documento
            await updateDoc(docRef, {
                idTipo: "Admin",
                idAsociacion: asociacion,
                puesto: puestoText
            });
            alert("Colaborador asignado con éxito");
            window.location.href = "index.html";
        } catch (e) {
            console.error("Error al modificar el documento: ", e);
        }
    }
}

window.asignarColaborador = asignarColaborador;