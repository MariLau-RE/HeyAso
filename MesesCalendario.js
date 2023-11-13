const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const month = document.querySelector('.month');
const prevButton = document.createElement('button');
const nextButton = document.createElement('button');

prevButton.innerHTML = '<';
nextButton.innerHTML = '>';

prevButton.addEventListener('click', () => changeMonth(-1));
nextButton.addEventListener('click', () => changeMonth(1));

month.appendChild(prevButton);
month.appendChild(document.createTextNode(months[currentMonth]));
month.appendChild(nextButton);

function changeMonth(n) {
    currentMonth += n;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    month.childNodes[1].nodeValue = months[currentMonth];
    createDays(currentMonth, currentYear);
}

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];