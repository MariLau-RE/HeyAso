import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const actividades = collection(db, 'Actividades');
const eventos = collection(db, 'Evento');
const usuarios = collection(db, 'Usuarios');

const listaEvento = await getDocs(eventos);
const listaUsuario = await getDocs(usuarios);

var selectEvento = document.getElementById("selectEvento");
var selectColab = document.getElementById("selectEncargado");

listaEvento.forEach(docEv =>{
  // Creas un nuevo elemento option
  var option = document.createElement("option");
        
  // Le asignas un valor y un texto
  option.value = docEv.data().idEvento+","+docEv.data().idAsociacion;
  option.text = docEv.data().titulo;
                          
  // Agregas la opción al select
  selectEvento.appendChild(option);
});

selectEvento.addEventListener('change', function() {
  var eventSel = this.value.split(",")[1];
  console.log(eventSel);


  // Elimina todas las opciones existentes, excepto la primera
  while (selectColab.options.length > 1) {
      selectColab.remove(1);
  }

  if(eventSel == '0'){
    selectColab.value = '0';
  }else{
    listaUsuario.forEach(docUs =>{
      if(docUs.data().idAsociacion == eventSel){
        // Creas un nuevo elemento option
        var option = document.createElement("option");
            
        // Le asignas un valor y un texto
        option.value = docUs.data().carnet;
        option.text = docUs.data().nombre;
                              
        // Agregas la opción al select
        selectColab.appendChild(option);
      }
    });
  }
});


async function crearActividad() {
  var idEvento = selectEvento.value.split(",")[0];
  var titulo = getInputVal("titulo");
  var lugar = getInputVal("lugar");
  var duracion = getInputVal("duracion");
  var descripcion = getInputVal("descripcion");
  var recursos = getInputVal("recursos");
  var encargado= selectColab.value;
    
    if(titulo == '' || recursos == '' || duracion == '' || idEvento == '0' || descripcion == '' || lugar == '' || encargado == '0'){
      alert("Debe completar todos los campos");
    }else{
      try {
        const docRef = await addDoc(actividades, {
          idEvento: idEvento,
          titulo: titulo,
          descripcion: descripcion,
          idEvento: idEvento,
          recursos: recursos,
          duracion: duracion,
          encargado: encargado,
          lugar: lugar
        });

        console.log("Actividad creada con ID: ", docRef.id);
        alert("Actividad creada con éxito");
        window.location.href="AdministrarAgenda.html";
      } catch (e) {
        console.error("Error al agregar el documento: ", e);
      }
    }
  
    // Function to get form values
    function getInputVal(id) {
      return document.getElementById(id).value;
    }
  }

window.crearActividad = crearActividad;