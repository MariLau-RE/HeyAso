function cierreSesion(){
    var carnet = localStorage.getItem('carnet');
    console.log("Carnet actual", carnet);
    localStorage.removeItem('carnet');
    var carnet = localStorage.getItem('carnet');
    console.log("Carnet actual", carnet);
}

window.cierreSesion = cierreSesion;