export function updateChart(listaEventosComentarios, listaEventosEvaluaciones) {
    var chartE = document.getElementById('evaluaciones').getContext('2d');
    var chartC = document.getElementById('comentarios').getContext('2d');

    const topComentarios = listaEventosComentarios.sort((a, b) => {
        return b.comentarios - a.comentarios;
    }).slice(0, 3);

    
    const topEvaluaciones = listaEventosEvaluaciones.map(evento => {
        const sum = evento.evaluaciones.reduce((a, b) => Number(a) + Number(b), 0);
        const avg = (evento.evaluaciones.length > 0) ? (sum / evento.evaluaciones.length) : 0;
        return { ...evento, avg };
    }).sort((a, b) => (isNaN(b.avg) ? 0 : b.avg) - (isNaN(a.avg) ? 0 : a.avg)).slice(0, 3);
   
    const labelsC = topComentarios.map(evento => { return evento.nombre; });
    const dataC = topComentarios.map(evento => { return evento.comentarios; });

    const labelsE = topEvaluaciones.map(evento => { return evento.nombre; });
    const dataE = topEvaluaciones.map(evento => { return evento.avg; });

    var e = new Chart(chartE, {
        type: 'doughnut',
        data: {
            labels: labelsC,
            datasets: [{
                data: dataC,
                backgroundColor: [
                    'rgba(255, 165, 0, 0.4)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(64, 224, 208, 0.2)'
                ]
            }]
        }
    });
    
    var c = new Chart(chartC, {
        type: 'doughnut',
        data: {
            labels: labelsE,
            datasets: [{
                data: dataE,
                backgroundColor: [
                    'rgba(255, 165, 0, 0.4)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(64, 224, 208, 0.2)'
                ]
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'rgb(100, 255, 255)'
                }
            }
        }
    });
}