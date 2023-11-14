import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "../configDatabase.js"

const eventos = collection(db, 'Evento');
const listaEventos = await getDocs(eventos);

document.addEventListener('dayClick', function(e) {

    // Se obtiene date del archivo DiasCalendario.js y se formatea
    const date = e.detail;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript empiezan en 0
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    // Para obtener el nombre del día
    const optionsDay = { weekday: 'long' };
    const dayName = date.toLocaleDateString('es-ES', optionsDay);

    // Para obtener el número del día
    const optionsDate = { day: 'numeric' };
    const dayNumber = date.toLocaleDateString('es-ES', optionsDate);

    // Se obtiene el id del componente del html y se modifican sus valores
    const tituloDia = document.getElementById('tituloDia');
    tituloDia.innerHTML = dayName.charAt(0).toUpperCase() + dayName.slice(1) + ' ' + dayNumber;

    const eventList = document.getElementById('listaEvento');
    const anuncio = document.getElementById('anuncio');
    eventList.innerHTML = ''; // Limpiar la lista de eventos existentes
    anuncio.innerHTML = '';

    let eventFound = false;

    listaEventos.docs.forEach(doc => {
        if(doc.data().fecha == formattedDate){
            const listItem = document.createElement('li');
            listItem.textContent = "• Evento: " + doc.data().titulo;
            eventList.appendChild(listItem);
            eventFound = true;
        }
    });
    if (!eventFound) {
        anuncio.innerHTML = "No hay eventos para este día";
    }
});

