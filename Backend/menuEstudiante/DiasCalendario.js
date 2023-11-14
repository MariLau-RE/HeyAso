const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const calendar = document.querySelector('.calendar');
const daysContainer = document.querySelector('.days');

function createDays(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month).getDay();

    let html = '';

    // Rellenar con los días de la semana anterior al primer día del mes
    for (let i = 0; i < startDay; i++) {
        html += '<div></div>';
    }

    // Añadir los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(year, month, i);
        const classNames = ['day'];

        if (day.getMonth() !== month) {
            classNames.push('different-month');
        }

        if (day.getTime() === today.getTime()) {
            classNames.push('active');
        }

        html += `<div class="${classNames.join(' ')}"onclick="handleDayClick(${year}, ${month}, ${i})">${i}</div>`;
    }

    daysContainer.innerHTML = html;
}

function handleDayClick(year, month, day) {
    const date = new Date(year, month, day);
    const event = new CustomEvent('dayClick', { detail: date });
    document.dispatchEvent(event);
}

createDays(currentMonth, currentYear);

const monthYearElement = document.getElementById('month-year');
let currentDisplayedMonth = currentMonth;

function updateMonthHeader(month, year) {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
}

function prevMonth() {
    currentDisplayedMonth--;
    if (currentDisplayedMonth < 0) {
        currentDisplayedMonth = 11;
        currentYear--;
    }
    createDays(currentDisplayedMonth, currentYear);
    updateMonthHeader(currentDisplayedMonth, currentYear);
}

function nextMonth() {
    currentDisplayedMonth++;
    if (currentDisplayedMonth > 11) {
        currentDisplayedMonth = 0;
        currentYear++;
    }
    createDays(currentDisplayedMonth, currentYear);
    updateMonthHeader(currentDisplayedMonth, currentYear);
}

updateMonthHeader(currentMonth, currentYear);
