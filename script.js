// Events Toggle

function toggle(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    div.classList.toggle('active');
}

// Events Quantity

function increase(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    if(div.value < 30) {
        div.value++;
    }
}

function decrease(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    if (div.value > 0) {
        div.value--;
    }
}

// Date Picker

const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_elements = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let selectedDate = currentDate;
let selectedDay = currentDay;
let selectedMonth = currentMonth;
let selectedYear = currentYear;

let displayedMonth = currentMonth;
let displayedYear = currentYear;

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

mth_elements.textContent = months[displayedMonth] + ' ' + displayedYear;

selected_date_element.textContent = formatDate(selectedDate);

populateDates();

// event listeners

date_picker_element.addEventListener('click', ToggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// functions

function ToggleDatePicker (e) {
    if (!checkEventPathForClass(e.composedPath(), 'dates')) {
        dates_element.classList.toggle('active');
    }
}

function goToNextMonth (e) {
    displayedMonth ++;
    if (displayedMonth > 11) {
        displayedMonth = 0;
        displayedYear++;
    }
    mth_elements.textContent = months[displayedMonth] + ' ' + displayedYear;
    populateDates();
}

function goToPrevMonth (e) {
    displayedMonth --;
    if (displayedMonth < 0) {
        displayedMonth = 11;
        displayedYear--;
    }
    mth_elements.textContent = months[displayedMonth] + ' ' + displayedYear;
    populateDates();
}

function populateDates (e) {
    days_element.innerHTML = '';

    for (let i = firstDayIndex(); i > 0; i--) {
        const day_element = document.createElement('div');
        day_element.classList.add('day', 'prev-date');
        day_element.textContent = prevLastDay() - i;
        days_element.appendChild(day_element);
    }

    for (let i = 0; i < lastDay(); i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == displayedYear && selectedMonth == displayedMonth) {
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function (e) {
            selectedDate = new Date(displayedYear + '-' + (displayedMonth + 1) + '-' + (i + 1));
            selectedDay = (i + 1);
            selectedMonth = displayedMonth;
            selectedYear = displayedYear;

            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;

            populateDates();
        })

        days_element.appendChild(day_element);
    }

    for (let i = 1; i <= nextDays(); i++){
        const day_element = document.createElement('div');
        day_element.classList.add('day', 'next-date');
        day_element.textContent = i;
        days_element.appendChild(day_element);
    }
}

// helper functions

function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

function formatDate(d) {
    let day = d.getDate();
    if (day < 0) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1;
    if (month < 0) {
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + '.' + month + '.' + year;
}

function lastDay() {
    return new Date(displayedYear, displayedMonth + 1, 0).getDate();
}

function prevLastDay() {
    return new Date(displayedYear, displayedMonth, 0).getDate();
}

function firstDayIndex() {
    return new Date(displayedYear, displayedMonth, 1).getDay();
}

function lastDayIndex() {
    return new Date(displayedYear, displayedMonth + 1, 0).getDay();
}

function nextDays() {
    return 7 - lastDayIndex() - 1;
}