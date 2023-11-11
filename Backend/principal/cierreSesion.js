function cierreSesion(){
    localStorage.removeItem('carnet');
}

window.cierreSesion = cierreSesion();