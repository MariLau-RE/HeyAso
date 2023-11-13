
function compartirRedes(){
    var descripcion = getInputVal("descripcion");
    var tags = getInputVal("tags");
    var lugar = getInputVal("lugar");

    if(descripcion == '' || lugar == '' || tags == ''){
        alert("Debe completar todos los campos");
    }else{
        if ("share" in navigator) {
            navigator.share({
              title: lugar,
              text: descripcion+tags
            })
            .then(() => console.log('Contenido compartido exitosamente'))
            .catch((error) => console.log('Hubo un error al compartir', error));
        } else {
            console.log('Tu navegador no soporta la Web Share API');
        }
    }


    // Function to get form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    }
}


window.compartirRedes = compartirRedes;